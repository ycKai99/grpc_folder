"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseExceptionMessage = exports.appresponseexceptionmessage = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class appresponseexceptionmessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseException;
    }
    createMessage(messageParameter) {
        try {
            this.responseExceptionMessage = {};
            return this.responseExceptionMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.appresponseexceptionmessage = appresponseexceptionmessage;
function createResponseExceptionMessage(messageParameter) {
    try {
        return new appresponseexceptionmessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseExceptionMessage = createResponseExceptionMessage;
//# sourceMappingURL=appresponseexceptionmessage.js.map