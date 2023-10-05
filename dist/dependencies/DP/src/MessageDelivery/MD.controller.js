"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDeliveryController = void 0;
const MD_socketio_service_1 = require("./MessageTransmission/socketio/MD.socketio.service");
const MD_http_service_1 = require("./MessageTransmission/http/MD.http.service");
const MD_microservice_service_1 = require("./MessageTransmission/microservice/MD.microservice.service");
const MD_grpc_service_1 = require("./MessageTransmission/grpc/_behaviour/MD.grpc.service");
const DP_config_1 = require("../_config/DP.config");
const rxjs_1 = require("rxjs");
const logging_service_1 = require("./LoggingService/logging.service");
class MessageDeliveryController {
    constructor(settings) {
        this.connectionsList = {};
        this.logger = new logging_service_1.LoggingService(MessageDeliveryController.name);
    }
    getLogger() {
        return this.logger;
    }
    getConnection(connectionIdName) {
        let currentConnectionIdName = connectionIdName;
        if (currentConnectionIdName == '') {
            currentConnectionIdName = 'Default';
            if (!this.connectionsList[currentConnectionIdName]) {
                this.setConnection({
                    IdName: 'Default',
                    Description: 'Default connection.',
                    Type: 'Http',
                    Target: DP_config_1.URLs.NESTWS,
                });
            }
        }
        return this.connectionsList[currentConnectionIdName];
    }
    setIsConnectionStatusObserved(connectionIdName, isObserved) {
        this.getConnection(connectionIdName).isConnectionStatusObserved =
            isObserved;
    }
    getIsConnectionStatusObserved(connectionIdName, isObserved) {
        return this.getConnection(connectionIdName).isConnectionStatusObserved;
    }
    setConnection(settings) {
        let connectionIdName = settings.IdName;
        if (settings.Type == 'SocketIO') {
            let DP = new MD_socketio_service_1.SocketIODomainProxyServiceClass();
            DP.DATA_URL = settings.Target;
            DP.initialise(settings);
            this.connectionsList[connectionIdName] = DP;
        }
        if (settings.Type == 'Http') {
            let DP = new MD_http_service_1.AxiosHttpDomainProxyServiceClass();
            DP.DATA_URL = settings.Target;
            DP.initialise(settings);
            this.connectionsList[connectionIdName] = DP;
        }
        if (settings.Type == 'Microservice') {
            let DP = new MD_microservice_service_1.MicroserviceDomainProxyService();
            DP.initialise(settings);
            this.connectionsList[connectionIdName] = DP;
        }
        if (settings.Type == 'grpc') {
            let DP = new MD_grpc_service_1.GRPCDomainProxyServiceClass();
            DP.initialise(settings);
            this.connectionsList[connectionIdName] = DP;
        }
        if (this.getMessageService()) {
            this.changeMessageService(this.getMessageService());
        }
        return this.connectionsList[connectionIdName];
    }
    changeMessageService(messageService) {
        this.MessageService = messageService;
        for (const key in this.connectionsList) {
            this.connectionsList[key].MessageService = this.MessageService =
                messageService;
        }
    }
    getMessageService() {
        return this.MessageService;
    }
    emit(connectionIdName, msg) {
        this.logger.addToLog(msg, ['emit']);
        return this.getConnection(connectionIdName).emit(msg);
    }
    send(connectionIdName, msg, isStreamable = true, connection, newConnection = false) {
        let observableResult = new rxjs_1.Subject();
        let type = '';
        this.logger.addToLog(msg, ['send', 'request']);
        this.logger.subscribeToLog(observableResult, ['send', 'response']);
        if (this.getConnection(connectionIdName) &&
            this.getConnection(connectionIdName)['settings']['Type']) {
            type = this.getConnection(connectionIdName)['settings'];
        }
        if (type == 'SocketIO') {
            let DP = this.getConnection(connectionIdName);
            DP.send(msg, isStreamable, connection).subscribe(observableResult);
        }
        else if (type == '') {
            throw new Error('Unknown or uninitialised connection type set.');
        }
        else {
            this.getConnection(connectionIdName)
                .send(msg)
                .subscribe(observableResult);
        }
        return observableResult.asObservable();
    }
    subscribe(connectionIdName, msg, isStream = true, connection) {
        this.logger.addToLog(msg, ['subscribe']);
        return this.send(connectionIdName, msg, isStream, connection);
    }
    subscribeWithCallback(connectionIdName, msg, callback) {
        let connection = {
            status: 'connected',
        };
        let subscription = this.subscribe(connectionIdName, msg, true, connection).subscribe({
            next: (resp) => {
                callback.next(resp);
            },
            error: (err) => {
                if (subscription)
                    subscription.unsubscribe();
                callback.error(err);
            },
            complete: () => {
                if (subscription)
                    subscription.unsubscribe();
                if (connection.status == 'Error') {
                    console.log('Error.');
                    console.log('Reconnecting...');
                    this.subscribeWithCallback(connectionIdName, msg, callback);
                }
                else {
                    console.log('Subscription closed.');
                    console.log('Reconnecting....');
                    this.subscribeWithCallback(connectionIdName, msg, callback);
                }
                callback.complete();
            },
        });
        return subscription;
    }
    sendPromise(connectionIdName, msg) {
        let observableResponse = this.send(connectionIdName, msg);
        return (0, rxjs_1.firstValueFrom)(observableResponse);
    }
}
exports.MessageDeliveryController = MessageDeliveryController;
//# sourceMappingURL=MD.controller.js.map