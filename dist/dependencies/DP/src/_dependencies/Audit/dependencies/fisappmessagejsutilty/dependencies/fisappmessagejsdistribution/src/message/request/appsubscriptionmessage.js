"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionMessage = exports.appsubscriptionmessage = void 0;
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class appsubscriptionmessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Subscription;
    }
    createMessage(messageParameter) {
        try {
            this.subscriptionMessage = {};
            return this.subscriptionMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.appsubscriptionmessage = appsubscriptionmessage;
function createSubscriptionMessage(messageParameter) {
    try {
        return new appsubscriptionmessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createSubscriptionMessage = createSubscriptionMessage;
//# sourceMappingURL=appsubscriptionmessage.js.map