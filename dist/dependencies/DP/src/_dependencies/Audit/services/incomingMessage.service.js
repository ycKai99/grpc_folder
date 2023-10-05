"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingMessageService = void 0;
const rxjs_1 = require("rxjs");
const export_1 = require("../dependencies/log/interface/export");
const export_2 = require("../dependencies/msgutil/interface/export");
class IncomingMessageService {
    constructor(logService) {
        this.logService = logService;
        this.settings = {
            storage: '',
            setting: {
                appId: '',
                appName: '',
                logLocName: '',
                logLocId: '',
                appLogLocId: '',
                appLocName: '',
                appLogId: ''
            },
            incomingObservable: null
        };
        this.logService = new export_1.LoggingService();
    }
    init(settings) {
        let newSetting = settings;
        newSetting.setting = Object.assign(Object.assign(Object.assign({}, this.settings.setting), settings.setting), { customSetting: Object.assign(Object.assign({}, this.settings.customSetting), settings.customSetting) });
        this.settings = newSetting;
        let transformedOBS = settings.incomingObservable.pipe((0, rxjs_1.map)(message => {
            let finalResponse = {
                appLogLocId: new export_2.Uuid().generateId(),
                appData: {
                    msgId: message.header.messageID || new export_2.Uuid().generateId(),
                    msgLogDateTime: new Date(),
                    msgDateTime: new Date(),
                    msgTag: ['Incoming'],
                    msgPayload: JSON.stringify(message)
                }
            };
            return finalResponse;
        }));
        this.logService.init(this.settings).then(() => {
            this.logService.subscribe(transformedOBS);
        }).catch((e) => console.error(e));
    }
}
exports.IncomingMessageService = IncomingMessageService;
//# sourceMappingURL=incomingMessage.service.js.map