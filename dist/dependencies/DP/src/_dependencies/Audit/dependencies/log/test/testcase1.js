"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const logging_service_1 = require("../services/logging-service");
const test_streamOBS_1 = require("./test-streamOBS");
const dependencies_1 = require("../dependencies/msgutil/dependencies/dependencies");
const log = new logging_service_1.LoggingService();
const streamService = new test_streamOBS_1.StreamingService();
const storage = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        server: "192.168.100.59:27017",
        database: 'fromEnzo'
    }
};
let sampleStreamMessages = streamService.stream().pipe((0, operators_1.map)((message) => {
    let finalResponse = {
        appLogLocId: new dependencies_1.Uuid().generateId(),
        appData: {
            msgId: message.header.messageID || new dependencies_1.Uuid().generateId(),
            msgLogDateTime: new Date(),
            msgDateTime: new Date(),
            msgTag: ['Incoming', 'Outgoing'],
            msgPayload: JSON.stringify(message)
        }
    };
    return finalResponse;
}));
let filter = {
    from: {
        date: "2023-03-01",
        hour: '00',
        minute: '00',
        second: '00'
    },
    to: {
        date: "2023-04-13",
        hour: '23',
        minute: '59',
        second: '59'
    }
};
function searchData(args) {
    log.init(args).then(() => {
        log.filter({ msgTag: "gg" });
    });
}
searchData(storage);
//# sourceMappingURL=testcase1.js.map