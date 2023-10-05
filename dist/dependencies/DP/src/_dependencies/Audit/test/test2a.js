"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acknowledgement_service_1 = require("../services/acknowledgement.service");
const test_streamOBS_1 = require("./test-streamOBS");
const message_auditor_service_1 = require("../services/message-auditor.service");
const incomingMessage_service_1 = require("../services/incomingMessage.service");
const rxjs_1 = require("rxjs");
const incoming = new incomingMessage_service_1.IncomingMessageService();
const syncrhonize = new message_auditor_service_1.MessageAuditorService();
const acknowledge = new acknowledgement_service_1.AcknowledgementService();
const streamService = new test_streamOBS_1.StreamingService();
const payload = streamService.stream().pipe((0, rxjs_1.take)(3));
let storage = {
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
};
let dataSet = {
    storage: storage.storage,
    setting: storage.setting,
    customSetting: storage.customSetting,
    incomingObservable: payload
};
incoming.init(dataSet);
//# sourceMappingURL=test2a.js.map