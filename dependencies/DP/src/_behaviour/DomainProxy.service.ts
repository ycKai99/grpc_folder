/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable, from } from "rxjs"
import { InOutObservable, StaticBehaviour } from "./../_interfaces/actor.operations"; 
import { Injectable } from "@nestjs/common";
import { contextInterface } from "../_context/DomainProxy.context";
import { States } from "../_states/DomainProxy.states"; 
import { SubscribeToCompleted } from "../_dependencies/BasicActor/src/_behaviour/basic.service";
import { process } from "../_environment/environment";


export type SubscribeToProcessingBehaviour = (msg: Observable<contextInterface>)=> Observable<contextInterface>;
const showMessage = process.env.showMessage

@Injectable()
export class SubscribeToProcessing extends SubscribeToCompleted implements StaticBehaviour{

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
                            if(showMessage.toUpperCase()=='YES')
                            {
                                console.log("[New message]"); 
                                console.log("data="+JSON.stringify(msg.message["data"],null,4)||"header="+JSON.stringify(msg.message["header"]["messageID"],null,4));  
                            } 
                        }
                    }
                }
            ) 
          }
        );
        
        return newObservable;
    }
}

export const subscibeToProcessing:SubscribeToProcessingBehaviour = new SubscribeToProcessing().send;
 