"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscibeToProcessing = exports.SubscribeToProcessing = void 0;
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
const DomainProxy_states_1 = require("../_states/DomainProxy.states");
const basic_service_1 = require("../_dependencies/BasicActor/src/_behaviour/basic.service");
const environment_1 = require("../_environment/environment");
const showMessage = environment_1.process.env.showMessage;
let SubscribeToProcessing = class SubscribeToProcessing extends basic_service_1.SubscribeToCompleted {
    send(incomingObservable) {
        const newObservable = new rxjs_1.Observable((subscriber) => {
            incomingObservable.subscribe({
                next: (msg) => {
                    if (msg.state != DomainProxy_states_1.States.Completed) {
                        if (showMessage.toUpperCase() == 'YES') {
                            console.log("[New message]");
                            console.log("data=" + JSON.stringify(msg.message["data"], null, 4) || "header=" + JSON.stringify(msg.message["header"]["messageID"], null, 4));
                        }
                    }
                }
            });
        });
        return newObservable;
    }
};
SubscribeToProcessing = __decorate([
    (0, common_1.Injectable)()
], SubscribeToProcessing);
exports.SubscribeToProcessing = SubscribeToProcessing;
exports.subscibeToProcessing = new SubscribeToProcessing().send;
//# sourceMappingURL=DomainProxy.service.js.map