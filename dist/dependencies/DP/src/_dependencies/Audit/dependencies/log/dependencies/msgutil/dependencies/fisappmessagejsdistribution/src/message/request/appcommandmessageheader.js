"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommandMessageHeader = void 0;
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
class AppCommandMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageBaseHeaderType = apprequestmessagetype_1.AppMessageType.Request;
        this.messageType = apprequestmessagetype_1.AppMessageType.Command;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            header.command = (messageParameter && messageParameter.command);
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppCommandMessageHeader = AppCommandMessageHeader;
//# sourceMappingURL=appcommandmessageheader.js.map