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
exports.DomainProxyActor = void 0;
const common_1 = require("@nestjs/common");
const DomainProxy_service_1 = require("./_behaviour/DomainProxy.service");
const basic_actor_1 = require("./_dependencies/BasicActor/src/basic.actor");
let DomainProxyActor = class DomainProxyActor extends basic_actor_1.BasicActor {
    constructor(settings) {
        super(settings);
        this.initialise(settings);
    }
    initialise(settings) {
        this.subscribeToProcessing = DomainProxy_service_1.subscibeToProcessing;
    }
    handleProcessing(contextObservable) {
        let processingContext = contextObservable;
        processingContext = this.subscribeToProcessing(processingContext);
        return processingContext;
    }
};
DomainProxyActor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], DomainProxyActor);
exports.DomainProxyActor = DomainProxyActor;
//# sourceMappingURL=DP.actor.js.map