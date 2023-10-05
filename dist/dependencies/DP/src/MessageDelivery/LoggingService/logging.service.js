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
const export_1 = require("../../_dependencies/FISAppMessageJSUtility/interface/export");
let LoggingService = class LoggingService extends common_1.ConsoleLogger {
    constructor(context) {
        super(context);
        this.isLogAllMessages = true;
        this.uuidgenerator = new export_1.Uuid();
        this.buffer = [];
        this.defaultDataTags = ['Standard Tag For Logging'];
        this.init({
            storage: process.env.storage || 'File',
        });
        if (context > '') {
            this.overrideDefaultTags([context]);
        }
        return this;
    }
    setLogAll(logAll) {
        this.isLogAllMessages = logAll;
    }
    overrideDefaultTags(tags) {
        this.defaultDataTags = tags;
    }
    appendDefaultTags(tags) {
        this.defaultDataTags = this.defaultDataTags.concat(tags);
    }
    intercept(context, next) {
        let req = context.switchToHttp().getRequest();
        this.addToLog(req, ['request']);
        let handledObservable = next.handle();
        this.subscribeToLog(handledObservable, ['response']);
        return handledObservable;
    }
    subscribeToLog(newObservable, dataTags = []) {
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
    addToLog(message, dataTags = []) {
        let isAddToDefaultLog = true;
        let key = '';
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
        if (key > '') {
        }
        else {
            key = this.uuidgenerator.generateId();
        }
        if (isAddToDefaultLog) {
            let messageData = message;
            while (messageData['data']) {
                messageData = messageData['data'];
            }
            let tags = [];
            if (this.defaultDataTags && this.defaultDataTags.length > 0) {
                tags = tags.concat(this.defaultDataTags);
            }
            if (dataTags && dataTags.length > 0) {
                tags = tags.concat(dataTags);
            }
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
    checkExisted(key) {
        let returnBool = false;
        this.buffer.forEach((log) => {
            if (log.id == key || returnBool == true) {
                returnBool = true;
            }
        });
        return returnBool;
    }
    getLogs() {
        return this.buffer;
    }
    init(settings) {
        this.settings = settings;
    }
    findLogs(search) {
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
    log(message, ...optionalParams) {
        if (optionalParams['tags']) {
            optionalParams['tags'].push('log');
        }
        this.addToLog(message, optionalParams['tags']);
        return super.log(message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        if (optionalParams['tags']) {
            optionalParams['tags'].push('error');
        }
        this.addToLog(message, optionalParams['tags']);
        return super.log(message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        if (optionalParams['tags']) {
            optionalParams['tags'].push('warn');
        }
        this.addToLog(message, optionalParams['tags']);
        return super.log(message, ...optionalParams);
    }
};
LoggingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], LoggingService);
exports.LoggingService = LoggingService;
//# sourceMappingURL=logging.service.js.map