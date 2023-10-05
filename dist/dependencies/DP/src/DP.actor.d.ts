import { Observable } from 'rxjs';
import { Behaviour, PubSubInterface } from "./_interfaces/actor.operations";
import { BasicActor } from './_dependencies/BasicActor/src/basic.actor';
export declare class DomainProxyActor extends BasicActor implements Behaviour, PubSubInterface {
    private subscribeToProcessing;
    constructor(settings?: any);
    initialise(settings?: any): void;
    protected handleProcessing(contextObservable: Observable<any>): Observable<any>;
}
