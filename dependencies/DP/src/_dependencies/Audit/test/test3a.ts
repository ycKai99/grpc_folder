/*  -----------------------       TEST3A {File to Mongo}    -----------------------   */
/* This test is focusing on comparing 2 different arrays of message logs from 2 different storage. 
Which is local file storage as the control/source, and then comparing the data from cloud mongoDB
server data, and then synchronizing them */

import { Observable, map, Subject, takeUntil, take, of, timer, from } from "rxjs";
import { IncomingMessageService } from "../services/incomingMessage.service";
import { MessageAuditorService } from "../services/message-auditor.service";
import { ErrorTrigger, MessageSynchronisationServiceSetting } from "../type/datatype";
import { StreamingService } from "./test-streamOBS";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
import { LogSetting } from "../dependencies/log/type/datatype";

/* Pre - Defined Data && Settings */
const stream = new StreamingService()

// Declare source Services && Observables (Using File Storage) Simulating Full Logs
const source_synchronize = new MessageAuditorService()
const source_payload: Observable<BaseMessage> = stream.stream().pipe(take(4))
const source_incoming = new IncomingMessageService()
const source_payload_subject: Subject<BaseMessage> = new Subject()
source_payload.subscribe({
    next: (data) => {
        source_payload_subject.next(data)
        // console.log(data)
    }
})
// Declare target Services && Observables (Using MongoDB Storage) Simulating Partial Logs
const target_payload: Observable<BaseMessage> = stream.stream().pipe(take(2))
const target_payload_subject: Subject<BaseMessage> = new Subject()
const target_incoming = new IncomingMessageService()
target_payload.subscribe({
    next: (data) => {
        target_payload_subject.next(<BaseMessage>data)
    },
    error: e => console.error(e),
    complete: () => { `Target Payload Completed` }
})

// testing to see if data is sent in
target_payload_subject.subscribe({
    next: element => {
        console.log(`target_payload_subject emits :00 ${element.header.messageID}`)
    }
})

// Declare Source Storage
let source_storage: LogSetting = {
    storage: "File",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    }
}

let source_dataSet: LogSetting & { incomingObservable: Observable<BaseMessage> } = {
    storage: source_storage.storage,
    setting: source_storage.setting,
    customSetting: source_storage.customSetting,
    incomingObservable: source_payload_subject
}

//Declare Target Storage
let target_storage: LogSetting = {
    storage: "MongoDB",
    cacheMessageLimit: 0,
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
        database: "log",
    }
}

let target_dataSet: LogSetting & { incomingObservable: Observable<BaseMessage> } = {
    storage: target_storage.storage,
    setting: target_storage.setting,
    customSetting: target_storage.customSetting,
    incomingObservable: target_payload_subject
}

// Combine source and target storage to form MessageSynchronisationServiceSetting
let settings: MessageSynchronisationServiceSetting = {
    incomingSource: {
        //all of the settings to be combined here
        ...source_storage,
        tags: ['Incoming']
    }, //LogSetting & {tags:string[] },   
    target: {
        ...target_storage,
        tags: ['Incoming']
    }  //LogSetting & {tags:string[] }  
}

/* -------- SYNCHRONIZATION --------- */
function initializeData() {
    source_incoming.init(source_dataSet)
    target_incoming.init(target_dataSet)
}

// Done by appoximately 5-8 Seconds
initializeData()
source_synchronize.init(settings)

// by 10th second 
setTimeout(() => {

    let sampleError: ErrorTrigger = {
        status: 1,
        message: "NO. I dont want to work"
    }

    let triggerSync = from([sampleError])

    let sync = source_synchronize.subscribe(triggerSync)
    sync.subscribe({
        next: (msgToBeSynchronized) => {
            let raw = msgToBeSynchronized.appData.msgPayload
            let data: BaseMessage = JSON.parse(<string>raw)
            // console.log(`synching ... ${msgToBeSynchronized.header.messageID}`)
            target_payload_subject.next(data)
        }
    })

}, 7000)//30s
