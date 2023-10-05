"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseStatusMessage = exports.AppResponseStatusMessage = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppResponseStatusMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseStatus;
    }
    createMessage(messageParameter) {
        try {
            this.responseStatusMessage = {};
            return this.responseStatusMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseStatusMessage = AppResponseStatusMessage;
function createResponseStatusMessage(messageParameter) {
    try {
        return new AppResponseStatusMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseStatusMessage = createResponseStatusMessage;
//# sourceMappingURL=appresponsestatusmessage.js.map