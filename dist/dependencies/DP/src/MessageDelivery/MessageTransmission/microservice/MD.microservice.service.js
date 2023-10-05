"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroserviceDomainProxyService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let MicroserviceDomainProxyService = class MicroserviceDomainProxyService {
    constructor() {
        this.isConnectionStatusObserved = false;
    }
    initialise(settings) {
        this.settings = settings;
        this['status'] = 'disconnected';
    }
    emit(msg) {
        return this.client
            .emit('message', msg)
            .pipe((0, rxjs_1.map)((resp) => this.convertFisAppResponse(resp)));
    }
    send(msg, isStream = true) {
        return this.client
            .send('request', msg)
            .pipe((0, rxjs_1.map)((resp) => this.convertFisAppResponse(resp)));
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
    startClient(client) {
        this.client = client;
        try {
            this.client.connect();
        }
        catch (e) {
            console.error(e);
        }
    }
    getMessageService() {
        return this.MessageService;
    }
};
MicroserviceDomainProxyService = __decorate([
    (0, common_1.Controller)('')
], MicroserviceDomainProxyService);
exports.MicroserviceDomainProxyService = MicroserviceDomainProxyService;
//# sourceMappingURL=MD.microservice.service.js.map