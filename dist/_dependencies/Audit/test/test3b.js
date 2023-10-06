"use strict";
/*  -----------------------       TEST3B {Mongo to File}     -----------------------   */
/* This test is focusing on comparing 2 different arrays of message logs from 2 different storage.
Which is cloud mongo storage as the control/source, and then comparing the data from local file
server data, and then synchronizing them */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const incomingMessage_service_1 = require("../services/incomingMessage.service");
const message_auditor_service_1 = require("../services/message-auditor.service");
const test_streamOBS_1 = require("./test-streamOBS");
/* Pre - Defined Data && Settings */
const stream = new test_streamOBS_1.StreamingService();
// Declare source Services && Observables (Using File Storage) Simulating Full Logs
const source_synchronize = new message_auditor_service_1.MessageAuditorService();
const source_payload = stream.stream().pipe(rxjs_1.take(2));
const source_incoming = new incomingMessage_service_1.IncomingMessageService();
const source_payload_subject = new rxjs_1.Subject();
source_payload.subscribe({
    next: (data) => {
        source_payload_subject.next(data);
        // console.log(data)
    }
});
// Declare target Services && Observables (Using MongoDB Storage) Simulating Partial Logs
const target_payload = stream.stream().pipe(rxjs_1.take(4));
const target_payload_subject = new rxjs_1.Subject();
const target_incoming = new incomingMessage_service_1.IncomingMessageService();
target_payload.subscribe({
    next: (data) => {
        target_payload_subject.next(data);
    },
    error: e => console.error(e),
    complete: () => { `Target Payload Completed`; }
});
// testing to see if data is sent in
target_payload_subject.subscribe({
    next: element => {
        console.log(`target_payload_subject emits :00 ${element.header.messageID}`);
    }
});
source_payload_subject.subscribe({
    next: element => {
        console.log(`source_payload_subject emits :00 ${element.header.messageID}`);
    }
});
// Declare Source Storage
let source_storage = {
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
        database: "log",
    }
};
let source_dataSet = {
    storage: source_storage.storage,
    setting: source_storage.setting,
    customSetting: source_storage.customSetting,
    incomingObservable: source_payload_subject
};
//Declare Target Storage
let target_storage = {
    storage: "File",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    }
};
let target_dataSet = {
    storage: target_storage.storage,
    setting: target_storage.setting,
    customSetting: target_storage.customSetting,
    incomingObservable: target_payload_subject
};
// Combine source and target storage to form MessageSynchronisationServiceSetting
let settings = {
    incomingSource: Object.assign(Object.assign({}, target_storage), { tags: ['Incoming'] }),
    target: Object.assign(Object.assign({}, source_storage), { tags: ['Incoming'] }) //LogSetting & {tags:string[] }  
};
/* -------- SYNCHRONIZATION --------- */
function initializeData() {
    source_incoming.init(source_dataSet);
    target_incoming.init(target_dataSet);
}
// Done by appoximately 5-8 Seconds
initializeData();
source_synchronize.init(settings);
// by 10th second 
setTimeout(() => {
    let sampleError = {
        status: 1,
        message: "NO. I dont want to work"
    };
    let triggerSync = rxjs_1.from([sampleError]);
    let sync = source_synchronize.subscribe(triggerSync);
    sync.subscribe({
        next: (msgToBeSynchronized) => {
            let raw = msgToBeSynchronized.appData.msgPayload;
            let data = JSON.parse(raw);
            // console.log(`synching ... ${msgToBeSynchronized.header.messageID}`)
            source_payload_subject.next(data);
        }
    });
}, 7000); //30s
//# sourceMappingURL=test3b.js.map