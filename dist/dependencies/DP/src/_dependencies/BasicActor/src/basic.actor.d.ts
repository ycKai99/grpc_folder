import { Observable } from 'rxjs';
import { Behaviour, PubSubInterface } from "./_interfaces/actor.operations";
import { contextInterface } from './_context/basic.context';
export type ActorMessage = any;
export declare class BasicActor implements Behaviour, PubSubInterface {
    private alias;
    private instanceID;
    private subscibeToCompleted;
    protected actors: Record<string, BasicActor>;
    constructor(settings?: any);
    getAlias(): string;
    getInstanceID(): string;
    initialise(settings?: any): void;
    setActor(actorAlias: string, actorRef: BasicActor): void;
    getActor(actorAlias: string): BasicActor;
    getAllAliasActors(): [string, BasicActor][];
    emit(incomingObservable: Observable<any>): Observable<any>;
    subscribe(incomingObservable: Observable<any>): Observable<any>;
    sendMessage(incomingMessage: Observable<ActorMessage>): Observable<ActorMessage>;
    send(incomingContext: Observable<contextInterface>): Observable<contextInterface>;
    protected sendToChildProcessing(incomingContext: Observable<contextInterface>): Observable<contextInterface>;
    protected handleProcessing(contextObservable: Observable<any>): Observable<any>;
    IncomingMessageToContext(incomingObservable: Observable<any>): Observable<contextInterface>;
    ContextToOutgoingMessage(incomingObservable: Observable<any>): Observable<any>;
}
