"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRequestMessageHeader = void 0;
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
const appmessageresponserequirement_1 = require("../common/appmessageresponserequirement");
class AppRequestMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Request;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            header.requestExecutionMode = (messageParameter && messageParameter.requestExecutionMode) || 0;
            header.responseRequirement = (0, appmessageresponserequirement_1.createMessageResponseRequirement)(messageParameter);
            header.resquestTimeOut = (messageParameter && messageParameter.resquestTimeOut) || 0;
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppRequestMessageHeader = AppRequestMessageHeader;
//# sourceMappingURL=apprequestmessageheader.js.map