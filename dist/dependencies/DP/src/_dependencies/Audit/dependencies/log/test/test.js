"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const export_1 = require("../dependencies/msgutil/interface/export");
const logging_service_1 = require("../services/logging-service");
const fs = require("fs");
try {
    const log = new logging_service_1.LoggingService();
    const storage = {
        storage: "MongoDB",
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
    let profileJSON = fs.readFileSync('profiles.json');
    let profiles = JSON.parse(profileJSON);
    function randomizeSetData(payload) {
        var keys = Object.keys(payload);
        let result = payload[keys[keys.length * Math.random() << 0]];
        return result;
    }
    ;
    function generateId() {
        let messageId = new export_1.Uuid();
        return messageId.generateId().toString();
    }
    let messagesJSON = fs.readFileSync('messages.json');
    let messages = JSON.parse(messagesJSON);
    const msg1 = messages[0];
    const msg2 = messages[1];
    const msg3 = messages[2];
    let sampleStreamMessages = new rxjs_1.Observable((subscriber) => {
        subscriber.next(msg1);
        setTimeout(() => {
            subscriber.next(msg2);
            setTimeout(() => {
                subscriber.next(msg3);
            }, 500);
        }, 500);
    });
    try {
        log.init(storage).then(() => {
            log.subscribe(sampleStreamMessages).then(() => {
                log.filter({ msgTag: "Swopt" }).catch(() => console.log(`Failed to resolve filter`));
            }).catch(() => console.log(`Failed to resolve stream data`));
        }).catch(() => console.log(`Failed to resolve init`));
    }
    catch (err) {
        console.log(err);
        throw new Error("service is broken");
    }
}
catch (e) {
    console.error(e.message);
}
//# sourceMappingURL=test.js.map