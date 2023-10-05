"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseMessage = exports.AppResponseMessage = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppResponseMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.Response;
    }
    createMessage(messageParameter) {
        try {
            this.responseMessage = {};
            return this.responseMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseMessage = AppResponseMessage;
function createResponseMessage(messageParameter) {
    try {
        return new AppResponseMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseMessage = createResponseMessage;
//# sourceMappingURL=appresponsemessage.js.map