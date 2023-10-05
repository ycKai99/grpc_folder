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
const common_1 = require("@nestjs/common");
const export_1 = require("../../_dependencies/FISAppMessageJSUtility/interface/export");
const DP_config_1 = require("../../_config/DP.config");
const MD_controller_1 = require("../MD.controller");
let DomainProxyController = class DomainProxyController {
    constructor() {
        this.messageDeliveryController = new MD_controller_1.MessageDeliveryController();
    }
    initialise(applicationName) {
        this.setApplicationName(applicationName);
        if (applicationName > '') {
            this.setConnection({
                IdName: applicationName,
                Description: applicationName + ' connection.',
                Type: 'Http',
                Target: DP_config_1.URLs.NESTWS,
            });
        }
        else {
            this.getConnection('');
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
        if (settings.Type == 'Http' && settings.Target.slice(-8) != '/request') {
            settings.Target = settings.Target + '/request';
        }
        return this.messageDeliveryController.setConnection(settings);
    }
    setApplicationName(applicationName) {
        this.applicationName = applicationName;
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
        return this.messageDeliveryController.subscribe(connectionIdName, msg, isStream, connection);
    }
    subscribeWithCallback(connectionIdName, msg, callback) {
        return this.messageDeliveryController.subscribeWithCallback(connectionIdName, msg, callback);
    }
    sendPromise(connectionIdName, msg, appName = this.applicationName) {
        return this.messageDeliveryController.sendPromise(connectionIdName, msg);
    }
};
DomainProxyController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [])
], DomainProxyController);
exports.DomainProxyController = DomainProxyController;
//# sourceMappingURL=DP.controller.js.map