/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable, from } from "rxjs"
import { InOutObservable, StaticBehaviour } from "../_interfaces/actor.operations"; 
import { contextInterface } from "../_context/basic.context";
import { States } from "../_states/basic.states";
import { console_log } from "./utility/console_log";

export type SubscribeToCompletedBehaviour = (msg: Observable<contextInterface>)=> Observable<contextInterface>;
 
export class SubscribeToCompleted implements StaticBehaviour{

    // To perform a task:
    send(incomingObservable: Observable<contextInterface>): Observable<contextInterface>{

        const newObservable: Observable<contextInterface> = new Observable((subscriber) => { 

            // Subscribe to incoming
            incomingObservable.subscribe(
                {
                    next:(msg:contextInterface)=>{

                         
                        // Check for state
                        if(msg.state!=States.Completed)
                        {
                            // Must be stringify-able
                            // Call console log in utlity as example
                            console_log("Execute Context"); 
                            console_log(JSON.stringify(msg));

                            // New payload
                            const newPayload:contextInterface = JSON.parse(JSON.stringify(msg));
                            newPayload.state = States.Completed;

                            // Publish the result
                            subscriber.next(newPayload)
                        }
                    }
                }
            ) 
          }
        );
        
        return newObservable;
    }
}

export const subscribeToCompleted:SubscribeToCompletedBehaviour = new SubscribeToCompleted().send;
 