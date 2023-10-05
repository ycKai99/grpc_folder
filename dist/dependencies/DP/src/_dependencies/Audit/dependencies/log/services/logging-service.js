"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStates = exports.LoggingService = void 0;
const rxjs_1 = require("rxjs");
const fs = require("fs");
const mongoose_1 = require("mongoose");
const export_1 = require("../dependencies/msgutil/interface/export");
class LoggingService {
    constructor() {
        this.connectionStatus = 0;
        this.arrLog = [];
        this.appProfile = {
            appId: '',
            appName: ''
        };
        this.appLocation = {
            appId: this.appProfile.appId,
            appLocId: '',
            appLocName: ''
        };
        this.logLocation = {
            logLocId: '',
            logLocName: ''
        };
        this.appLogLoc = {
            appLogLocId: '',
            appLocId: this.appLocation.appLocId,
            logLocId: this.logLocation.logLocId
        };
    }
    async init(settings) {
        const newPromise = new Promise((resolve, reject) => {
            new Promise((resolve, reject) => {
                this.settings = settings;
                this.connectStorage(settings).then((status) => {
                    if (status) {
                        resolve(status);
                    }
                    else {
                        reject();
                    }
                });
            }).then(function () {
                if (this.connectionStatus == 1) {
                    let returnPromise = this.setUpSuccess(settings);
                    returnPromise.then((updatedArray) => {
                        if (updatedArray) {
                            resolve(updatedArray);
                        }
                        else {
                            reject([]);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }.bind(this));
        });
        return newPromise;
    }
    async subscribe(MessageLog_Incoming, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element) {
        const MessageLog = MessageLog_Incoming.pipe((0, rxjs_1.map)(incoming_message => {
            let finalResponse;
            if ("header" in incoming_message) {
                let message = incoming_message;
                finalResponse = {
                    appLogLocId: new export_1.Uuid().generateId(),
                    appData: {
                        msgId: message.header.messageID || new export_1.Uuid().generateId(),
                        msgLogDateTime: new Date(),
                        msgDateTime: new Date(),
                        msgTag: 'default',
                        msgPayload: JSON.stringify(message)
                    }
                };
            }
            else {
                let message = incoming_message;
                finalResponse = message;
            }
            return finalResponse;
        }));
        const newPromise = new Promise((resolve, reject) => {
            try {
                if (!localState) {
                    localState = LocalStates.UpdatedSettings;
                }
                if (this.needReconnect == true) {
                    this.connectStorage(this.settings).then((status) => {
                        if (this.connectionStatus == 1) {
                            this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                                .then((result) => {
                                resolve(result);
                            })
                                .catch((err) => {
                                reject(err);
                            });
                        }
                    });
                    this.needReconnect = false;
                }
                else if (localState == LocalStates.UpdatedSettings) {
                    if (AppLocation || LogLocation || AppProfile)
                        this.updateSettings(AppLocation, LogLocation, AppProfile, (error_func) => {
                            this.needReconnect = true;
                            this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                                .then((result) => {
                                resolve(result);
                            })
                                .catch((err) => {
                                reject(err);
                            });
                        }, (success_func) => {
                            localState = LocalStates.Subscription;
                            this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                                .then((result) => {
                                resolve(result);
                            })
                                .catch((err) => {
                                reject(err);
                            });
                        });
                    else {
                        localState = LocalStates.Subscription;
                        this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                            .then((result) => {
                            resolve(result);
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    }
                }
                else if (localState == LocalStates.Subscription) {
                    let appLogLocId;
                    let subscription = MessageLog.subscribe((element) => {
                        appLogLocId = element.appLogLocId;
                        localState = LocalStates.WriteLogLoc;
                        this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element);
                    });
                    if (subscription.closed && !appLogLocId) {
                        console.log(-1);
                        reject(-1);
                        return;
                    }
                    else {
                        console.log("Logging subscription started...");
                        resolve(1);
                    }
                }
                else if (localState == LocalStates.WriteLogLoc) {
                    let appLogLoc = {
                        appLogLocId: element.appLogLocId,
                        appLocId: this.appLocation.appLocId,
                        logLocId: this.logLocation.logLocId
                    };
                    this.writeLogLoc(appLogLoc, function (err) {
                        if (err) {
                            this.needReconnect = true;
                            this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element);
                        }
                    }.bind(this), function () {
                        localState = LocalStates.WriteMessage;
                        this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element);
                    }.bind(this));
                }
                else if (localState == LocalStates.WriteMessage) {
                    this.writeMessage(element, (err) => {
                        if (err) {
                            this.needReconnect = true;
                            this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element);
                        }
                    });
                }
            }
            catch (e) {
                console.log("" + e.message);
                reject(e.message);
            }
        });
        return newPromise;
    }
    async filter(search) {
        let result = [];
        if (this.settings.storage == "MongoDB" && this.settings.cacheMessageLimit == 0) {
            return new Promise((resolve, reject) => {
                this.findFromMongo(search).then((data) => {
                    result.push.apply(result, data);
                    result.forEach(msg => console.log(msg.appData.msgId));
                    resolve(result);
                });
            });
        }
        else if (this.settings.storage == "MongoDB" && this.settings.cacheMessageLimit > 0) {
            let key = Object.keys(search)[0];
            let value = Object.values(search)[0];
            function isMsgDateTime(obj) {
                return (typeof obj === "object" &&
                    typeof obj.from === "object" &&
                    typeof obj.to === "object");
            }
            if (key == "msgId") {
                this.arrLog.forEach(element => {
                    if (value == element.appData.msgId) {
                        result.push(element);
                    }
                });
                console.log(`Filter "${key} : ${value}" returns`);
            }
            else if (isMsgDateTime(search)) {
                const fromDate = new Date(`${search.from.date}T${("0" + search.from.hour).slice(-2)}:${("0" + search.from.minute).slice(-2)}:${("0" + search.from.second).slice(-2)}`);
                const toDate = new Date(`${search.to.date}T${("0" + search.to.hour).slice(-2)}:${("0" + search.to.minute).slice(-2)}:${("0" + search.to.second).slice(-2)}`);
                const filteredData = this.arrLog.filter(item => {
                    const itemDate = new Date(item.appData.msgDateTime);
                    return itemDate >= fromDate && itemDate <= toDate;
                });
                result.push.apply(result, filteredData);
                console.log(`Filter "${fromDate} : ${toDate}" returns`);
            }
            else if (key == "msgPayload") {
                this.arrLog.forEach((element) => {
                    if (element.appData.msgPayload.toString().includes(value) == true) {
                        result.push(element);
                    }
                });
                console.log(`Filter "${key} : ${value}" returns`);
            }
            else if (key != "msgTag" || "msgDateTime" || "msgId") {
                console.log(`Invalid search entries. Available keys are "msg", "msgDateTime", "msgId' and "msgTag"`);
            }
            else {
                throw new Error("Method not implemented.");
            }
            result.forEach(msg => console.log(msg.appData.msgId));
            return result;
        }
        else {
            console.log(`Search not supported from file at the moment.`);
        }
    }
    async convertCDMStoMessageLog(args, tag) {
        return new Promise((resolve) => {
            let transformedDataObj = {
                appLogLocId: new export_1.Uuid().generateId(),
                appData: {
                    msgId: args.uuid,
                    msgLogDateTime: new Date(),
                    msgDateTime: new Date(),
                    msgTag: tag || 'default',
                    msgPayload: JSON.stringify(args)
                }
            };
            resolve(transformedDataObj);
        });
    }
    async convertMessageLogtoCDMS(args) {
        return new Promise((resolve) => {
            args;
            let raw = args.appData.msgPayload;
            let payload = JSON.parse(raw);
            resolve(payload);
        });
    }
    writeLogLoc(data, err_func, callback_func) {
        if (this.arrLog.length > this.settings.cacheMessageLimit) {
            this.arrLog.shift();
        }
        if (this.storage == "File") {
            let logLocation = JSON.stringify(data);
            fs.appendFile('appLogLoc.json', logLocation + '\r\n', (err) => {
                if (err) {
                    err_func(err);
                    console.log(err.message);
                }
                callback_func();
            });
        }
        if (this.storage == "MongoDB") {
            let messageModel = this.MongooseConnection.model('AppLogLoc', require('../type/schemas/appLogLoc.schema'));
            messageModel.create(data).then(() => {
                callback_func();
            }).catch((err) => {
                err_func(err);
                console.log(`MongoError: ${err.message}`);
            });
        }
    }
    writeMessage(element, err_func) {
        this.arrLog.push(element);
        if (this.arrLog.length > this.settings.cacheMessageLimit) {
            this.arrLog.shift();
        }
        if (this.storage == "File") {
            let message = JSON.stringify(element);
            fs.appendFile('log.json', message + "\r\n", (err) => {
                if (err) {
                    err_func(err);
                    console.log(err.message);
                }
                console.log("Logging MessageID: " + element.appData.msgId + " into " + this.storage);
                console.log(`Local instance of array has ${this.arrLog.length} messages at the moment and the first one is ${this.arrLog[0].appData.msgId}`);
            });
        }
        if (this.storage == "MongoDB") {
            let messageModel = this.MongooseConnection.model('Message', require('../type/schemas/message.schema'));
            messageModel.create(element).then(() => {
                console.log(`Logging MessageID ${element.appData.msgId} into ${this.storage} : ${this.settings.customSetting.server || this.settings.customSetting.url}`);
            }).catch((err) => {
                err_func(err);
                console.log(`MongoError: ${err.message}`);
            });
        }
    }
    writeSettings(data, err_func) {
        if (this.storage == "File") {
            let appLocation = JSON.stringify(data.appLocation);
            fs.appendFile('appLocation.json', appLocation + '\r\n', (err) => {
                if (err)
                    throw err;
            });
            let logLocation = JSON.stringify(data.logLocation);
            fs.appendFile('logLocation.json', logLocation + '\r\n', (err) => {
                if (err)
                    throw err;
            });
            let appProfile = JSON.stringify(data.appProfile);
            fs.appendFile('appProfile.json', appProfile + '\r\n', (err) => {
                if (err)
                    throw err;
            });
        }
        if (this.storage == "MongoDB") {
            let appProfileModel = this.MongooseConnection.model('AppProfile', require('../type/schemas/appProfile.schema'));
            let appLocationModel = this.MongooseConnection.model('AppLocation', require('../type/schemas/appLocation.schema'));
            let logLocationModel = this.MongooseConnection.model('LogLocation', require('../type/schemas/logLocation.schema'));
            appProfileModel.create(data.appProfile).then(() => {
            }).catch((err) => {
                err_func(err);
            });
            appLocationModel.create(data.appLocation).then(() => {
            }).catch((err) => {
                err_func(err);
            });
            logLocationModel.create(data.logLocation).then(() => {
            }).catch((err) => {
                err_func(err);
            });
        }
    }
    updateSettings(AppLocation, LogLocation, AppProfile, error_func, success_func) {
        let configuration = {};
        configuration.appLocation = AppLocation;
        configuration.logLocation = LogLocation;
        configuration.appProfile = AppProfile;
        this.writeSettings(configuration, (err => {
            if (err) {
                error_func(err);
            }
            else {
                success_func();
            }
        }));
        return configuration;
    }
    setSettings(settings) {
        this.appProfile.appName = settings.setting.appName;
        this.appLocation.appLocId = settings.setting.appLogId;
        this.appLocation.appLocName = settings.setting.appLocName;
        this.logLocation.logLocId = settings.setting.logLocId;
        this.logLocation.logLocName = settings.setting.logLocName;
        this.appLogLoc.appLocId = settings.setting.appLogId;
        this.appLogLoc.logLocId = settings.setting.logLocId;
        this.appProfile.appId = settings.setting.appId;
        this.appLocation.appId = settings.setting.appId;
        if (settings.setting.appId == null || settings.setting.appId.trim() == '')
            this.appProfile.appId = this.generateId();
        this.appLocation.appId = this.appProfile.appId;
        if (settings.setting.appLogId == null || settings.setting.appLogId.trim() == '')
            this.appLocation.appLocId = this.generateId();
        this.appLogLoc.appLocId = this.appLocation.appLocId;
        if (settings.setting.logLocId == null || settings.setting.logLocId.trim() == '')
            this.logLocation.logLocId = this.generateId();
        this.appLogLoc.logLocId = this.logLocation.logLocId;
    }
    generateId() {
        let messageId = new export_1.Uuid();
        return messageId.generateId().toString();
    }
    initialReadData(settings) {
        const promise = new Promise(async (resolve, reject) => {
            if (this.storage == "File") {
                if (fs.existsSync('log.json') == true) {
                    let filestat = fs.statSync('log.json');
                    let fileSize = filestat.size / (1024 * 1024);
                    if (fileSize <= 500) {
                        let file = fs.readFileSync('log.json', 'utf-8').toString();
                        let fileString = file.split("\r\n");
                        fileString.forEach(element => {
                            try {
                                if (element == '') {
                                    throw Error;
                                }
                                let data = JSON.parse(element);
                                this.arrLog.push(data);
                            }
                            catch (e) { }
                        });
                    }
                    else {
                        throw new Error(`File Size Exceeded 500MB, please switch to mongo storage`);
                    }
                }
                resolve(this.arrLog);
            }
            if (this.storage == "MongoDB") {
                if (settings.cacheMessageLimit == 0) {
                    resolve(this.arrLog);
                }
                else {
                    let messages = [];
                    let messagesModel = this.MongooseConnection.model('Messages', require('../type/schemas/message.schema'));
                    messages = await messagesModel.find();
                    this.arrLog = messages.slice(0, 5);
                    resolve(this.arrLog);
                }
            }
        });
        return promise;
    }
    async connectMongo(settings) {
        return new Promise(async function (resolve, reject) {
            try {
                console.log(`Connecting to ${this.url}`);
                this.MongooseConnection = mongoose_1.default.createConnection(this.url);
                this.MongooseConnection.on('error', (error) => {
                    console.error('Connection error:', error);
                });
                this.MongooseConnection.once('open', () => {
                    console.log(`Connected to ${settings.customSetting.server || settings.customSetting.url}`);
                });
                this.connectionStatus = 1;
                resolve(this.connectionStatus);
            }
            catch (error) {
                this.connectionStatus = 0;
                console.error('An error occurred while connecting to the database:', error);
                setTimeout(() => {
                    this.connectMongo().then(() => {
                        resolve(this.connectionStatus);
                    });
                    console.log(`Reconnecting...`);
                }, 3000);
            }
        }.bind(this));
    }
    async setUpSuccess(settings) {
        const newPromise = new Promise((resolve, reject) => {
            try {
                this.setSettings(settings);
                this.updateSettings(this.appLocation, this.logLocation, this.appProfile, (err) => {
                    console.log("Error for updateSettings.");
                    console.log("Cannot start the logging service without a valid Mongo Server connection.");
                    console.log(err.message);
                    reject(err);
                });
                this.initialReadData(settings).then((updatedArray) => {
                    if (updatedArray) {
                        resolve(updatedArray);
                    }
                    else {
                        resolve(updatedArray);
                    }
                });
            }
            catch (err) {
                console.log("Error storing profile in storage.");
                console.log(err.message);
            }
        });
        return newPromise;
    }
    passwordConversion(password) {
        let c1 = password.replace(":", "%3A");
        let c2 = c1.replace("/", "%2F");
        let c3 = c2.replace("?", "%3F");
        let c4 = c3.replace("#", "%23");
        let c5 = c4.replace("[", "%5B");
        let c6 = c5.replace("]", "%5D");
        let final = c6.replace("@", "%40");
        console.log(final);
        return final;
    }
    connectStorage(settings) {
        return new Promise(async function (resolve, reject) {
            if (settings.storage == "File") {
                this.storage = settings.storage;
                this.connectionStatus = 1;
                resolve(this.connectionStatus);
            }
            if (settings.storage == "MongoDB") {
                this.storage = settings.storage;
                if (settings.customSetting) {
                    if (settings.customSetting.url) {
                        this.url = settings.customSetting.url;
                        this.connectMongo(settings).then(function () {
                            resolve(this.connectionStatus);
                        }.bind(this));
                    }
                    else if (!settings.customSetting.user || !settings.customSetting.password) {
                        this.url = 'mongodb://' + settings.customSetting.server + '/' + settings.customSetting.database;
                        this.connectMongo(settings).then(function () {
                            resolve(this.connectionStatus);
                        }.bind(this));
                    }
                    else {
                        let pass = this.passwordConversion(settings.customSetting.password);
                        if (settings.customSetting.srv == true) {
                            this.url = 'mongodb+srv://' + settings.customSetting.user + ':' + pass + '@' + settings.customSetting.server + '/' + settings.customSetting.database;
                        }
                        else {
                            this.url = 'mongodb://' + settings.customSetting.user + ':' + pass + '@' + settings.customSetting.server + '/' + settings.customSetting.database;
                        }
                        this.connectMongo(settings).then(function () {
                            resolve(this.connectionStatus);
                        }.bind(this));
                    }
                }
            }
        }.bind(this));
    }
    async findFromMongo(args) {
        let limit = 500;
        let messageModel = this.MongooseConnection.model('Messages', require('../type/schemas/message.schema'));
        let key = Object.keys(args)[0];
        let value = Object.values(args)[0];
        let result = [];
        function isMsgDateTime(obj) {
            return (typeof obj === "object" &&
                typeof obj.from === "object" &&
                typeof obj.to === "object");
        }
        if (key == 'msgPayload') {
            let data = await messageModel.find({ "appData.msgPayload": { "$regex": value, "$options": "i" } }).limit(limit);
            result.push.apply(result, data);
        }
        else if (isMsgDateTime(args)) {
            if (!args.from.hour && !args.from.minute && !args.from.second && !args.to.hour && !args.to.minute && !args.to.second) {
                args.from.hour = '0';
                args.from.minute = '0';
                args.from.second = '0';
                args.to.hour = '23';
                args.to.minute = '59';
                args.to.second = '59';
            }
            if (args.from.hour && args.to.hour) {
                if (Number(args.from.hour) >= 8) {
                    args.from.hour = Number(args.from.hour) - 8;
                }
                else if (Number(args.from.hour) == 0) {
                    args.from.hour = 0;
                }
                else {
                    args.from.hour = 16 + Number(args.from.hour);
                }
                if (Number(args.to.hour) >= 8) {
                    args.to.hour = Number(args.to.hour) - 8;
                }
                else {
                    args.to.hour = 16 + Number(args.to.hour);
                }
            }
            const fromDate = new Date(`${args.from.date}T${("0" + args.from.hour).slice(-2)}:${("0" + args.from.minute).slice(-2)}:${("0" + args.from.second).slice(-2)}.000Z`);
            const toDate = new Date(`${args.to.date}T${("0" + args.to.hour).slice(-2)}:${("0" + args.to.minute).slice(-2)}:${("0" + args.to.second).slice(-2)}.999Z`);
            let data = await messageModel.find({
                "appData.msgDateTime": {
                    $gte: fromDate,
                    $lt: toDate
                }
            }).limit(limit);
            result.push.apply(result, data);
        }
        else if (key == 'msgTag') {
            let data = await messageModel.find({ "appData.msgTag": value }).limit(limit);
            result.push.apply(result, data);
        }
        else {
            let query = {};
            query['appData.' + key] = value;
            let data = await messageModel.find(query).limit(limit);
            result.push.apply(result, data);
        }
        console.log(`Filter "${key} : ${value}" returns`);
        return result;
    }
}
exports.LoggingService = LoggingService;
var LocalStates;
(function (LocalStates) {
    LocalStates["UpdatedSettings"] = "UpdatedSettings";
    LocalStates["Subscription"] = "Subscription";
    LocalStates["WriteLogLoc"] = "WriteLogLoc";
    LocalStates["WriteMessage"] = "WriteMessage";
})(LocalStates = exports.LocalStates || (exports.LocalStates = {}));
//# sourceMappingURL=logging-service.js.map