"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcknowledgementService = void 0;
const rxjs_1 = require("rxjs");
const export_1 = require("../dependencies/log/interface/export");
const export_2 = require("../dependencies/log/dependencies/msgutil/interface/export");
/**
 * @deprecated The acknowledgement will be covered by MessageAuditorService.
 */
class AcknowledgementService {
    constructor(logService) {
        this.logService = logService;
        this.messageUtil = new export_2.FisCreateMessageUtility("FisAppID/Name");
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
            }
        };
        this.logService = new export_1.LoggingService();
    }
    async init(settings) {
        let logSetting = Object.assign(Object.assign({}, settings), { setting: Object.assign(Object.assign({}, settings.setting), { logLocName: "locationName2", appLocName: "appLocName2" }) });
        this.settings = logSetting;
        this.logService.init(logSetting);
    }
    subscribe(obs) {
        let acknowledgementToken = obs.pipe(rxjs_1.map(incoming_msg => {
            let emulatedId = "GeneratedFromMessageSync";
            let emulatedRequest = this.messageUtil.getCommandMessage(emulatedId, export_2.Command.New, incoming_msg);
            let finalResponse = this.messageUtil.getResponseMessage(emulatedId, { "Acknowledgement": 1 }, emulatedRequest);
            return finalResponse;
        }));
        let acknowledgementTokenLogging = obs.pipe(rxjs_1.map(incoming_msg => {
            let finalResponse = {
                appLogLocId: new export_2.Uuid().generateId(),
                appData: {
                    msgId: incoming_msg.header.messageID || new export_2.Uuid().generateId(),
                    msgLogDateTime: new Date(),
                    msgDateTime: new Date(),
                    msgTag: ['Acknowledgement'],
                    msgPayload: JSON.stringify(incoming_msg)
                }
            };
            return finalResponse;
        }));
        this.logService.subscribe(acknowledgementTokenLogging);
        return acknowledgementToken;
    }
}
exports.AcknowledgementService = AcknowledgementService;
//# sourceMappingURL=acknowledgement.service.js.map