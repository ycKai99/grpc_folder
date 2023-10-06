"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const export_1 = require("../dependencies/msgutil/interface/export");
const logging_service_1 = require("../services/logging-service");
const fs = require("fs");
try {
    const log = new logging_service_1.LoggingService();
    // Declare storage type
    const storage = {
        storage: "MongoDB",
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
            srv: true,
            user: "testDB",
            password: "h1nt1OyXw6QeUnzS",
            server: "cluster0.29sklte.mongodb.net",
            database: "log",
            // url: `mongodb+srv://testDB:h1nt1OyXw6QeUnzS@cluster0.rmtmxxf.mongodb.net/log`
        }
    };
    /* Read AppProfile data sets from json file */
    let profileJSON = fs.readFileSync('profiles.json');
    let profiles = JSON.parse(profileJSON);
    /* Randomize AppProfile data sets so it returns different sets of values */
    function randomizeSetData(payload) {
        var keys = Object.keys(payload);
        let result = payload[keys[keys.length * Math.random() << 0]];
        return result;
    }
    ;
    /* Generate Id for App Profile and others */
    function generateId() {
        let messageId = new export_1.Uuid();
        return messageId.generateId().toString();
    }
    /* Get message data from messages.json file for testing */
    let messagesJSON = fs.readFileSync('messages.json');
    let messages = JSON.parse(messagesJSON);
    const msg1 = messages[0];
    const msg2 = messages[1];
    const msg3 = messages[2];
    // Streaming Observables set
    let sampleStreamMessages = new rxjs_1.Observable((subscriber) => {
        subscriber.next(msg1);
        setTimeout(() => {
            subscriber.next(msg2);
            setTimeout(() => {
                subscriber.next(msg3);
            }, 500); // 0.5s
        }, 500); // 0.5s
    });
    // Write you own testing here
    try {
        /* -------------------------------- EXAMPLE FOR SETTING STORAGE -------------------------------- */
        /* Test. Primary Test */
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
    /* -------------------------------- EXAMPLE FOR LOGGING MESSAGES -------------------------------- */
    /* Append Observable Messages into storage file. If successful, it will return appLocLogId/undefined if subscription is ongoing
    Whilst appProfile and the rest will be appended to its correspnding file storage determined in storage settings */
    // Stream type returns undefined if write is successful
    // log.subscribe(sampleStreamMessages)
    // Completed subscription returns appLocLogId if write is successful
    // Alternate version
    // log.subscribe(sampleStreamMessages, data.appLocation, data.logLocation, data.appLogLoc, data.appProfile)
    /* -------------------------------- EXAMPLE FOR SEARCH FILTERS ----------------- --------------- */
    /* Note: Please run subsribe first, as the log will empty and there wont be anything to search from */
    /* Examples of successful search. Will return an array of results in console*/
    // log.filter({ msgId: 1 })
    // log.filter({ msgDateTime: "1970-01-01" })
    // log.filter({ msgTag: "Finance" })
    /* Examples of failed search. Will console log error message and return empty array in console */
    // log.filter({ msgId: 4 })
    // log.filter({ msgDateTime: "2022-11-21" })
    // log.filter({ msgTag: "Failure" })
    // log.filter({ price: 123 })
    // let url = "mongodb://somewhere"
}
catch (e) {
    console.error(e.message);
}
//# sourceMappingURL=test.js.map