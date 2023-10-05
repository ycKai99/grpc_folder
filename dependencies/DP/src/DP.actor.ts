/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'; 
import { Observable, Subject, map } from 'rxjs';  
import { Behaviour, InOutObservable, PubSubInterface } from "./_interfaces/actor.operations";
import { SubscribeToProcessingBehaviour, subscibeToProcessing } from './_behaviour/DomainProxy.service';
import { States } from './_states/DomainProxy.states';
import { contextInterface } from './_context/DomainProxy.context';
import { Uuid } from './_interfaces/export';
import { BasicActor } from './_dependencies/BasicActor/src/basic.actor';

@Injectable()
export class DomainProxyActor extends BasicActor implements Behaviour,PubSubInterface {

  // Behaviours
  private subscribeToProcessing:SubscribeToProcessingBehaviour; // Subscribe to complete behaviour
  
  // Contructor
  constructor(settings?:any){ 
    // Parent
    super(settings);
    // Auto initialise
    this.initialise(settings);
  }

  // Setup initial behaviour
  initialise(settings?:any){
    // Supervisor behaviour - (Setup behaviour, instantiate any descendents)
    //...
    this.subscribeToProcessing = subscibeToProcessing; 
  }
   
  // Inherit and enhance your processing sequence here.
  protected handleProcessing(contextObservable: Observable<any>): Observable<any>{   
    let processingContext = contextObservable;
    
    // Domain Proxy operation
    processingContext = this.subscribeToProcessing(processingContext); 

    return processingContext;
  } 
 
} 
  
