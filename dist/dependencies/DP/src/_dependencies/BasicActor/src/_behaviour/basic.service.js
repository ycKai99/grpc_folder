"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToCompleted = exports.SubscribeToCompleted = void 0;
const rxjs_1 = require("rxjs");
const basic_states_1 = require("../_states/basic.states");
const console_log_1 = require("./utility/console_log");
class SubscribeToCompleted {
    send(incomingObservable) {
        const newObservable = new rxjs_1.Observable((subscriber) => {
            incomingObservable.subscribe({
                next: (msg) => {
                    if (msg.state != basic_states_1.States.Completed) {
                        (0, console_log_1.console_log)("Execute Context");
                        (0, console_log_1.console_log)(JSON.stringify(msg));
                        const newPayload = JSON.parse(JSON.stringify(msg));
                        newPayload.state = basic_states_1.States.Completed;
                        subscriber.next(newPayload);
                    }
                }
            });
        });
        return newObservable;
    }
}
exports.SubscribeToCompleted = SubscribeToCompleted;
exports.subscribeToCompleted = new SubscribeToCompleted().send;
//# sourceMappingURL=basic.service.js.map