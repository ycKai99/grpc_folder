"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MessageDeliveryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDeliveryController = void 0;
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
const common_1 = require("@nestjs/common");
const MD_socketio_service_1 = require("./MD.socketio.service");
const MD_http_service_1 = require("./MD.http.service");
const MD_microservice_service_1 = require("./MD.microservice.service");
const MD_grpc_service_1 = require("./MD.grpc.service");
const DP_config_1 = require("../config/DP.config");
const rxjs_1 = require("rxjs");
const logging_service_1 = require("../queue/logging.service");
let MessageDeliveryController = MessageDeliveryController_1 = class MessageDeliveryController {
    constructor() {
        this.connectionsList = {};
        this.logger = new logging_service_1.LoggingService(MessageDeliveryController_1.name);
    }
    getLogger() {
        return this.logger;
    }
    getConnection(connectionIdName) {
        let currentConnectionIdName = connectionIdName;
        if (currentConnectionIdName == '') {
            currentConnectionIdName = 'Default';
            // Start default if not yet started
            if (!this.connectionsList[currentConnectionIdName]) {
                // Set defaults
                this.setConnection({
                    // Identifier Name that is Unique
                    IdName: 'Default',
                    // Description
                    Description: 'Default connection.',
                    // Type
                    //Type: 'SocketIO', // 2023-03-13 - Change default to HTTP
                    Type: 'Http',
                    // Type
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
            // Set instance
            let DP = new MD_socketio_service_1.SocketIODomainProxyServiceClass();
            DP.DATA_URL = settings.Target;
            DP.initialise(settings);
            this.connectionsList[connectionIdName] = DP;
        }
        if (settings.Type == 'Http') {
            // Set instance
            let DP = new MD_http_service_1.AxiosHttpDomainProxyServiceClass();
            DP.DATA_URL = settings.Target;
            DP.initialise(settings);
            this.connectionsList[connectionIdName] = DP;
        }
        if (settings.Type == 'Microservice') {
            // Set instance
            let DP = new MD_microservice_service_1.MicroserviceDomainProxyService();
            DP.initialise(settings);
            this.connectionsList[connectionIdName] = DP;
        }
        if (settings.Type == 'grpc') {
            // Set instance
            let DP = new MD_grpc_service_1.GRPCDomainProxyServiceClass();
            DP.initialise(settings);
            this.connectionsList[connectionIdName] = DP;
        }
        if (this.getMessageService()) {
            // Refresh all message services to be same
            this.changeMessageService(this.getMessageService());
        }
        return this.connectionsList[connectionIdName];
    }
    changeMessageService(messageService) {
        this.MessageService = messageService;
        // Update shared services
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
        // Add request to log
        this.logger.addToLog(msg, ['send', 'request']);
        // Add response to log
        this.logger.subscribeToLog(observableResult, ['send', 'response']);
        if (this.getConnection(connectionIdName) &&
            this.getConnection(connectionIdName)['settings']['Type']) {
            type = this.getConnection(connectionIdName)['settings'];
        }
        if (type == 'SocketIO') {
            let DP = this.getConnection(connectionIdName);
            DP.send(msg, isStreamable, connection).subscribe(observableResult); // subscribe to share send observable result to subject
        }
        else if (type == '') {
            throw new Error('Unknown or uninitialised connection type set.');
        }
        else {
            this.getConnection(connectionIdName)
                .send(msg)
                .subscribe(observableResult); // subscribe to share send observable result to subject
        }
        return observableResult.asObservable();
    }
    subscribe(connectionIdName, msg, isStream = true, connection) {
        // Note:
        // AxiosHTTP subscription is okay.
        // Socket.io subscription is okay.
        // Grpc subscription may be okay.
        // Add to log
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
    // Added promise to satify simple use case. Please use observable as necessarily.
    sendPromise(connectionIdName, msg) {
        let observableResponse = this.send(connectionIdName, msg);
        return rxjs_1.firstValueFrom(observableResponse);
    }
};
MessageDeliveryController = MessageDeliveryController_1 = __decorate([
    common_1.Controller('') // NestJS require provider at all contructor. Simplified with having it start by event listener. More flexibility.
    ,
    __metadata("design:paramtypes", [])
], MessageDeliveryController);
exports.MessageDeliveryController = MessageDeliveryController;
//# sourceMappingURL=MD.controller.js.map