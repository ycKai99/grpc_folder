"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const logging_service_1 = require("../services/logging-service");
const fs = require("fs");
const log = new logging_service_1.LoggingService();
// Declare storage type
const storage = {
    storage: "File",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    // customSetting: {
    //   user: "somongo",
    //   password: "so*@2212#",
    //   server: "swopt.com:27017/logs",
    //   collection: "logs"
    // }
    customSetting: {
        server: "localhost:27017",
        database: "logs"
    }
};
/* Get message data from messages.json file for testing */
let messagesJSON = fs.readFileSync('messages.json');
let messages = JSON.parse(messagesJSON);
const msg1 = messages[0];
const msg2 = messages[1];
const msg3 = messages[2];
// Complete Observables set
let sampleMessages = rxjs_1.of(msg1, msg2, msg3);
// Write you own testing here
try {
    /* -------------------------------- EXAMPLE FOR SETTING STORAGE -------------------------------- */
    /* FailCase: Showcase error handling. Will log error types based on client's input. */
    log.init(storage).then(() => {
        log.subscribe(sampleMessages).then(() => {
            log.filter({ price: 45.50 }).catch(() => console.log(`Failed to resolve filter`));
        }).catch(() => console.log(`Failed to resolve stream data`));
    }).catch(() => console.log(`Failed to resolve init`));
    /* More examples of failed search. Will console log error message and return empty array in console */
    // log.filter({ msgId: 4 })
    // log.filter({ msgDateTime: "2022-11-21" })
    // log.filter({ msgTag: "Failure" })
    // log.filter({ price: 123 })
}
catch (err) {
    console.log(err);
    throw new Error("service is broken");
}
//# sourceMappingURL=failcase.js.map