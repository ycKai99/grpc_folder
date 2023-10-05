/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */ 
import { Observable, Subject, from, map, of } from 'rxjs';  
import { Behaviour, InOutObservable, PubSubInterface } from "./_interfaces/actor.operations";
import { SubscribeToCompletedBehaviour, subscribeToCompleted } from './_behaviour/basic.service';
import { States } from './_states/basic.states';
import { contextInterface } from './_context/basic.context';
import { v4 as uuidv4 } from 'uuid';
 
export type ActorMessage = any;

export class BasicActor implements Behaviour,PubSubInterface {

  // Alias
  private alias:string;

  // InstanceID
  private instanceID:string;

  // Behaviours
  private subscibeToCompleted:SubscribeToCompletedBehaviour; // Subscribe to complete behaviour

  // Actor Reference
  protected actors:Record<string,BasicActor>= {};

  // Contructor
  constructor(settings?:any){
    // Default setup
    this.alias = "BasicActor";
    this.instanceID = uuidv4();

    // Auto initialise
    this.initialise(settings);
  }  

  // Get alias
  getAlias()
  {
    return this.alias;
  }
  
  // Get instance ID
  getInstanceID()
  {
    return this.instanceID;
  }

  // Setup initial behaviour
  initialise(settings?:any){
    // Supervisor behaviour - (Setup behaviour, instatiate any descendents)
    //...
    this.subscibeToCompleted = subscribeToCompleted; 
  }
  
  // Add child actor
  setActor(actorAlias:string,actorRef:BasicActor):void{
    this.actors[actorAlias] = actorRef;
  }

  // Get child actor
  getActor(actorAlias:string):BasicActor{
    return this.actors[actorAlias];
  } 
  
  // Get all child actor
  getAllAliasActors():[string, BasicActor][]{
    let allAliasActors =  Object.entries(this.actors);
    return allAliasActors;
  } 

  // To emit event:
  emit(incomingObservable: Observable<any>): Observable<any>
  {
    const newObservable: Observable<any> = new Observable((subscriber) => { 

      // Subscribe to incoming
      this.send(incomingObservable).subscribe(
          {
            next:(msg:any)=>{
              // Publish the result
              subscriber.next({
                status:1,
                code:"Ok",
                message:"Emit okay"
              })
            },
            error:()=>{
              // Publish the result
              subscriber.next({
                status:-1,
                code:"Error",
                message:"Emit error"
              }) 
            }
          }
      ) 
    })
    return newObservable;
  }
    
  // To subscribe events:
  subscribe(incomingObservable: Observable<any>): Observable<any>
  {
    const newObservable: Observable<any> = new Observable((subscriber) => { 

      // Subscribe to incoming
      this.send(incomingObservable).subscribe(
          {
            next:(msg:contextInterface)=>{
              // Publish the result
              subscriber.next(msg)
            },
            error:(err:any)=>{
              // Publish the result
              subscriber.next({
                status:-1,
                code:"Error",
                message:"Subscribe error."+err.message
              })
            }
          }
      ) 
    })
    return newObservable;
  }

  // Send message
  sendMessage(incomingMessage: Observable<ActorMessage>): Observable<ActorMessage>{
    
    let incomingContext:Observable<contextInterface>
    let outgoingContext:Observable<contextInterface>
    let outgoingMessage:Observable<ActorMessage>

    incomingContext = this.IncomingMessageToContext(incomingMessage); 
    outgoingContext = this.send(incomingContext)
    outgoingMessage = this.ContextToOutgoingMessage(outgoingContext);

    return outgoingMessage;
  }

  // A common send approach
  send(incomingContext: Observable<contextInterface>): Observable<contextInterface>{    

    // Declare types  
    let processingContext:Observable<contextInterface>;  

    // Setup Context processing  
    processingContext = this.handleProcessing(incomingContext);
 
    // Setup internal Child Actor's Context processing  
    processingContext = this.sendToChildProcessing(processingContext);
      
    return processingContext;
  } 

  // Child setup for send subscription
  protected sendToChildProcessing(incomingContext: Observable<contextInterface>): Observable<contextInterface>{ 
    
    // Declare types  
    let processingContext:Subject<contextInterface>;
    let aliasActorArray = this.getAllAliasActors();
 
    // Check if child valid
    if(aliasActorArray.length > 0)
    {
    
      // Initialise types  
      processingContext = new Subject(); // The only subject in the actor.

      // Incoming context enter child processing context 
      incomingContext.subscribe(processingContext); 

      // Loop each child 
      for(let ind = 1; ind< aliasActorArray.length; ind ++)
      { 
        processingContext.subscribe(
          {
            "next":(context:contextInterface)=>{
              if(aliasActorArray[ind][0]==context.target)
              {
                aliasActorArray[ind][1].send(from([context])).subscribe(processingContext);  
              }
            }
          }
        ) 
      }

      // Return processing context
      return processingContext.asObservable();
    }
  } 

  // Inherit and enhance your processing sequence here. 
  // This sample only has 1 behaviour. To handle multiple behaviours, subscribe for each behaviour
  protected handleProcessing(contextObservable: Observable<any>): Observable<any>{   
    let processingContext = contextObservable;
    
    // Sample operation
    // processingContext = this.subscibeToCompleted(processingContext); 

    return processingContext;
  } 

  // Convert message to context
  IncomingMessageToContext(incomingObservable:Observable<any>)
  {
    return incomingObservable.pipe(
      map((msg:any)=>{
 
        console.log("Incoming Message"); 
        console.log(JSON.stringify(msg));

        let newContext:contextInterface = {
          requestId: "NewUuid",
          state: States.Start,  
          message: msg 
        }
        
        console.log("Incoming Context"); 
        console.log(JSON.stringify(newContext));

        return newContext
      })
    )
  }
  
  // Convert context to message
  ContextToOutgoingMessage(incomingObservable:Observable<any>)
  {
    return incomingObservable.pipe(
      map((context:contextInterface)=>{
 
        console.log("Outgoing Context"); 
        console.log(JSON.stringify(context));

        // Get return message from context
        let returnMessage:any = context.message;

        console.log("Outgoing Message"); 
        console.log(JSON.stringify(returnMessage));
 
        return returnMessage
      })
    );
  }  
  
} 
  
