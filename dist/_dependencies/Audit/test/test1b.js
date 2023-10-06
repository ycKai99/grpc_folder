"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acknowledgement_service_1 = require("../services/acknowledgement.service");
const test_streamOBS_1 = require("./test-streamOBS");
const acknowledge = new acknowledgement_service_1.AcknowledgementService();
const streamService = new test_streamOBS_1.StreamingService();
/* --------------  TEST -------------------- */
// change payload into Observable<BaseMessage>
const payload = streamService.stream();
// Configure Log Setting
let storage = {
    storage: "File",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    }
};
let dataSet = {
    storage: storage.storage,
    setting: storage.setting,
    customSetting: storage.customSetting,
    incomingObservable: payload
};
// incoming.init(dataSet)
acknowledge.init(storage).then(() => {
    acknowledge.subscribe(dataSet.incomingObservable);
});
//# sourceMappingURL=test1b.js.map