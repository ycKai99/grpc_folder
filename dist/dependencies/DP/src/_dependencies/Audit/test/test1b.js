"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acknowledgement_service_1 = require("../services/acknowledgement.service");
const test_streamOBS_1 = require("./test-streamOBS");
const message_auditor_service_1 = require("../services/message-auditor.service");
const incomingMessage_service_1 = require("../services/incomingMessage.service");
const incoming = new incomingMessage_service_1.IncomingMessageService();
const acknowledge = new acknowledgement_service_1.AcknowledgementService();
const syncrhonize = new message_auditor_service_1.MessageAuditorService();
const streamService = new test_streamOBS_1.StreamingService();
const payload = streamService.stream();
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
acknowledge.init(storage).then(() => {
    acknowledge.subscribe(dataSet.incomingObservable);
});
//# sourceMappingURL=test1b.js.map