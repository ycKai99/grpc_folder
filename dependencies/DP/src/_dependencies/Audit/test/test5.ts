/* ---------------------    TEST 5 : Filtering     -------------------------- */
/* This test is specifically design for testing the audit with additional fitlers. When the primary source want to perform
audit on the designated target, they will impose one or many condition, in that only the data that meets the criteria
will be taken into consideratoin for auditng. */
import { Observable, Subject, take } from "rxjs"
import { MessageAuditorService } from "../services/message-auditor.service"
import { MessageAuditorServiceInterface, MessageSynchronisationServiceSetting } from "../type/datatype"
import { LogSetting, MessageLog } from "../dependencies/log/type/datatype"
import { _ } from 'lodash'
import { StreamingService } from "./test-streamOBS"
import { LoggingService } from "../dependencies/log/services/logging-service"
import { ResponseMessage } from "../dependencies/msgutil/interface/export"
const auditService: MessageAuditorServiceInterface = new MessageAuditorService()
const publisherloggingService: LoggingService = new LoggingService()
const subscriberloggingService: LoggingService = new LoggingService()
const stream = new StreamingService()

let triggerSyncSubject: Subject<any> = new Subject()
const publisher_take_four_messages: Observable<any> = stream.stream().pipe(take(4))
const publisher: Subject<any> = new Subject()
publisher_take_four_messages.subscribe({
    next: (data) => {
        publisher.next(data)
    }
})
const subscriber_take_two_messagse: Observable<any> = stream.stream().pipe(take(2))
const subscriber: Subject<any> = new Subject()
subscriber_take_two_messagse.subscribe({
    next: (data) => {
        subscriber.next(<ResponseMessage>data)
    }
})

let source: LogSetting = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Deafult from source',
        appLocName: 'To be generated in source',
        logLocName: 'To be generated in source',
    },
    customSetting: {
        url: 'mongodb+srv://testDB:h1nt1OyXw6QeUnzS@cluster0.29sklte.mongodb.net/test'
    }
}
let target: LogSetting = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Default from target',
        appLocName: 'To be generated in target',
        logLocName: 'To be generated in target',
    },
    customSetting: {
        url: 'mongodb+srv://testDB:h1nt1OyXw6QeUnzS@cluster0.29sklte.mongodb.net/test2'
    }
}

// Combine source and target storage to form MessageSynchronisationServiceSetting. This is required in messageAudit initialization
let settings: MessageSynchronisationServiceSetting = {
    incomingSource: {
        //all of the settings to be combined here
        ...source,
        tags: ['default'],
    },
    target: {
        ...target,
        tags: ['default'],
    },
}

/* -------  Calling the functions to be tested ----------- */
intializeLogging(source, target)
initializeAuditService(settings)
setTimeout(() => {
    performSync({ status: 1, message: "GO! GO! GO!" })
}, 5000)


// Basically start up all the functions and relevant subscription service in Audit Service.
async function initializeAuditService(configuration: MessageSynchronisationServiceSetting) {
    let filter: any = {
        'data.data.appData.msgTag[0]': 'likable',
        'header.messageProducerInformation.origin.userApplication.userAppName': 'Client'
    }
    auditService.init(configuration, filter) // Configure two points of audit and also adding filter
    // auditService.setFilter({ 'data.data.appData.msgTag[0]': 'oval' }) // set fitler if there's any. Please not that 
    auditService.subscribe(triggerSyncSubject).subscribe((missingElements: MessageLog) => {
        let message = JSON.parse(missingElements.appData.msgPayload as any)
        subscriber.next(message)
    })
}

// Emit an args into the synchronization trigger stream to perform a sync
async function performSync(args: any) {
    triggerSyncSubject.next(args)
}

// Set up logging point
async function intializeLogging(source: LogSetting, target: LogSetting) {
    publisherloggingService.init(source).then(() => {
        publisherloggingService.subscribe(publisher)
    })
    subscriberloggingService.init(target).then(() => {
        subscriberloggingService.subscribe(subscriber)
    })
}

