"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIODomainProxyService = exports.SocketIODomainProxyServiceClass = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DP_config_1 = require("../config/DP.config");
const export_1 = require("../dependencies/FISAppMessageJSUtility/interface/export");
//import { io } from "socket.io-client";
const io = require('socket.io-client');
class SocketIODomainProxyServiceClass {
    constructor(http) {
        this.http = http;
        this.isConnectionStatusObserved = false;
    }
    initialise(settings) {
        this.settings = settings;
        this['status'] = 'disconnected';
    }
    emit(msg) {
        let subject = new rxjs_1.Subject();
        // Sent
        //let subscription = this.send(msg,true).subscribe();  // Force it to send by subscribe
        // No return value
        let subscription = this.send(msg, true).subscribe(subject); // Force it to send by subscribe
        return subject.asObservable();
    }
    send(msg, isStream = true, connection) {
        // Handle first time connection used.
        if (!connection) {
            connection = {};
        }
        let observer;
        let observableResult = new rxjs_1.Observable((localObserver) => {
            observer = localObserver;
            // establish connection to server if socket is uninitialized
            this.connect().then((socket) => {
                // Bind the observable to the socket
                this.bindObserverToSocket(this.socket, observer, isStream, connection, msg.header.security.ucpId, msg.header.messageID);
                this.socket['observableResult'] = observableResult;
                this.socket.emit('request', this.MessageService.getDPmessage(msg));
            });
        }).pipe(operators_1.map((resp) => this.convertFisAppResponse(resp)));
        return observableResult;
    }
    bindObserverToSocket(socket, observer, isStream, connection, ucpId, requestId) {
        {
            socket.on('connect', () => {
                console.log('Client connected.');
            });
            socket.on('response', (res) => {
                if (res.id > '') {
                    //this.count = this.count + 1;
                    //console.log(String(this.count)+" rec-> "+JSON.stringify(res,null,4)); // Testing logging
                    if (!res.complete) {
                        if (res.message) {
                            const response_msg = JSON.parse(res.message);
                            let requestRespondtoID = '';
                            // If having res.id
                            if (res.id) {
                                requestRespondtoID = res.id;
                            }
                            // If have response_msg.data.uiMessage.header.messageID field
                            if (requestRespondtoID == '' &&
                                response_msg &&
                                response_msg.header &&
                                response_msg.header.requestMessageRespondTo &&
                                response_msg.header.requestMessageRespondTo.data &&
                                response_msg.header.requestMessageRespondTo.data.uiMessage &&
                                response_msg.header.requestMessageRespondTo.data.uiMessage
                                    .header &&
                                response_msg.header.requestMessageRespondTo.data.uiMessage
                                    .header.messageID) {
                                requestRespondtoID =
                                    response_msg.header.requestMessageRespondTo.data.uiMessage
                                        .header.messageID;
                            }
                            // If have response_msg.header.requestMessageRespondTo.header.messageID field
                            if (requestRespondtoID == '' &&
                                response_msg &&
                                response_msg.header &&
                                response_msg.header.requestMessageRespondTo &&
                                response_msg.header.requestMessageRespondTo.header &&
                                response_msg.header.requestMessageRespondTo.header.messageID) {
                                requestRespondtoID =
                                    response_msg.header.requestMessageRespondTo.header.messageID;
                            }
                            // If have response to ID
                            if (requestRespondtoID > '') {
                                // must be same as request Id
                                if (requestRespondtoID == requestId) {
                                    observer.next(res);
                                }
                            }
                            else {
                                // Else, also send to observable
                                observer.next(res);
                            }
                        }
                    }
                    else if (res.complete) {
                        // Only complete for own request.
                        if (res.message &&
                            res.message.requestId &&
                            res.message.requestId == requestId) {
                            observer.complete();
                        }
                    }
                }
                else {
                    console.log('Connection error');
                    console.log(res);
                }
                if (!isStream)
                    if (res.complete) {
                        //socket.close();
                        if (observer)
                            observer.complete();
                    }
            });
            socket.on('error', (res) => {
                console.log('SocketError' + res);
                let error_data = {
                    status: '-1',
                    message: res,
                };
                let error_msg = this.MessageService.getResponseExceptionMessage(ucpId, {
                    StatusException: error_data,
                }, this.MessageService.getCommandMessage_ext(ucpId, '', ''), export_1.ResponseStatus.ExecutionException, export_1.ExceptionType.ServerUnavailable);
                if (this.isConnectionStatusObserved) {
                    observer.next(error_msg);
                }
            });
            socket.on('disconnect', (reason) => {
                if (reason != 'io client disconnect') {
                    connection.status = 'Error';
                    console.log('Socket disconnection.' + reason);
                }
                else {
                    connection.status = 'Closed';
                    console.log('Socket closed by client.' + reason);
                }
                let error_data = {
                    status: '-1',
                    message: reason,
                };
                let error_msg = this.MessageService.getResponseExceptionMessage(ucpId, {
                    StatusException: error_data,
                }, this.MessageService.getCommandMessage_ext(ucpId, '', ''), export_1.ResponseStatus.ExecutionException, export_1.ExceptionType.ServerUnavailable);
                if (this.isConnectionStatusObserved) {
                    observer.next(error_msg);
                }
            });
            socket.on('connect', () => {
                let status_data = {
                    status: '1',
                    message: 'Connection started',
                };
                let status_msg = this.MessageService.getResponseStatusMessage(ucpId, {
                    StatusResponse: status_data,
                }, this.MessageService.getCommandMessage_ext(ucpId, '', ''), export_1.ResponseStatus.ExecutionCompleted, export_1.ExceptionType.ServerUnavailable);
                if (this.isConnectionStatusObserved) {
                    observer.next(status_msg);
                }
            });
        }
    }
    subscribe(msg) {
        let requestMsg;
        requestMsg = msg;
        // Sent and get observable
        let observableResult = this.send(requestMsg);
        return observableResult;
    }
    convertFisAppResponse(resp) {
        try {
            let message;
            message = JSON.parse(resp['message']);
            return message;
        }
        catch (e) {
            console.log('Error performing conversion.' + e);
            console.log(resp);
        }
    }
    connect() {
        if (this.socket && this.socket.connected) {
            return new Promise((resolve) => {
                return resolve(this.socket);
            });
        }
        else {
            return this.createSocket().then((socket) => {
                this.socket = socket;
            });
        }
    }
    createSocket() {
        return new Promise((resolve, reject) => {
            // this.socket = io(this.DATA_URL, {  pingTimeout: 30000, reconnectionDelayMax: 1000,  auth: {},  query: {}})
            let socket = new io(this.DATA_URL, {
                autoConnect: true,
                auth: {},
                query: {},
            });
            resolve(socket);
            return socket;
        });
    }
    getMessageService() {
        return this.MessageService;
    }
    switchServer(ServerDBName) {
        if (DP_config_1.URLs.NESTWS_ALL[ServerDBName]) {
            this.DATA_URL = DP_config_1.URLs.NESTWS_ALL[ServerDBName];
            return this.connect();
        }
    }
}
exports.SocketIODomainProxyServiceClass = SocketIODomainProxyServiceClass;
exports.socketIODomainProxyService = new SocketIODomainProxyServiceClass();
//# sourceMappingURL=MD.socketio.service.js.map