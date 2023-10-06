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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainProxyController = void 0;
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
const common_1 = require("@nestjs/common");
const export_1 = require("../dependencies/FISAppMessageJSUtility/interface/export"); // Message Library
const DP_config_1 = require("../config/DP.config");
const MD_controller_1 = require("./MD.controller");
let DomainProxyController = class DomainProxyController {
    constructor() {
        this.messageDeliveryController = new MD_controller_1.MessageDeliveryController();
    }
    initialise(applicationName) {
        this.setApplicationName(applicationName);
        // Initialise the connection
        if (applicationName > '') {
            this.setConnection({
                // Identifier Name that is Unique
                IdName: applicationName,
                // Description
                Description: applicationName + ' connection.',
                // Type
                //Type: 'SocketIO', // 2023-03-13 - Change default to HTTP
                Type: 'Http',
                // Type
                Target: DP_config_1.URLs.NESTWS,
            });
        }
        else {
            this.getConnection(''); // Initialise the connection
        }
    }
    getLogger() {
        return this.messageDeliveryController.getLogger();
    }
    getConnection(connectionIdName) {
        return this.messageDeliveryController.getConnection(connectionIdName);
    }
    setIsConnectionStatusObserved(connectionIdName, isObserved) {
        return this.messageDeliveryController.setIsConnectionStatusObserved(connectionIdName, isObserved);
    }
    getIsConnectionStatusObserved(connectionIdName, isObserved) {
        return this.messageDeliveryController.getIsConnectionStatusObserved(connectionIdName, isObserved);
    }
    setConnection(settings) {
        // 2023-03-20 - Added /request for https 
        if (settings.Type == 'Http' && settings.Target.slice(-8) != '/request') {
            settings.Target = settings.Target + '/request';
        }
        // End 2023-03-20 - Added /request for https 
        return this.messageDeliveryController.setConnection(settings);
    }
    setApplicationName(applicationName) {
        this.applicationName = applicationName;
        // Update shared services
        this.changeMessageService(new export_1.FisCreateMessageUtility(this.applicationName));
    }
    changeMessageService(messageService) {
        return this.messageDeliveryController.changeMessageService(messageService);
    }
    getMessageService() {
        return this.messageDeliveryController.getMessageService();
    }
    emit(connectionIdName, msg) {
        return this.messageDeliveryController.emit(connectionIdName, msg);
    }
    send(connectionIdName, msg, isStreamable = true, connection, newConnection = false) {
        return this.messageDeliveryController.send(connectionIdName, msg, isStreamable, connection, newConnection);
    }
    subscribe(connectionIdName, msg, isStream = true, connection) {
        // Note:
        // AxiosHTTP subscription is okay.
        // Socket.io subscription is okay.
        // Grpc subscription may be okay. 
        return this.messageDeliveryController.subscribe(connectionIdName, msg, isStream, connection);
    }
    subscribeWithCallback(connectionIdName, msg, callback) {
        return this.messageDeliveryController.subscribeWithCallback(connectionIdName, msg, callback);
    }
    // Added promise to satify simple use case. Please use observable as necessarily.
    sendPromise(connectionIdName, msg, appName = this.applicationName) {
        return this.messageDeliveryController.sendPromise(connectionIdName, msg);
    }
};
DomainProxyController = __decorate([
    common_1.Controller('') // NestJS require provider at all contructor. Simplified with having it start by event listener. More flexibility.
    ,
    __metadata("design:paramtypes", [])
], DomainProxyController);
exports.DomainProxyController = DomainProxyController;
//# sourceMappingURL=DP.controller.js.map