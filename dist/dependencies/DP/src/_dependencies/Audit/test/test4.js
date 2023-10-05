"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const rxjs_1 = require("rxjs");
const message_auditor_service_1 = require("../services/message-auditor.service");
const export_1 = require("../dependencies/log/interface/export");
const Schema = mongoose.Schema;
const messageSchema = require('../dependencies/log/type/schemas/message.schema');
const fingerPrintSchema = new Schema({
    uuid: { type: String, required: true, lowercase: true, unique: true },
    fileName: { type: String, required: true, lowercase: true },
    fileType: { type: String, required: true, lowercase: true },
    entityName: { type: String, required: true, lowercase: true },
    fileData: { type: Object, required: true },
});
const auditor = new message_auditor_service_1.MessageAuditorService();
const primary_Log = new export_1.LoggingService();
const primary = new rxjs_1.Subject();
primary.subscribe((element) => {
    console.log(`Primary Received ${element.appData.msgId}`);
});
const secondary_log = new export_1.LoggingService();
const secondary = new rxjs_1.Subject();
secondary.subscribe((element) => {
    console.log(`Secondary Received ${element.appData.msgId}`);
    convertMessageLogToCDMS(element);
});
let primary_storage = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: 'mongodb://192.168.100.59:27017/primary'
    }
};
let secondary_storage = {
    cacheMessageLimit: 0,
    storage: "MongoDB",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: 'mongodb+srv://testDB:h1nt1OyXw6QeUnzS@cluster0.29sklte.mongodb.net/secondary'
    }
};
let settings = {
    incomingSource: Object.assign(Object.assign({}, primary_storage), { tags: ['default'] }),
    target: Object.assign(Object.assign({}, secondary_storage), { tags: ['default'] })
};
auditor.init(settings);
let errorSubject = new rxjs_1.Subject();
let sync = auditor.subscribe(errorSubject);
sync.subscribe({
    next: (msgToBeSynchronized) => {
        console.log(`passing missing message: ${msgToBeSynchronized.appData.msgId} into target/secondary subject.`);
        secondary.next(msgToBeSynchronized);
    }
});
setTimeout(() => {
    let sampleError = {
        status: 1,
        message: "NO. I dont want to work"
    };
    errorSubject.next(sampleError);
}, 3000);
countdown();
convertDataInMongo(primary_storage.customSetting.url);
convertDataInMongo(secondary_storage.customSetting.url);
const dbConnection = mongoose.createConnection("mongodb+srv://testDB:h1nt1OyXw6QeUnzS@cluster0.29sklte.mongodb.net/secondary");
const dataModel = dbConnection.model('genericdata', fingerPrintSchema);
primary_Log.init(settings.incomingSource).then(() => {
    primary_Log.subscribe(primary);
});
secondary_log.init(settings.target).then(() => {
    secondary_log.subscribe(secondary);
});
function convertDataInMongo(url) {
    let data = new rxjs_1.Subject();
    let convertService = new export_1.LoggingService();
    let dbConnection = mongoose.createConnection(url);
    let dataModel = dbConnection.model('genericdata', fingerPrintSchema);
    dataModel.find().then((res) => {
        res.forEach((element) => {
            data.next(element);
        });
    });
    data.subscribe((element) => {
        convertService.convertCDMStoMessageLog(element, settings.incomingSource.tags).then((result) => {
            console.log(`Converting fingerprint .... ${result.appData.msgId}`);
            primary.next(result);
        }).catch((err) => {
            console.error(err.message);
        });
    });
}
function convertMessageLogToCDMS(args) {
    secondary_log.convertMessageLogtoCDMS(args).then((result) => {
        dataModel.create(result);
    }).catch((err) => {
        console.error(err.message);
    });
}
const dns = require('dns');
function checkInternetConnectivity() {
    dns.lookup('example.com', (err) => {
        if (err && err.code === 'ENOTFOUND') {
            let errorMsg = {
                status: 0,
                message: `No internet connection`
            };
            errorSubject.next(errorMsg);
        }
        else {
        }
    });
}
const intervalTime = 1000;
const interval = setInterval(checkInternetConnectivity, intervalTime);
const duration = 60000;
setTimeout(function () {
    clearInterval(interval);
    console.log('Internet connectivity monitoring stopped');
}, duration);
function countdown() {
    let seconds = 0;
    const countUpInterval = setInterval(() => {
        console.log(`Elapsed seconds: ${seconds}`);
        seconds++;
    }, 1000);
}
//# sourceMappingURL=test4.js.map