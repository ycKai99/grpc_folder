"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appresponseexceptionmessageheader = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
class appresponseexceptionmessageheader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageBaseHeaderType = appresponsemessagetype_1.AppMessageType.Response;
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseException;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            header.exception = {};
            header.exception.exceptionType = (messageParameter &&
                messageParameter.responseException) || appresponsemessagetype_1.ExceptionType.InvalidRequest;
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.appresponseexceptionmessageheader = appresponseexceptionmessageheader;
//# sourceMappingURL=appresponseexceptionmessageheader.js.map