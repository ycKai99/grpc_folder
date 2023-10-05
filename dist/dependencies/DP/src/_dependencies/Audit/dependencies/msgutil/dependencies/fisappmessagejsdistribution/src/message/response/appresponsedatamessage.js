"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseDataMessage = exports.AppResponseDataMessage = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppResponseDataMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseData;
    }
    createMessage(messageParameter) {
        try {
            this.responseDataMessage = {};
            return this.responseDataMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseDataMessage = AppResponseDataMessage;
function createResponseDataMessage(messageParameter) {
    try {
        return new AppResponseDataMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseDataMessage = createResponseDataMessage;
//# sourceMappingURL=appresponsedatamessage.js.map