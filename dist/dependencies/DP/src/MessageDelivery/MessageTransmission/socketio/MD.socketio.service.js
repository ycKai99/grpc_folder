"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIODomainProxyService = exports.SocketIODomainProxyServiceClass = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DP_config_1 = require("../../../_config/DP.config");
const export_1 = require("../../../_dependencies/FISAppMessageJSUtility/interface/export");
const io = require('socket.io-client');
class SocketIODomainProxyServiceClass {
    initialise(settings) {
        this.settings = settings;
        this['status'] = 'disconnected';
    }
    emit(msg) {
        let subject = new rxjs_1.Subject();
        let subscription = this.send(msg, true).subscribe(subject);
        return subject.asObservable();
    }
    send(msg, isStream = true, connection) {
        if (!connection) {
            connection = {};
        }
        let observer;
        let observableResult = new rxjs_1.Observable((localObserver) => {
            observer = localObserver;
            this.connect().then((socket) => {
                this.bindObserverToSocket(this.socket, observer, isStream, connection, msg.header.security.ucpId, msg.header.messageID);
                this.socket['observableResult'] = observableResult;
                this.socket.emit('request', this.MessageService.getDPmessage(msg));
            });
        }).pipe((0, operators_1.map)((resp) => this.convertFisAppResponse(resp)));
        return observableResult;
    }
    bindObserverToSocket(socket, observer, isStream, connection, ucpId, requestId) {
        {
            socket.on('connect', () => {
                console.log('Client connected.');
            });
            socket.on('response', (res) => {
                if (res.id > '') {
                    if (!res.complete) {
                        if (res.message) {
                            const response_msg = JSON.parse(res.message);
                            let requestRespondtoID = '';
                            if (res.id) {
                                requestRespondtoID = res.id;
                            }
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
                            if (requestRespondtoID == '' &&
                                response_msg &&
                                response_msg.header &&
                                response_msg.header.requestMessageRespondTo &&
                                response_msg.header.requestMessageRespondTo.header &&
                                response_msg.header.requestMessageRespondTo.header.messageID) {
                                requestRespondtoID =
                                    response_msg.header.requestMessageRespondTo.header.messageID;
                            }
                            if (requestRespondtoID > '') {
                                if (requestRespondtoID == requestId) {
                                    observer.next(res);
                                }
                            }
                            else {
                                observer.next(res);
                            }
                        }
                    }
                    else if (res.complete) {
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
            let socket = new io(this.DATA_URL, {
                autoConnect: true,
                auth: {},
                query: {},
            });
            resolve(socket);
            return socket;
        });
    }
    constructor(http) {
        this.http = http;
        this.isConnectionStatusObserved = false;
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