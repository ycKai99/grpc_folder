import { Observable } from "rxjs";
import { StaticBehaviour } from "./../_interfaces/actor.operations";
import { contextInterface } from "../_context/DomainProxy.context";
import { SubscribeToCompleted } from "../_dependencies/BasicActor/src/_behaviour/basic.service";
export type SubscribeToProcessingBehaviour = (msg: Observable<contextInterface>) => Observable<contextInterface>;
export declare class SubscribeToProcessing extends SubscribeToCompleted implements StaticBehaviour {
    send(incomingObservable: Observable<contextInterface>): Observable<contextInterface>;
}
export declare const subscibeToProcessing: SubscribeToProcessingBehaviour;
