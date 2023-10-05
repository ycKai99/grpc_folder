// Test Observable //

import mongoose, { Model } from "mongoose";
import { Subject, from, map, of, interval, buffer, asyncScheduler, observeOn, takeUntil, delay, queueScheduler, bufferWhen } from "rxjs";
import { SearchService } from "../services/query.service";
const used = process.memoryUsage();

let MongooseConnection: mongoose.Connection
let connectionStatus = 0

let mongoStorage: any = {
    type: `MongoDB`,
    url: `mongodb://192.168.100.59:27017/default`
}

let testSubject: Subject<any> = new Subject()
let count = 0

// Connect to designated storage destination
async function connectMongo(storage: Storage) {
    return new Promise((resolve, reject) => {
        try {
            console.log(`Connecting to ${storage.url}`)
            MongooseConnection = mongoose.createConnection(storage.url)
            connectionStatus = 1
            resolve(connectionStatus)
        }
        catch (error) {
            connectionStatus = 0
            console.error('An error occurred while connecting to the database:', error);
            setTimeout(() => {
                connectMongo(storage).then(() => {
                    resolve(connectionStatus)
                })
                console.log(`Reconnecting...`)
            }, 3000);
        }
    })
}

// Acquire data from Mongo
function streamMongoData(storage: Storage, subjectStream: Subject<any>) {
    connectMongo(storage).then(() => {
        let message: Model<any> = MongooseConnection.model('Message', require('../types/message.schema'))
        let stream = message.find().limit(10).cursor()

        stream.on('data', (data: any) => subjectStream.next(data));
        stream.on('error', (error) => subjectStream.error(error));
        stream.on('end', () => subjectStream.complete());
    })

}







/* --------------- Understanding the Concepts && Behaviour --------------- */
// Callbacks to be used to emulate high traffic observables subscription to observe it's behaviour.
// What happens if the data received is used to call other functions that may take a while to finish, observe what happens to the stream and event stack.
async function handler1(element): Promise<any> {
    return new Promise((resolve, reject) => {
        const min = 1;
        const max = 5;
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(() => {
            console.log(`Handler 1: Processing data ${element} for ${randomInt} seconds.`)
            resolve(element)
        }, randomInt * 1000)
    })
}
function handler2(element: any) {
    const min = 1;
    const max = 5;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(() => {
        console.log(`Handler 2: Processing data ${element} for ${randomInt} seconds.`)
        handlers(element)
    }, randomInt * 1000)
}
function handlers(element: any) {
    const min = 1;
    const max = 5;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(() => {
        console.log(`Callback Handlers: Processing data ${element} for ${randomInt} seconds.`)
    }, randomInt * 1000)
}
function printLog() {
    let service = new SearchService()
    service.callFromOtherClass()
}

/* Explanation: So the producer will emit 1 data very 1 second indefinitely. For the consumer, when they subscribes to the producer, the data will be consumed.
So when the producer emits data, the next method of the consumer is called, and the following tasks are registered into the call stack or event queue:

1.The console.log() statement logs the received data to the console. This task is synchronous and is executed immediately.
2.The handler1() function is called with the received data as an argument. This task is asynchronous and is added to the event queue.
The then() method of the Promise returned by handler1() is called with a callback function as an argument. This task is also asynchronous and is added to the event queue.
3.The printLog() function is called. This task is synchronous and is executed immediately.

After all synchronous tasks in the call stack are completed, the asynchronous tasks in the event queue are executed one by one, starting with the handler1() function call
and followed by the then() callback function call.*/
let publishDataEverySecond = interval(1000)
let control = interval(5000)
function understandingOBS() {
    publishDataEverySecond.subscribe({
        next: element => {
            console.log(`Data received: ${element}`)
            handler1(element).then((data) => { // asynchronous
                handler2(data) // setTimeout will put the call into the call stack
            })
            printLog()
            console.trace() // Checking what's in the stack call

            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`Heap memory used: ${Math.round(used * 100) / 100} MB`);
        }
    })
}

/* Buffer */
function bufferOBS() {
    /* This code defines a function called bufferOBS that creates a new observable called bufferring using
    the buffer operator. The buffer operator collects all the emissions from the source observable (publishDataEverySecond)
    into an array and emits the array each time a notification is emitted from the control observable (control).

    The buffer operator takes the control observable as a parameter. In this case, control is not defined in
    the code snippet you provided, but it should be an observable that emits a notification to trigger the buffer emission.

    After creating the bufferring observable, the code subscribes to it using the subscribe method. The subscribe 
    method takes a callback function that is invoked each time an element is emitted from the bufferring observable.

    Inside the callback function, we log the received data using console.log. We then call handler1 with the received
    data and chain a then operator to handle the result. In the then block, we call handler2 with the transformed data. */
    let bufferring = publishDataEverySecond.pipe(buffer(control)) // standard buffer 
    bufferring.subscribe((element) => {
        console.log(`Data received: ${element}`)
        handler1(element).then((data) => {
            handler2(data)
        })
    })
}

function bufferWhenOBS() {
    let buffered = publishDataEverySecond.pipe(
        /* This code creates a buffered observable that buffers emissions from publishDataEverySecond. 
        The bufferWhen operator is used to determine when to buffer data. In this case, it uses the 
        interval operator to emit a value every random time between 1000 and 5000 milliseconds. This 
        means that every 1 to 5 seconds, the buffered observable will emit an array of the buffered values. */
        bufferWhen(() => interval(1000 + Math.random() * 4000))
    );

    /* This code defines a function bufferOBS that subscribes to the buffered observable and processes the 
    buffered data by calling handler1 and handler2 on each element. When new data arrives, the next callback 
    is invoked with an array of the buffered values.
    
    Inside the next callback, we log the received data using console.log. We then call handler1 with the 
    received data and chain a then operator to handle the result. In the then block, we call handler2 
    with the transformed data.
    
    Overall, this code sets up a pipeline of RxJS operators to create a buffered observable that buffers
    emissions from the source observable for a certain amount of time. It then processes the buffered 
    data using the handler1 and handler2 functions. This is useful when you want to group emissions 
    from a source observable and process them together, for example, to reduce network traffic or to
    process data in batches. 
    
    Please not that the handler handles the array, not the individual data. A separate function will 
    need to be designed in order to process each of the individual values from the emitted array. */
    buffered.subscribe({
        next(element) {
            console.log(`Data received: ${element}`)
            handler1(element).then((data) => {
                handler2(data)
            })
        }
    })
}

/*  Scheduler */
function asyncScheduleOBS() {
    // const scheduleObservable = of(`Hello Observable passing through`)
    const scheduleObservable = interval(1000)
    const delayTime = 3000;
    /* In this example, the source$ observable emits the value "Hello Observable passing through". We pass the source$ observable\
    as a parameter to the task function, which is executed after a delay of 3 second using the asyncScheduler.
    Inside the task function, we subscribe to the source$ observable and log its emitted values to the console.
    By using an observable as the task parameter, you can create complex logic that can be executed at a specific time or interval. */
    let subscription = asyncScheduler.schedule(() => {
        scheduleObservable.subscribe((element) => {
            console.log(element)
        })
    }, delayTime);
}

asyncScheduleOBS()

function queue_Scheduler() {
    /* In this example, we use the observeOn operator to apply the queueScheduler to the observable stream.
      We then subscribe to the stream and execute three tasks (task1, task2, and task3) in order using the queueScheduler.

    The queueScheduler ensures that the tasks are executed in the order they were added to the queue, waiting for each task to 
    complete before executing the next one. This is useful for tasks that need to run in order and should not be interrupted by other tasks.

    Note that the queueScheduler is a synchronous scheduler, which means that tasks scheduled using this scheduler will be executed 
    synchronously. If you need to schedule tasks asynchronously, you can use the asyncScheduler or other schedulers that provide asynchronous execution.*/
    let task1 = () => console.log('Task 1');
    let task2 = () => console.log('Task 2');
    let task3 = () => console.log('Task 3');

    of(null)
        .pipe(
            observeOn(queueScheduler)
        )
        .subscribe(() => {
            task1();
            task2();
            task3();
        });
}

