"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acknowledgement_service_1 = require("../services/acknowledgement.service");
const test_streamOBS_1 = require("./test-streamOBS");
const rxjs_1 = require("rxjs");
const acknowledge = new acknowledgement_service_1.AcknowledgementService();
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
acknowledge.init(storage).then(() => {
    acknowledge.subscribe(dataSet.incomingObservable);
});
//# sourceMappingURL=test2b.js.map