"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_streamOBS_1 = require("./test-streamOBS");
const incomingMessage_service_1 = require("../services/incomingMessage.service");
const rxjs_1 = require("rxjs");
const incoming = new incomingMessage_service_1.IncomingMessageService();
const streamService = new test_streamOBS_1.StreamingService();
/* --------------  TEST -------------------- */
// change payload into Observable<BaseMessage>
const payload = streamService.stream().pipe(rxjs_1.take(3));
// Configure Log Setting
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