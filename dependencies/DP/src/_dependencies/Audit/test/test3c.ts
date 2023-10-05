/*  -----------------------       TEST3C {Mongo to Mongo}    -----------------------   */
/* This test is focusing on comparing 2 different arrays of message logs from 2 different storage. 
Which is local file mongo as the control/source, and then comparing the data from cloud mongoDB
server data, and then synchronizing them */

import { Observable, map, Subject, takeUntil, take, of, timer, from } from "rxjs";
import { ErrorTrigger, MessageSynchronisationServiceSetting } from "../type/datatype";
import { StreamingService } from "./test-streamOBS";
import { MessageAuditorService } from "../services/message-auditor.service";
import { BaseMessage, ResponseMessage } from "../dependencies/msgutil/interface/export";
import { LoggingService } from "../dependencies/log/interface/export";
import { LogSetting, MessageLog } from "../dependencies/log/type/datatype";

/* Pre - Defined Data && Settings */
// This service will stream the messages from the local testRequest.json messages
// into the designated location that will be specified later.
const stream = new StreamingService()

/* Using the instance of the streaming declared earlier, we feed 4 messages into the
subscribers that are going to subsscribe to this source_payload. Please note that 
source_payload will emite the messages stream from the instance of stream service
and further feed them into the other Subject which is called source_payload_subject. */
const publisher_sync = new MessageAuditorService()
const publisher_Log = new LoggingService()
const publisher_take_four_messages: Observable<BaseMessage> = stream.stream().pipe(take(4))
const publisher: Subject<BaseMessage> = new Subject()
publisher.subscribe((e) => {
    console.log(`Primary Received ${e.header.messageID}`)
})
publisher_take_four_messages.subscribe({
    next: (data) => {
        publisher.next(data)
    }
})

/* Same thing as the above. The only difference is the we feed only 2 messages 
to simulate streaming error. We want to see if it will sync the other 2 later 
on. But generall the declarative structure is the same as the above. */
const subscriber_log = new LoggingService()
const subscriber_take_two_messagse: Observable<BaseMessage> = stream.stream().pipe(take(2))
const subscriber: Subject<BaseMessage> = new Subject()
subscriber.subscribe((e) => {
    console.log(`Secondary Received ${e.header.messageID}`)
})
subscriber_take_two_messagse.subscribe({
    next: (data) => {
        subscriber.next(<ResponseMessage>data)
    }
})


/* Declare the designated database. I am using windev's mongo storage to store the data.
Hence here, is the block that definte the target and it's associated specifications.
This will be the target and will receive the predefined set of data to be logged as 
prepared earlier in the code above.s */
let publisher_storage: LogSetting = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        srv: true,
        user: "testDB",
        password: "h1nt1OyXw6QeUnzS",
        server: "cluster0.29sklte.mongodb.net",
        database: "test2",
    }
}

/* Same as above. Also declaring another designated database. But this one will be used
as the target for synching. For such I purposely push only half the of the completed 
dataset in order to test out the sync later. I am using my own cloud atlas mongo
database on this. The address can always be changed. */
let subscriber_storage: LogSetting = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        srv: true,
        user: "testDB",
        password: "h1nt1OyXw6QeUnzS",
        server: "cluster0.29sklte.mongodb.net",
        database: "test",
    }
}

// Combine source and target storage to form MessageSynchronisationServiceSetting
let settings: MessageSynchronisationServiceSetting = {
    incomingSource: {
        //all of the settings to be combined here
        ...publisher_storage,
        tags: ['Incoming']
    }, //LogSetting & {tags:string[] },   
    target: {
        ...subscriber_storage,
        tags: ['Incoming']
    }  //LogSetting & {tags:string[] }  
}

/* -------- SYNCHRONIZATION --------- */
// This is where the real test begin. THe process before this were merely just configuring 
// the settings of where to sync. Here the initial intialize data will first log the 
// messages into the designated database as specified earlier.
function initializeData() { // To store the data into the designated databases.
    publisher_Log.init(publisher_storage).then(() => {
        publisher_Log.subscribe(publisher) // Logging only occurs here
    })
    subscriber_log.init(subscriber_storage).then(() => {
        subscriber_log.subscribe(subscriber) // Logging only occurs here
    })
}

// Done by appoximately 5-8 Seconds
initializeData() // Call the function to store the data into the designated databases.
publisher_sync.init(settings)

/* This is where the synchronization logic is called. The errorSubject will act as a trigger
mechanism to execute the synchronization. */
let errorSubject: Subject<ErrorTrigger> = new Subject()
// Subscribe to errorSubject notification 
let sync = publisher_sync.subscribe(errorSubject)
sync.subscribe({
    next: (msgToBeSynchronized: MessageLog) => {
        console.log(`passing missing message: ${msgToBeSynchronized.appData.msgId} into target/secondary subject.`)
        // the missing data returned will be pushed (next(message)) into the target payload.
        let raw = msgToBeSynchronized.appData.msgPayload
        let data : BaseMessage = JSON.parse(<string>raw)
        subscriber.next(data)
    }
})



// Set time oout for 5 seconds to allow the initial logging stage to complete it's logging
// implementation first before proceedint to trigger the sync
setTimeout(() => {
    // This wil act as the trigger error.Although the definition of this error is 
    // still subject for enhancements in the near future.
    let sampleError: ErrorTrigger = {
        status: 1,
        message: "NO. I dont want to work"
    }
    errorSubject.next(sampleError)
}, 10000)

/* THis is testing for generating error message to be fed into the error subject
to act as additional trigger to exectute the synchronization when there's no internet
connection. */
const dns = require('dns');

// Function to check internet connectivity. Basically just look up the site of example.com
// using the built in libray of DNS.
function checkInternetConnectivity() {
    dns.lookup('example.com', (err) => {
        if (err && err.code === 'ENOTFOUND') {
            let errorMsg: ErrorTrigger = {
                status: 0,
                message: `No internet connection`
            }
            errorSubject.next(errorMsg)
        } else {
            // Emit a message indicating internet connectivity
            // console.log('Internet connection is available');
        }
    });
}

// Interval time (in milliseconds) for checking connectivity
const intervalTime = 1000; // Check every 1 second

// Start checking connectivity at intervals
const interval = setInterval(checkInternetConnectivity, intervalTime);

// Stop checking connectivity after a certain duration (e.g., 1 minute)
const duration = 60000; // 1 minute
setTimeout(function () {
    clearInterval(interval);
    console.log('Internet connectivity monitoring stopped');
}, duration);

function countdown() {
    let seconds = 0;
    const countUpInterval = setInterval(() => {
      console.log(`Elapsed seconds: ${seconds}`);
      seconds++;
    }, 1000); // Update every second (1000 milliseconds)
  }

countdown()
