"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appsubscriptionmessageheader = void 0;
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
class appsubscriptionmessageheader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageBaseHeaderType = apprequestmessagetype_1.AppMessageType.Request;
        this.messageType = apprequestmessagetype_1.AppMessageType.Subscription;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            header.startSubscribingDateTime = this.dateToString(messageParameter &&
                messageParameter.startSubscribingDateTime);
            header.endSubscribingDateTime = this.dateToString(messageParameter &&
                messageParameter.endSubscribingDateTime);
            header.subscription = (messageParameter &&
                messageParameter.subscription) || apprequestmessagetype_1.Subscription.General;
            return header;
        }
        catch (e) {
            throw e;
        }
    }
    dateToString(date) {
        try {
            if (date) {
                return typeof date == "string" ? date :
                    (date instanceof Date && !isNaN(date.valueOf())) ?
                        date.toISOString() : undefined;
            }
        }
        catch (e) {
            throw e;
        }
        return undefined;
    }
}
exports.appsubscriptionmessageheader = appsubscriptionmessageheader;
//# sourceMappingURL=appsubscriptionmessageheader.js.map