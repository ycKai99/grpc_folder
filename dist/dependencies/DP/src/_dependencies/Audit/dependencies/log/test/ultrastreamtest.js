"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const fs = require("fs");
const logging_service_1 = require("../services/logging-service");
const log = new logging_service_1.LoggingService();
const storage = {
    storage: "MongoDB",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: `mongodb+srv://testDB:h1nt1OyXw6QeUnzS@cluster0.rmtmxxf.mongodb.net/log`
    }
};
let messagesJSON = fs.readFileSync('messages.json');
let messages = JSON.parse(messagesJSON);
const msg1 = messages[0];
const msg2 = messages[1];
const msg3 = messages[2];
const msg4 = messages[3];
const msg5 = messages[4];
const msg6 = messages[5];
const msg7 = messages[6];
const msg8 = messages[7];
let sampleStreamMessages = new rxjs_1.Observable((subscriber) => {
    subscriber.next(msg1);
    setTimeout(() => {
        subscriber.next(msg2);
        setTimeout(() => {
            subscriber.next(msg3);
            setTimeout(() => {
                subscriber.next(msg4);
                setTimeout(() => {
                    subscriber.next(msg5);
                    setTimeout(() => {
                        subscriber.next(msg6);
                        setTimeout(() => {
                            subscriber.next(msg7);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);
});
try {
    log.init(storage).then(() => {
        log.subscribe(sampleStreamMessages).then(() => {
            log.filter({ msgId: "44f701a9-8ba7-4e07-bd66-f84db12ae481" }).catch(() => console.log(`Failed to resolve filter`));
        }).catch(() => console.log(`Failed to resolve stream data`));
    }).catch(() => console.log(`Failed to resolve init`));
}
catch (err) {
    console.log(err);
    throw new Error("service is broken");
}
//# sourceMappingURL=ultrastreamtest.js.map