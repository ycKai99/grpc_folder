"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingMessageService = void 0;
const rxjs_1 = require("rxjs");
const export_1 = require("../dependencies/log/dependencies/msgutil/interface/export");
const export_2 = require("../dependencies/log/interface/export");
/**
 * @deprecated The logging is now supported by the Fis-Logging library.
 */
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
        this.logService = new export_2.LoggingService();
    }
    /* This function is mainful used for setting the log setting as well as transforming the messages
    into log messages and then storing them in the desiganted location of storage as specified. */
    init(settings) {
        // Restructuring the settings. I think they were some trouble doing this last time
        let newSetting = settings;
        newSetting.setting = Object.assign(Object.assign(Object.assign({}, this.settings.setting), settings.setting), { customSetting: Object.assign(Object.assign({}, this.settings.customSetting), settings.customSetting) });
        this.settings = newSetting; // Become stateful???
        // Transform incoming observables into Observable<MessageLog> to be logged
        let transformedOBS = settings.incomingObservable.pipe(rxjs_1.map(message => {
            let finalResponse = {
                appLogLocId: new export_1.Uuid().generateId(),
                appData: {
                    msgId: message.header.messageID || new export_1.Uuid().generateId(),
                    msgLogDateTime: new Date(),
                    msgDateTime: new Date(),
                    msgTag: ['Incoming'],
                    msgPayload: JSON.stringify(message)
                }
            };
            return finalResponse;
        }));
        // Once the messages has been transformed, then the logging can be executed
        this.logService.init(this.settings).then(() => {
            this.logService.subscribe(transformedOBS);
        }).catch((e) => console.error(e));
    }
}
exports.IncomingMessageService = IncomingMessageService;
//# sourceMappingURL=incomingMessage.service.js.map