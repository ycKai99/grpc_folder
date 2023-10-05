"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const test_streamOBS_1 = require("./test-streamOBS");
const message_auditor_service_1 = require("../services/message-auditor.service");
const export_1 = require("../dependencies/log/interface/export");
const stream = new test_streamOBS_1.StreamingService();
const publisher_sync = new message_auditor_service_1.MessageAuditorService();
const publisher_Log = new export_1.LoggingService();
const publisher_take_four_messages = stream.stream().pipe((0, rxjs_1.take)(4));
const publisher = new rxjs_1.Subject();
publisher.subscribe((e) => {
    console.log(`Primary Received ${e.header.messageID}`);
});
publisher_take_four_messages.subscribe({
    next: (data) => {
        publisher.next(data);
    }
});
const subscriber_log = new export_1.LoggingService();
const subscriber_take_two_messagse = stream.stream().pipe((0, rxjs_1.take)(2));
const subscriber = new rxjs_1.Subject();
subscriber.subscribe((e) => {
    console.log(`Secondary Received ${e.header.messageID}`);
});
subscriber_take_two_messagse.subscribe({
    next: (data) => {
        subscriber.next(data);
    }
});
let publisher_storage = {
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
};
let subscriber_storage = {
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
};
let settings = {
    incomingSource: Object.assign(Object.assign({}, publisher_storage), { tags: ['Incoming'] }),
    target: Object.assign(Object.assign({}, subscriber_storage), { tags: ['Incoming'] })
};
function initializeData() {
    publisher_Log.init(publisher_storage).then(() => {
        publisher_Log.subscribe(publisher);
    });
    subscriber_log.init(subscriber_storage).then(() => {
        subscriber_log.subscribe(subscriber);
    });
}
initializeData();
publisher_sync.init(settings);
let errorSubject = new rxjs_1.Subject();
let sync = publisher_sync.subscribe(errorSubject);
sync.subscribe({
    next: (msgToBeSynchronized) => {
        console.log(`passing missing message: ${msgToBeSynchronized.appData.msgId} into target/secondary subject.`);
        let raw = msgToBeSynchronized.appData.msgPayload;
        let data = JSON.parse(raw);
        subscriber.next(data);
    }
});
setTimeout(() => {
    let sampleError = {
        status: 1,
        message: "NO. I dont want to work"
    };
    errorSubject.next(sampleError);
}, 10000);
const dns = require('dns');
function checkInternetConnectivity() {
    dns.lookup('example.com', (err) => {
        if (err && err.code === 'ENOTFOUND') {
            let errorMsg = {
                status: 0,
                message: `No internet connection`
            };
            errorSubject.next(errorMsg);
        }
        else {
        }
    });
}
const intervalTime = 1000;
const interval = setInterval(checkInternetConnectivity, intervalTime);
const duration = 60000;
setTimeout(function () {
    clearInterval(interval);
    console.log('Internet connectivity monitoring stopped');
}, duration);
function countdown() {
    let seconds = 0;
    const countUpInterval = setInterval(() => {
        console.log(`Elapsed seconds: ${seconds}`);
        seconds++;
    }, 1000);
}
countdown();
//# sourceMappingURL=test3c.js.map