/* eslint-disable @typescript-eslint/no-empty-interface */
import { Observable } from "rxjs"  
 
// Actor interface
export interface PubSubInterface {
    // Setup connection interface
    initialise(settings?:any); 
    // To emit event:
    emit:InOutObservable;
    // To perform a task:
    send:InOutObservable;
    // To subscribe events:
    subscribe?:InOutObservable;
}

// Input output observable interface
export type InOutObservable = (msg: Observable<any>) => Observable<any>;
  
// Actor - Static Behaviour interface
export interface StaticBehaviour {
    // To perform a task:
    send:InOutObservable
}
 
// Actor - General Behaviour interface
export type Behaviour = StaticBehaviour
   