import { Observable, map } from "rxjs";
import { AppLocation, AppLogLoc, LoggingServiceInterface, LogLocation, LogSetting, MessageLog, AppProfile, MsgDateTime } from "../type/datatype";
import * as fs from "fs"
import mongoose, { Model, Mongoose } from "mongoose";
import { resolve } from "path";
import { IncomingMessage } from "http";
import { BaseMessage, Uuid } from "../dependencies/msgutil/interface/export";

/**
 * Generic logging service
 * - Allow logging of observable
 */
export class LoggingService implements LoggingServiceInterface {
    private MongooseConnection: Mongoose
    private connectionStatus: number = 0
    private settings: LogSetting
    private needReconnect: boolean
    private arrLog: MessageLog[] = []
    private storage: string;
    private appProfile: AppProfile = {
        appId: '',
        appName: ''
    }
    private appLocation: AppLocation = {
        appId: this.appProfile.appId,
        appLocId: '',
        appLocName: ''
    }
    private logLocation: LogLocation = {
        logLocId: '',
        logLocName: ''
    }
    private appLogLoc: AppLogLoc = {
        appLogLocId: '', // Should be MessageLog.appLogLocId
        appLocId: this.appLocation.appLocId,
        logLocId: this.logLocation.logLocId
    }

    /* -----------------------------------------   PRIMARY INTERFACE  ----------------------------------------- */
    /*Setting configuration for file storage. Will take it settings to determine storage type and also where it will be stored by instantiating the location of the safe
    file. This function also will attempt to read data and insert them into loca instance array from designated database based on the settings infomrmation provided.*/
    public async init(settings: LogSetting): Promise<MessageLog[]> {
        const newPromise: Promise<MessageLog[]> = new Promise(
            (resolve, reject) => {
                new Promise((resolve, reject) => {
                    this.settings = settings
                    this.connectStorage(settings).then((status) => {
                        if (status) {
                            resolve(status)
                        } else {
                            reject()
                        }
                    })
                }).then(function () {
                    if (this.connectionStatus == 1) {
                        let returnPromise = this.setUpSuccess(settings) as Promise<any>
                        returnPromise.then((updatedArray) => {
                            if (updatedArray) {
                                resolve(updatedArray)
                            } else {
                                reject([])
                            }
                        }).catch((err) => {
                            reject(err);
                        })
                    }
                }.bind(this))
            })
        return newPromise
    }

    /* This is where the logging will be performed. It will subscribe to the incoming observable, with pushing the incoming messages into the local instance array,
    and then perform the logging through a series of steps. 
    The utilization of local state is to determined a proper logical workflow or logging procedures to ensure all the necessary parameters and properties are properly set up and prepared
    in order to ensure proper logging */
    public async subscribe(
        MessageLog_Incoming?: Observable<MessageLog | BaseMessage>,
        AppLocation?: AppLocation, LogLocation?: LogLocation, AppLogLoc?: AppLogLoc, AppProfile?: AppProfile,
        localState?: LocalStates,
        element?: MessageLog
    ): Promise<string | number> {

        /* Need to check for the type of MessaegLog_Incoming. And then transform them accordingly.
        Right now, mongo will only accepts MessageLog type. Any Base message will be mapped respectively
        to be a MessageLog Type in order to proceed with the logging.*/
        const MessageLog = MessageLog_Incoming.pipe(
            map(incoming_message => {

                let finalResponse: MessageLog | BaseMessage;

                // Check if there's header in incoming_message to see if it's a BaseMessage type.
                if ("header" in incoming_message) {
                    let message = incoming_message as BaseMessage
                    finalResponse = {
                        appLogLocId: new Uuid().generateId(),
                        appData: {
                            msgId: message.header.messageID || new Uuid().generateId(),
                            msgLogDateTime: new Date(),
                            msgDateTime: new Date(),
                            msgTag: 'default',
                            msgPayload: JSON.stringify(message)
                        }
                    }
                }
                else {
                    let message: MessageLog = incoming_message as MessageLog // Type assertion, reinforce, telling the code this is strictly MessageLog
                    finalResponse = message;
                }

                return finalResponse
            })
        )

        // Once the finalResponse above has been prepared, the logging sequences will be begin based on the states it's in.
        const newPromise: Promise<string | number> = new Promise(
            (resolve, reject) => {
                try {
                    if (!localState) {
                        localState = LocalStates.UpdatedSettings;
                    }
                    // Checking if there's any internet connection. This is build into the function to be ensure the resilience of the execution
                    if (this.needReconnect == true) {
                        this.connectStorage(this.settings).then((status) => {
                            if (this.connectionStatus == 1) {
                                this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                                    .then((result: number) => {
                                        resolve(result);
                                    })
                                    .catch((err: number) => {
                                        reject(err);
                                    })
                            }
                        })
                        this.needReconnect = false
                    }
                    else if (localState == LocalStates.UpdatedSettings) {
                        // if client pass in any of the arguments in case they wish to overwrite the initial configurations
                        if (AppLocation || LogLocation || AppProfile)
                            this.updateSettings(AppLocation, LogLocation, AppProfile, (error_func) => {
                                //  if there's error, will do this chunk of code. Which is to reconnect assuming internet is interrupted
                                this.needReconnect = true // Check for online status at every state
                                this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                                    .then((result: number) => {
                                        resolve(result);
                                    })
                                    .catch((err: number) => {
                                        reject(err);
                                    })
                            },
                                (success_func) => {
                                    localState = LocalStates.Subscription
                                    this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                                        .then((result: number) => {
                                            resolve(result);
                                        })
                                        .catch((err: number) => {
                                            reject(err);
                                        })
                                })
                        else {
                            localState = LocalStates.Subscription;
                            this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                                .then((result: number) => {
                                    resolve(result);
                                })
                                .catch((err: number) => {
                                    reject(err);
                                })
                        }
                    } else if (localState == LocalStates.Subscription) {
                        let appLogLocId: string
                        let subscription = MessageLog.subscribe((element: MessageLog) => {
                            appLogLocId = element.appLogLocId
                            localState = LocalStates.WriteLogLoc;
                            this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element);
                        })

                        if (subscription.closed && !appLogLocId) {
                            console.log(-1)
                            reject(-1)
                            return
                        } else {
                            console.log("Logging subscription started...");
                            resolve(1)
                        }
                    } else if (localState == LocalStates.WriteLogLoc) {
                        // Regenerate everything
                        let appLogLoc = {
                            appLogLocId: element.appLogLocId,
                            appLocId: this.appLocation.appLocId,
                            logLocId: this.logLocation.logLocId
                        }

                        this.writeLogLoc(appLogLoc,
                            function (err) {
                                if (err) {
                                    this.needReconnect = true;
                                    this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element);
                                }
                            }.bind(this),
                            function () {
                                localState = LocalStates.WriteMessage;
                                this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element);
                            }.bind(this)
                        )
                    } else if (localState == LocalStates.WriteMessage) {
                        this.writeMessage(element, (err) => {
                            if (err) {
                                this.needReconnect = true // Check for online status at every state
                                this.subscribe(MessageLog, AppLocation, LogLocation, AppLogLoc, AppProfile, localState, element)
                            }
                        })
                    }
                }
                catch (e) {
                    console.log("" + e.message);
                    reject(e.message)
                }
            })
        return newPromise
    }

    /*Filter messages is a way for acquisition of data by filtering a given set of search query from the client to filter out element in the local instance that contain 
    or matches the search query and then returning them in an array.*/
    public async filter(search: { msgId: string | number; } | { msgTag: string; } | { msgPayload: string } | any | MsgDateTime): Promise<MessageLog[]> {
        let result: MessageLog[] = []
        // Mongo case: If cache limit is zero, then write another function to search froms database directly
        if (this.settings.storage == "MongoDB" && this.settings.cacheMessageLimit == 0) {
            return new Promise((resolve, reject) => {
                this.findFromMongo(search).then((data: MessageLog[]) => {
                    result.push.apply(result, data)
                    result.forEach(msg => console.log(msg.appData.msgId))
                    resolve(result)
                })
            })
        } else if (this.settings.storage == "MongoDB" && this.settings.cacheMessageLimit > 0) {
            // Search from local instance
            let key = Object.keys(search)[0]
            let value: any = Object.values(search)[0]
            function isMsgDateTime(obj: any): obj is MsgDateTime {
                return (
                    typeof obj === "object" &&
                    typeof obj.from === "object" &&
                    typeof obj.to === "object"
                );
            }

            if (key == "msgId") {
                this.arrLog.forEach(element => {
                    if (value == element.appData.msgId) {
                        result.push(element)
                    }
                });
                console.log(`Filter "${key} : ${value}" returns`)
            }
            else if (isMsgDateTime(search)) {
                const fromDate = new Date(`${search.from.date}T${("0" + search.from.hour).slice(-2)}:${("0" + search.from.minute).slice(-2)}:${("0" + search.from.second).slice(-2)}`);
                const toDate = new Date(`${search.to.date}T${("0" + search.to.hour).slice(-2)}:${("0" + search.to.minute).slice(-2)}:${("0" + search.to.second).slice(-2)}`);

                const filteredData = this.arrLog.filter(item => {
                    const itemDate: Date = new Date(item.appData.msgDateTime)
                    return itemDate >= fromDate && itemDate <= toDate;
                });

                result.push.apply(result, filteredData)
                console.log(`Filter "${fromDate} : ${toDate}" returns`)
            } else if (key == "msgPayload") {
                this.arrLog.forEach((element: MessageLog) => {
                    if (element.appData.msgPayload.toString().includes(value) == true) {
                        result.push(element)
                    }
                });
                console.log(`Filter "${key} : ${value}" returns`)
            } else if (key != "msgTag" || "msgDateTime" || "msgId") {
                console.log(`Invalid search entries. Available keys are "msg", "msgDateTime", "msgId' and "msgTag"`)
            } else {
                throw new Error("Method not implemented.");
            }
            result.forEach(msg => console.log(msg.appData.msgId))
            return result
        } else {
            // File case:If cache limit is 0, then throw error. Otherwise proceed with current logic
            console.log(`Search not supported from file at the moment.`)
        }
    }


    public async convertCDMStoMessageLog(args: any, tag?: string | string[]): Promise<MessageLog> {
        return new Promise((resolve) => {
            let transformedDataObj: MessageLog = {
                appLogLocId: new Uuid().generateId(),
                appData: {
                    msgId: args.uuid,
                    msgLogDateTime: new Date(),
                    msgDateTime: new Date(),
                    msgTag: tag || 'default',
                    msgPayload: JSON.stringify(args)
                }
            }
            resolve(transformedDataObj)
        })
    }

    public async convertMessageLogtoCDMS(args: MessageLog): Promise<any> {
        return new Promise((resolve) => {
            args as MessageLog
            let raw = args.appData.msgPayload
            let payload = JSON.parse(raw as string)
            resolve(payload)
        })
    }


    /* -----------------------------------------   Secondary || Auxiliary Functions  ----------------------------------------- */
    // Secondary functions were written to provide auxiliary support for the main interface to supplement the complexity of the workflow it needs to perform

    /* Log AppLogLoc data into desginated database */
    private writeLogLoc(data: AppLogLoc, err_func?, callback_func?) {
        if (this.arrLog.length > this.settings.cacheMessageLimit) {
            // remove the first element by shift*
            this.arrLog.shift();
        }
        if (this.storage == "File") {
            let logLocation = JSON.stringify(data)
            fs.appendFile('appLogLoc.json', logLocation + '\r\n', (err) => {
                if (err) {
                    err_func(err)
                    console.log(err.message)
                }
                callback_func()
            })
        }
        if (this.storage == "MongoDB") {
            let messageModel: Model<any> = this.MongooseConnection.model('AppLogLoc', require('../type/schemas/appLogLoc.schema'))
            messageModel.create(data).then(() => {
                callback_func()
            }).catch((err) => {
                err_func(err)
                console.log(`MongoError: ${err.message}`)
            })
        }
    }

    // Log Messages into designated database
    private writeMessage(element: MessageLog, err_func?) {
        this.arrLog.push(element);
        if (this.arrLog.length > this.settings.cacheMessageLimit) {
            // remove the first element by shift*
            this.arrLog.shift();
            // console.log(`Current array log length is ${this.arrLog.length}`)
        }
        if (this.storage == "File") {
            let message = JSON.stringify(element)
            fs.appendFile('log.json', message + "\r\n", (err) => {
                if (err) {
                    err_func(err)
                    console.log(err.message)
                }
                console.log("Logging MessageID: " + element.appData.msgId + " into " + this.storage);
                console.log(`Local instance of array has ${this.arrLog.length} messages at the moment and the first one is ${this.arrLog[0].appData.msgId}`)
            })
        }
        if (this.storage == "MongoDB") {
            let messageModel: Model<any> = this.MongooseConnection.model('Message', require('../type/schemas/message.schema'))
            messageModel.create(element).then(() => {
                console.log(`Logging MessageID ${element.appData.msgId} into ${this.storage} : ${this.settings.customSetting.server || this.settings.customSetting.url}`);
            }).catch((err) => {
                err_func(err)
                console.log(`MongoError: ${err.message}`)
            })
        }
    }

    // Log AppProfile, AppLocation and LogLocation into designated database
    private writeSettings(data: LogConfiguration, err_func?) {
        if (this.storage == "File") {
            let appLocation = JSON.stringify(data.appLocation)
            fs.appendFile('appLocation.json', appLocation + '\r\n', (err) => {
                if (err) throw err
            })
            let logLocation = JSON.stringify(data.logLocation)
            fs.appendFile('logLocation.json', logLocation + '\r\n', (err) => {
                if (err) throw err
            })
            let appProfile = JSON.stringify(data.appProfile)
            fs.appendFile('appProfile.json', appProfile + '\r\n', (err) => {
                if (err) throw err
            })
        }
        if (this.storage == "MongoDB") {
            let appProfileModel: Model<any> = this.MongooseConnection.model('AppProfile', require('../type/schemas/appProfile.schema'))
            let appLocationModel: Model<any> = this.MongooseConnection.model('AppLocation', require('../type/schemas/appLocation.schema'))
            let logLocationModel: Model<any> = this.MongooseConnection.model('LogLocation', require('../type/schemas/logLocation.schema'))
            appProfileModel.create(data.appProfile).then(() => {
            }).catch((err) => {
                err_func(err)
            })
            appLocationModel.create(data.appLocation).then(() => {
            }).catch((err) => {
                err_func(err)
            })
            logLocationModel.create(data.logLocation).then(() => {
            }).catch((err) => {
                err_func(err)
            })
        }
    }

    // Reducing the complexity of the settings configuration through simplication and combinig the objects into a single object model
    private updateSettings(AppLocation?: AppLocation, LogLocation?: LogLocation, AppProfile?: AppProfile, error_func?, success_func?): LogConfiguration {
        let configuration: LogConfiguration = {}
        configuration.appLocation = AppLocation
        configuration.logLocation = LogLocation
        configuration.appProfile = AppProfile
        this.writeSettings(configuration, (err => {
            if (err) {
                error_func(err)
            } else {
                success_func()
            }
        }))
        return configuration
    }

    // Set Settings based on input value from client
    private setSettings(settings: LogSetting) {
        this.appProfile.appName = settings.setting.appName
        this.appLocation.appLocId = settings.setting.appLogId
        this.appLocation.appLocName = settings.setting.appLocName
        this.logLocation.logLocId = settings.setting.logLocId
        this.logLocation.logLocName = settings.setting.logLocName
        this.appLogLoc.appLocId = settings.setting.appLogId
        this.appLogLoc.logLocId = settings.setting.logLocId
        this.appProfile.appId = settings.setting.appId
        this.appLocation.appId = settings.setting.appId

        // In case if clients doesnt have UUID // Must be unique every time 
        if (settings.setting.appId == null || settings.setting.appId.trim() == '')
            this.appProfile.appId = this.generateId()
        this.appLocation.appId = this.appProfile.appId
        if (settings.setting.appLogId == null || settings.setting.appLogId.trim() == '')
            this.appLocation.appLocId = this.generateId()
        this.appLogLoc.appLocId = this.appLocation.appLocId
        if (settings.setting.logLocId == null || settings.setting.logLocId.trim() == '')
            this.logLocation.logLocId = this.generateId()
        this.appLogLoc.logLocId = this.logLocation.logLocId
    }

    // Randomly generate UUID
    private generateId(): string {
        let messageId = new Uuid();
        return messageId.generateId().toString();
    }

    // Initialize instances array for previously stored MessageLogs
    private initialReadData(settings: LogSetting): Promise<MessageLog[]> {
        const promise: Promise<MessageLog[]> = new Promise(async (resolve, reject) => {
            if (this.storage == "File") {
                // Add checking for file size, if its too big, then throw new Error(`File Size exceeded please switch to mongo storage')
                if (fs.existsSync('log.json') == true) {
                    let filestat = fs.statSync('log.json')
                    let fileSize = filestat.size / (1024 * 1024)// in MB
                    // console.log(fileSize)
                    if (fileSize <= 500) {
                        let file = fs.readFileSync('log.json', 'utf-8').toString()
                        let fileString = file.split("\r\n")
                        fileString.forEach(element => {
                            try {
                                if (element == '') {
                                    throw Error
                                }
                                let data: MessageLog = JSON.parse(element)
                                this.arrLog.push(data)
                            }
                            catch (e) { }
                        });
                    } else {
                        throw new Error(`File Size Exceeded 500MB, please switch to mongo storage`)
                    }
                }
                resolve(this.arrLog)
            }
            if (this.storage == "MongoDB") {
                if (settings.cacheMessageLimit == 0) {
                    resolve(this.arrLog)
                } else {
                    let messages: MessageLog[] = []
                    let messagesModel = this.MongooseConnection.model('Messages', require('../type/schemas/message.schema'))
                    messages = await messagesModel.find()
                    this.arrLog = messages.slice(0, 5)
                    resolve(this.arrLog)
                }
            }
        })
        return promise
    }

    // Attempt to connect to designated mongo settings provided by client
    private async connectMongo(settings?: LogSetting) {
        return new Promise(async function (resolve, reject) {
            try {
                console.log(`Connecting to ${this.url}`)
                this.MongooseConnection = mongoose.createConnection(this.url)
                this.MongooseConnection.on('error', (error) => {
                    console.error('Connection error:', error);
                });
                this.MongooseConnection.once('open', () => {
                    console.log(`Connected to ${settings.customSetting.server || settings.customSetting.url}`);
                });
                this.connectionStatus = 1
                resolve(this.connectionStatus)
            }
            catch (error) {
                this.connectionStatus = 0
                console.error('An error occurred while connecting to the database:', error);
                setTimeout(() => {
                    this.connectMongo().then(() => {
                        resolve(this.connectionStatus)
                    })
                    console.log(`Reconnecting...`)
                }, 3000);
            }
        }.bind(this))
    }

    // Setting up the local instances of AppProfile, AppLocation and LogLocation. And also performs the initial logging of the aforementioned objects
    // Also performs initial data acquisition to load local instance message array with exisiting message logs from designated database if there's any
    private async setUpSuccess(settings): Promise<MessageLog[]> {
        const newPromise: Promise<MessageLog[]> = new Promise((resolve, reject) => {
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
                        resolve(updatedArray)
                    } else {
                        // reject([])
                        resolve(updatedArray)
                    }
                })
            }
            catch (err) {
                console.log("Error storing profile in storage.");
                console.log(err.message)
            }
        })
        return newPromise
    }

    // Password needs to be converted to the standard that mongo library will accept. More info in the link provided below
    // https://www.mongodb.com/docs/manual/reference/connection-string/
    private passwordConversion(password: string): string {
        let c1 = password.replace(":", "%3A")
        let c2 = c1.replace("/", "%2F")
        let c3 = c2.replace("?", "%3F")
        let c4 = c3.replace("#", "%23")
        let c5 = c4.replace("[", "%5B")
        let c6 = c5.replace("]", "%5D")
        let final = c6.replace("@", "%40")
        console.log(final)
        return final
    }

    // Conect to designated storage destination
    private connectStorage(settings: LogSetting) {
        return new Promise(async function (resolve, reject) {
            if (settings.storage == "File") {
                this.storage = settings.storage;
                // console.log(`File storage set to ` + `"${this.storage}"`);
                this.connectionStatus = 1
                resolve(this.connectionStatus)
            }
            if (settings.storage == "MongoDB") {
                this.storage = settings.storage;
                // console.log(`File storage set to ` + `"${this.storage}"`);
                if (settings.customSetting) {
                    if (settings.customSetting.url) {
                        this.url = settings.customSetting.url
                        this.connectMongo(settings).then(function () {
                            resolve(this.connectionStatus)
                        }.bind(this))
                    }
                    else if (!settings.customSetting.user || !settings.customSetting.password) {
                        this.url = 'mongodb://' + settings.customSetting.server + '/' + settings.customSetting.database
                        this.connectMongo(settings).then(function () {
                            resolve(this.connectionStatus)
                        }.bind(this))
                    } else {
                        let pass = this.passwordConversion(settings.customSetting.password)
                        if (settings.customSetting.srv == true) {
                            this.url = 'mongodb+srv://' + settings.customSetting.user + ':' + pass + '@' + settings.customSetting.server + '/' + settings.customSetting.database
                        } else {
                            this.url = 'mongodb://' + settings.customSetting.user + ':' + pass + '@' + settings.customSetting.server + '/' + settings.customSetting.database
                        }
                        this.connectMongo(settings).then(function () {
                            resolve(this.connectionStatus)
                        }.bind(this))
                    }
                }
            }
        }.bind(this))
    }

    // Direct queries from mongo database instead of local instance
    private async findFromMongo(args: any): Promise<MessageLog[]> {
        let limit = 500
        let messageModel = this.MongooseConnection.model('Messages', require('../type/schemas/message.schema'))
        let key: string = Object.keys(args)[0]
        let value: any = Object.values(args)[0]
        let result: MessageLog[] = []
        function isMsgDateTime(obj: any): obj is MsgDateTime {
            return (
                typeof obj === "object" &&
                typeof obj.from === "object" &&
                typeof obj.to === "object"
            );
        }

        if (key == 'msgPayload') {
            let data = await messageModel.find({ "appData.msgPayload": { "$regex": value, "$options": "i" } }).limit(limit)
            result.push.apply(result, data)
        } else if (isMsgDateTime(args)) {
            // Convert Time Zone. MongoDB's time server is somehow different, 8 hours behind despite it storing in my local machine
            if (!args.from.hour && !args.from.minute && !args.from.second && !args.to.hour && !args.to.minute && !args.to.second) {
                args.from.hour = '0'
                args.from.minute = '0'
                args.from.second = '0'
                args.to.hour = '23'
                args.to.minute = '59'
                args.to.second = '59'
            }
            if (args.from.hour && args.to.hour) {
                if (Number(args.from.hour) >= 8) {
                    args.from.hour = Number(args.from.hour) - 8
                } else if (Number(args.from.hour) == 0) {
                    args.from.hour = 0 // total 24:00:00 shoud be set to 00:00:00
                } else {
                    args.from.hour = 16 + Number(args.from.hour)
                }
                if (Number(args.to.hour) >= 8) {
                    args.to.hour = Number(args.to.hour) - 8
                } else {
                    args.to.hour = 16 + Number(args.to.hour)
                }
            }
            const fromDate = new Date(`${args.from.date}T${("0" + args.from.hour).slice(-2)}:${("0" + args.from.minute).slice(-2)}:${("0" + args.from.second).slice(-2)}.000Z`);
            const toDate = new Date(`${args.to.date}T${("0" + args.to.hour).slice(-2)}:${("0" + args.to.minute).slice(-2)}:${("0" + args.to.second).slice(-2)}.999Z`);

            let data = await messageModel.find({
                "appData.msgDateTime": {
                    $gte: fromDate,
                    $lt: toDate
                }
            }).limit(limit)
            result.push.apply(result, data);
        } else if (key == 'msgTag') {
            let data = await messageModel.find({ "appData.msgTag": value }).limit(limit)
            result.push.apply(result, data)
        } else {
            let query: any = {} // Trump card -- Search with any key
            query['appData.' + key] = value
            let data = await messageModel.find(query).limit(limit)
            result.push.apply(result, data)
        }

        console.log(`Filter "${key} : ${value}" returns`)
        return result
    }
}

interface LogConfiguration {
    appLocation?: AppLocation,
    logLocation?: LogLocation,
    appProfile?: AppProfile,
}

export enum LocalStates {
    UpdatedSettings = "UpdatedSettings",
    Subscription = "Subscription",
    WriteLogLoc = "WriteLogLoc",
    WriteMessage = "WriteMessage"
}