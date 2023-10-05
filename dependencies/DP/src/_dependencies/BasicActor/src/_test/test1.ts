/* eslint-disable @typescript-eslint/no-empty-function */
 
import { Observable, interval } from 'rxjs';
import { BasicActor } from '../basic.actor'; 

// * Need to start server first.*

const newActor = new BasicActor();
const incomingObservable:Observable<any> = interval(3000);

newActor.initialise();
newActor.send(incomingObservable).subscribe(
    {
        error:(err)=>{
            console.log(err.message);
        },
        next:(msg)=>{ 
            console.log("Received Published Message");
            console.log(JSON.stringify(msg));
        },
        complete:()=>{
            console.log("Completed.");
        }
    }
)
 