import { Observable } from "rxjs";
import { StaticBehaviour } from "../_interfaces/actor.operations";
import { contextInterface } from "../_context/basic.context";
export type SubscribeToCompletedBehaviour = (msg: Observable<contextInterface>) => Observable<contextInterface>;
export declare class SubscribeToCompleted implements StaticBehaviour {
    send(incomingObservable: Observable<contextInterface>): Observable<contextInterface>;
}
export declare const subscribeToCompleted: SubscribeToCompletedBehaviour;
