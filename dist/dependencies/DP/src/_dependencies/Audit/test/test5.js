"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const message_auditor_service_1 = require("../services/message-auditor.service");
const test_streamOBS_1 = require("./test-streamOBS");
const logging_service_1 = require("../dependencies/log/services/logging-service");
const auditService = new message_auditor_service_1.MessageAuditorService();
const publisherloggingService = new logging_service_1.LoggingService();
const subscriberloggingService = new logging_service_1.LoggingService();
const stream = new test_streamOBS_1.StreamingService();
let triggerSyncSubject = new rxjs_1.Subject();
const publisher_take_four_messages = stream.stream().pipe((0, rxjs_1.take)(4));
const publisher = new rxjs_1.Subject();
publisher_take_four_messages.subscribe({
    next: (data) => {
        publisher.next(data);
    }
});
const subscriber_take_two_messagse = stream.stream().pipe((0, rxjs_1.take)(2));
const subscriber = new rxjs_1.Subject();
subscriber_take_two_messagse.subscribe({
    next: (data) => {
        subscriber.next(data);
    }
});
let source = {
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
};
let target = {
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
};
let settings = {
    incomingSource: Object.assign(Object.assign({}, source), { tags: ['default'] }),
    target: Object.assign(Object.assign({}, target), { tags: ['default'] }),
};
intializeLogging(source, target);
initializeAuditService(settings);
setTimeout(() => {
    performSync({ status: 1, message: "GO! GO! GO!" });
}, 5000);
async function initializeAuditService(configuration) {
    let filter = {
        'data.data.appData.msgTag[0]': 'likable',
        'header.messageProducerInformation.origin.userApplication.userAppName': 'Client'
    };
    auditService.init(configuration, filter);
    auditService.subscribe(triggerSyncSubject).subscribe((missingElements) => {
        let message = JSON.parse(missingElements.appData.msgPayload);
        subscriber.next(message);
    });
}
async function performSync(args) {
    triggerSyncSubject.next(args);
}
async function intializeLogging(source, target) {
    publisherloggingService.init(source).then(() => {
        publisherloggingService.subscribe(publisher);
    });
    subscriberloggingService.init(target).then(() => {
        subscriberloggingService.subscribe(subscriber);
    });
}
//# sourceMappingURL=test5.js.map