"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const logging_service_1 = require("../services/logging-service");
const fs = require("fs");
const log = new logging_service_1.LoggingService();
const storage = {
    storage: "File",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        server: "localhost:27017",
        database: "logs"
    }
};
let messagesJSON = fs.readFileSync('messages.json');
let messages = JSON.parse(messagesJSON);
const msg1 = messages[0];
const msg2 = messages[1];
const msg3 = messages[2];
let sampleMessages = (0, rxjs_1.of)(msg1, msg2, msg3);
try {
    log.init(storage).then(() => {
        log.subscribe(sampleMessages).then(() => {
            log.filter({ price: 45.50 }).catch(() => console.log(`Failed to resolve filter`));
        }).catch(() => console.log(`Failed to resolve stream data`));
    }).catch(() => console.log(`Failed to resolve init`));
}
catch (err) {
    console.log(err);
    throw new Error("service is broken");
}
//# sourceMappingURL=failcase.js.map