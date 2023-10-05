"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseStatusMessageHeader = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
class AppResponseStatusMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageBaseHeaderType = appresponsemessagetype_1.AppMessageType.Response;
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseStatus;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            header.responseStatus = (messageParameter &&
                messageParameter.responseStatus) || appresponsemessagetype_1.ResponseStatus.AcknowledgeReceived;
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseStatusMessageHeader = AppResponseStatusMessageHeader;
//# sourceMappingURL=appresponsestatusmessageheader.js.map