/*  -----------------------       TEST4 {Mongo to Mongo}    -----------------------   */
/* Same with test 3 but this one it will be working with CDMS or any other potential data.
Highly advisable to refer to test3c for the overall explanation of the logic flow in these
test cases. Test4 is an adjusted version of test3 to cater for the need to deal with 
different types of data aside from messageLogs. */
/* Note: MessageAudit will not work if storage is FIle. Search does not work at logging service
does not cater for File system storage */
import * as mongoose from 'mongoose'
import { Observable, map, Subject, takeUntil, take, of, timer, from } from "rxjs";
import { ErrorTrigger, MessageSynchronisationServiceSetting } from "../type/datatype";
import { StreamingService } from "./test-streamOBS";
import { MessageAuditorService } from "../services/message-auditor.service";
import { LoggingService } from '../dependencies/log/interface/export';
import { BaseMessage } from '../dependencies/msgutil/interface/export';
import { LogSetting, MessageLog } from '../dependencies/log/type/datatype';
import * as fs from "fs"

/* Convert all the non message data in the database into messageLog type. This is to ensure it's compatibility 
to be used by the interface from logging and audit message features. */
const Schema = mongoose.Schema;
// Use existing schema. 
const messageSchema = require('../dependencies/log/type/schemas/message.schema')
// Create the fingerprint schema. This is the type of the data to be transformed into messageLog type
const fingerPrintSchema = new Schema({
    uuid: { type: String, required: true, lowercase: true, unique: true },
    fileName: { type: String, required: true, lowercase: true },
    fileType: { type: String, required: true, lowercase: true },
    entityName: { type: String, required: true, lowercase: true },
    fileData: { type: Object, required: true },
});

/* For basic explanation, pleas refer to test3c. Here we are just instantiating audit and logging service for both
the primary and the secondary soures. And then the instantiation of the corresponding subjects. 
The idea is that the subject will receive the missing info provided by the auditor and then log the 
missing data in the designated database location.
 */
const auditor = new MessageAuditorService()
const primary_Log = new LoggingService()
const primary: Subject<MessageLog> = new Subject()
primary.subscribe((element) => {
    console.log(`Primary Received ${element.appData.msgId}`)
})
const secondary_log = new LoggingService()
const secondary: Subject<MessageLog> = new Subject()
secondary.subscribe((element: MessageLog) => {
    console.log(`Secondary Received ${element.appData.msgId}`)
    convertMessageLogToCDMS(element)
})
/* For basic explanation, please refer to test3c. Declaration of the source and target location. */
let primary_storage: LogSetting = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: 'mongodb://192.168.100.59:27017/primary'
        // server: "192.168.100.59:27017",
        // database: "primary"
    }
}
let secondary_storage: LogSetting = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: 'mongodb+srv://testDB:h1nt1OyXw6QeUnzS@cluster0.29sklte.mongodb.net/secondary'
        // srv: true,
        // user: "testDB",
        // password: "h1nt1OyXw6QeUnzS",
        // server: "cluster0.29sklte.mongodb.net",
        // database: "secondary",
    }
}

// Combine source and target storage to form MessageSynchronisationServiceSetting. This is required in messageAudit initialization
let settings: MessageSynchronisationServiceSetting = {
    incomingSource: {
        //all of the settings to be combined here
        ...primary_storage,
        tags: ['default']
    }, //LogSetting & {tags:string[] },   
    target: {
        ...secondary_storage,
        tags: ['default']
    }  //LogSetting & {tags:string[] }  
}





/* -------- SYNCHRONIZATION --------- */
// Primary will call the syncrhonization service
auditor.init(settings)

/* This is where the synchronization logic is called. The errorSubject will act as a trigger
mechanism to execute the synchronization. */
let errorSubject: Subject<ErrorTrigger> = new Subject()
// Subscribe to errorSubject notification 
let sync = auditor.subscribe(errorSubject)
sync.subscribe({
    next: (msgToBeSynchronized: MessageLog) => {
        console.log(`passing missing message: ${msgToBeSynchronized.appData.msgId} into target/secondary subject.`)
        // the missing data returned will be pushed (next(message)) into the target payload.
        secondary.next(msgToBeSynchronized)
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
}, 3000)

countdown()

// Convert all the existing cdms into message log
convertDataInMongo(primary_storage.customSetting.url)
convertDataInMongo(secondary_storage.customSetting.url)

// These declaration are for the secondary to log the converted missing data back in it's own collection at their corresponding servers
const dbConnection = mongoose.createConnection("mongodb+srv://testDB:h1nt1OyXw6QeUnzS@cluster0.29sklte.mongodb.net/secondary")
const dataModel = dbConnection.model('genericdata', fingerPrintSchema)

// Manually log the missing data given by audit
primary_Log.init(settings.incomingSource).then(() => {
    primary_Log.subscribe(primary)
})
secondary_log.init(settings.target).then(() => {
    secondary_log.subscribe(secondary)
})


// This function is used for convert existing generic data in the designated database to be prepared for
// AuditMessage service. 
function convertDataInMongo(url: string) {
    // Create a subject to stream data received from query at mongo, instantiate convert service and also the database location to read the datas
    let data: Subject<any> = new Subject()
    let convertService = new LoggingService()
    let dbConnection = mongoose.createConnection(url)
    let dataModel = dbConnection.model('genericdata', fingerPrintSchema)

    // Once the data is queried, it will be streamed into the data Subject declared earlier
    dataModel.find().then((res) => {
        // console.log(res)
        res.forEach((element) => {
            data.next(element)
        })
    })

    // Assign a `handler` so to speak to handle the element receivd in the data Subject
    // This is where the transformation happens. The logic is written on the logging service side.
    // Once that is done, the transformed data will be saved again bacn in the mongo database in a different databse/collection
    data.subscribe((element) => {
        convertService.convertCDMStoMessageLog(element, settings.incomingSource.tags).then((result: MessageLog) => {
            console.log(`Converting fingerprint .... ${result.appData.msgId}`)
            primary.next(result)
        }).catch((err) => {
            console.error(err.message)
        });
    })
}

// TO be used by the secondary Subject to convert the message log it receives to complete the synchronization process.
function convertMessageLogToCDMS(args: MessageLog) {
    secondary_log.convertMessageLogtoCDMS(args).then((result) => {
        dataModel.create(result)
    }).catch((err) => {
        console.error(err.message)
    });
}


/* THis is testing for generating error message to be fed into the error subject
to act as additional trigger to exectute the synchronization when there's no internet
connection. */ // THis part is not mandatory and can be commented out---
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

