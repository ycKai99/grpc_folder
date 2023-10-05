import { Observable } from "rxjs";
export interface PubSubInterface {
    initialise(settings?: any): any;
    emit: InOutObservable;
    send: InOutObservable;
    subscribe?: InOutObservable;
}
export type InOutObservable = (msg: Observable<any>) => Observable<any>;
export interface StaticBehaviour {
    send: InOutObservable;
}
export type Behaviour = StaticBehaviour;
