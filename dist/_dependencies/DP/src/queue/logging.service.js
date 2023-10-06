"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingService = void 0;
const common_1 = require("@nestjs/common");
const export_1 = require("../dependencies/FISAppMessageJSUtility/interface/export");
let LoggingService = class LoggingService extends common_1.ConsoleLogger {
    constructor(context) {
        super(context);
        this.isLogAllMessages = true;
        this.uuidgenerator = new export_1.Uuid();
        this.buffer = []; // Default buffer
        this.defaultDataTags = ['Standard Tag For Logging'];
        this.init({
            storage: process.env.storage || 'File',
        });
        if (context > '') {
            this.overrideDefaultTags([context]);
        }
        return this;
    }
    /**
     * Set if want to log all messages
     *
     * @param {boolean} logAll set to true to log all messages. Default is true.
     */
    setLogAll(logAll) {
        this.isLogAllMessages = logAll;
    }
    /**
     * Set to change default process tag
     *
     * @param {string[]} tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    overrideDefaultTags(tags) {
        this.defaultDataTags = tags;
    }
    /**
     * Append to default process tag
     *
     * @param {string[]} tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    appendDefaultTags(tags) {
        this.defaultDataTags = this.defaultDataTags.concat(tags);
    }
    /**
     * Intercept execution contect to add to log
     *
     * @param {ExecutionContext} context Execution context.
     * @param {CallHandler} next Next function called.
     */
    intercept(context, next) {
        // Add the request to log
        let req = context.switchToHttp().getRequest();
        this.addToLog(req, ['request']);
        // Proceed with handling the next event
        let handledObservable = next.handle();
        // Subscribe response stream to log
        this.subscribeToLog(handledObservable, ['response']);
        return handledObservable;
    }
    /**
     * Subscribe and add to Log
     *
     * @param {Observable<any>} newObservable to subscribe and add to log
     */
    subscribeToLog(newObservable, dataTags = []) {
        // Subscribe and add to Log
        newObservable.subscribe({
            next: (msg) => {
                this.addToLog(msg, dataTags);
            },
            error: (err) => {
                console.log(err.message, dataTags);
            },
            complete: () => { },
        });
    }
    /**
     * Add a message to log at key.
     *
     * @param {string|BaseMessage} message Message format compliants to FisApp
     * @param {string[]} dataTags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    addToLog(message, dataTags = []) {
        let isAddToDefaultLog = true;
        let key = '';
        // Create key either from message id
        if (!message) {
        }
        else {
            if (!message['header']) {
            }
            else {
                if (!message['header']['messageID']) {
                }
                else {
                    key = message.header.messageID;
                }
            }
        }
        // or create key generate from uuid
        if (key > '') {
        }
        else {
            key = this.uuidgenerator.generateId();
        }
        // Process and add to log
        if (isAddToDefaultLog) {
            // get data
            let messageData = message;
            while (messageData['data']) {
                messageData = messageData['data'];
            }
            // get all tags
            let tags = [];
            // check default tag
            if (this.defaultDataTags && this.defaultDataTags.length > 0) {
                tags = tags.concat(this.defaultDataTags);
            }
            // check current tag
            if (dataTags && dataTags.length > 0) {
                tags = tags.concat(dataTags);
            }
            // Create new message
            let newMessage = {
                id: key,
                data: message,
                date: new Date(),
                dataTags: tags,
            };
            this.buffer.push(newMessage);
        }
        return key;
    }
    /**
     * Check if  a key existed
     *
     * @param {string} key Key that you want to check
     */
    checkExisted(key) {
        let returnBool = false;
        this.buffer.forEach((log) => {
            if (log.id == key || returnBool == true) {
                returnBool = true;
            }
        });
        return returnBool;
    }
    /**
     * Find all log records
     *
     */
    getLogs() {
        return this.buffer;
    }
    /**
     * Setup.
     *
     * @param {LogSetting} settings Settings for storage and buffer.
     */
    init(settings) {
        this.settings = settings;
    }
    /**
     * Find log records with id, date or tag
     *
     * @param {{id:string}|{date:string}|{tag:string}} search Set search.id to find id/key. Set search.date to find a specific date. Set search.tag to find a specific tag.
     */
    findLogs(search) {
        // This is a simple implementation without storage
        let foundLog = [];
        this.buffer.forEach((log) => {
            if (search['id']) {
                if (log.id == search['id']) {
                    foundLog.push(log);
                }
            }
            if (search['date']) {
                if (log.date == search['date']) {
                    foundLog.push(log);
                }
            }
            if (search['tag']) {
                if (log.dataTags.includes(search['tag'])) {
                    foundLog.push(log);
                }
            }
        });
        return foundLog;
    }
    /**
     * Write a 'log' level log.
     * @param {string|BaseMessage} message Message format compliants to FisApp
     * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    log(message, ...optionalParams) {
        if (optionalParams['tags']) {
            optionalParams['tags'].push('log');
        }
        // Add the message to log
        this.addToLog(message, optionalParams['tags']);
        return super.log(message, ...optionalParams);
    }
    /**
     * Write an 'error' level log.
     * @param {string|BaseMessage} message Message format compliants to FisApp
     * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    error(message, ...optionalParams) {
        if (optionalParams['tags']) {
            optionalParams['tags'].push('error');
        }
        // Add the message to log
        this.addToLog(message, optionalParams['tags']);
        return super.log(message, ...optionalParams);
    }
    /**
     * Write a 'warn' level log.
     * @param {string|BaseMessage} message Message format compliants to FisApp
     * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    warn(message, ...optionalParams) {
        if (optionalParams['tags']) {
            optionalParams['tags'].push('warn');
        }
        // Add the message to log
        this.addToLog(message, optionalParams['tags']);
        return super.log(message, ...optionalParams);
    }
};
LoggingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [String])
], LoggingService);
exports.LoggingService = LoggingService;
//# sourceMappingURL=logging.service.js.map