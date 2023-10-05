"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicActor = void 0;
const rxjs_1 = require("rxjs");
const basic_service_1 = require("./_behaviour/basic.service");
const basic_states_1 = require("./_states/basic.states");
const uuid_1 = require("uuid");
class BasicActor {
    constructor(settings) {
        this.actors = {};
        this.alias = "BasicActor";
        this.instanceID = (0, uuid_1.v4)();
        this.initialise(settings);
    }
    getAlias() {
        return this.alias;
    }
    getInstanceID() {
        return this.instanceID;
    }
    initialise(settings) {
        this.subscibeToCompleted = basic_service_1.subscribeToCompleted;
    }
    setActor(actorAlias, actorRef) {
        this.actors[actorAlias] = actorRef;
    }
    getActor(actorAlias) {
        return this.actors[actorAlias];
    }
    getAllAliasActors() {
        let allAliasActors = Object.entries(this.actors);
        return allAliasActors;
    }
    emit(incomingObservable) {
        const newObservable = new rxjs_1.Observable((subscriber) => {
            this.send(incomingObservable).subscribe({
                next: (msg) => {
                    subscriber.next({
                        status: 1,
                        code: "Ok",
                        message: "Emit okay"
                    });
                },
                error: () => {
                    subscriber.next({
                        status: -1,
                        code: "Error",
                        message: "Emit error"
                    });
                }
            });
        });
        return newObservable;
    }
    subscribe(incomingObservable) {
        const newObservable = new rxjs_1.Observable((subscriber) => {
            this.send(incomingObservable).subscribe({
                next: (msg) => {
                    subscriber.next(msg);
                },
                error: (err) => {
                    subscriber.next({
                        status: -1,
                        code: "Error",
                        message: "Subscribe error." + err.message
                    });
                }
            });
        });
        return newObservable;
    }
    sendMessage(incomingMessage) {
        let incomingContext;
        let outgoingContext;
        let outgoingMessage;
        incomingContext = this.IncomingMessageToContext(incomingMessage);
        outgoingContext = this.send(incomingContext);
        outgoingMessage = this.ContextToOutgoingMessage(outgoingContext);
        return outgoingMessage;
    }
    send(incomingContext) {
        let processingContext;
        processingContext = this.handleProcessing(incomingContext);
        processingContext = this.sendToChildProcessing(processingContext);
        return processingContext;
    }
    sendToChildProcessing(incomingContext) {
        let processingContext;
        let aliasActorArray = this.getAllAliasActors();
        if (aliasActorArray.length > 0) {
            processingContext = new rxjs_1.Subject();
            incomingContext.subscribe(processingContext);
            for (let ind = 1; ind < aliasActorArray.length; ind++) {
                processingContext.subscribe({
                    "next": (context) => {
                        if (aliasActorArray[ind][0] == context.target) {
                            aliasActorArray[ind][1].send((0, rxjs_1.from)([context])).subscribe(processingContext);
                        }
                    }
                });
            }
            return processingContext.asObservable();
        }
    }
    handleProcessing(contextObservable) {
        let processingContext = contextObservable;
        return processingContext;
    }
    IncomingMessageToContext(incomingObservable) {
        return incomingObservable.pipe((0, rxjs_1.map)((msg) => {
            console.log("Incoming Message");
            console.log(JSON.stringify(msg));
            let newContext = {
                requestId: "NewUuid",
                state: basic_states_1.States.Start,
                message: msg
            };
            console.log("Incoming Context");
            console.log(JSON.stringify(newContext));
            return newContext;
        }));
    }
    ContextToOutgoingMessage(incomingObservable) {
        return incomingObservable.pipe((0, rxjs_1.map)((context) => {
            console.log("Outgoing Context");
            console.log(JSON.stringify(context));
            let returnMessage = context.message;
            console.log("Outgoing Message");
            console.log(JSON.stringify(returnMessage));
            return returnMessage;
        }));
    }
}
exports.BasicActor = BasicActor;
//# sourceMappingURL=basic.actor.js.map