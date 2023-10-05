"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestMessage = exports.AppRequestMessage = void 0;
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppRequestMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Request;
    }
    createMessage(messageParameter) {
        try {
            this.requestMessage = {};
            return this.requestMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppRequestMessage = AppRequestMessage;
function createRequestMessage(messageParameter) {
    try {
        return new AppRequestMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createRequestMessage = createRequestMessage;
//# sourceMappingURL=apprequestmessage.js.map