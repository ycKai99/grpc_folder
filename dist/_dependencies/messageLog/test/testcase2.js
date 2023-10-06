"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const logging_service_1 = require("../services/logging-service");
const test_streamOBS_1 = require("./test-streamOBS");
const dependencies_1 = require("../dependencies/msgutil/dependencies/dependencies");
const log = new logging_service_1.LoggingService();
const streamService = new test_streamOBS_1.StreamingService().stream();
let sampleStreamMessages = streamService.pipe(operators_1.map(message => {
    let finalResponse = {
        appLogLocId: new dependencies_1.Uuid().generateId(),
        appData: {
            msgId: message.header.messageID || new dependencies_1.Uuid().generateId(),
            msgLogDateTime: new Date(),
            msgDateTime: new Date(),
            msgTag: ['Incoming'],
            msgPayload: JSON.stringify(message)
        }
    };
    return finalResponse;
}));
// Declare storage type
const storage = {
    cacheMessageLimit: 10,
    storage: "File",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    }
};
/* -------------------------------- EXAMPLE FOR SETTING STORAGE -------------------------------- */
/* Test Case 2: Testing for file storage == "File" with streaming datas. */
try {
    log.init(storage).then((data) => {
        log.subscribe(sampleStreamMessages).then((result) => {
            log.filter({ msgId: "6c162cd3-d42d-4ab4-8882-0001"
            }).catch(() => console.log(`Failed to resolve filter`));
        }).catch(() => console.log(`Failed to resolve stream data`));
    }).catch(() => console.log(`Failed to resolve init`));
}
catch (err) {
    console.log(err);
    throw new Error("service is broken");
}
//# sourceMappingURL=testcase2.js.map