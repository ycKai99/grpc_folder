"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppQueryMessageHeader = void 0;
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
class AppQueryMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageBaseHeaderType = apprequestmessagetype_1.AppMessageType.Request;
        this.messageType = apprequestmessagetype_1.AppMessageType.Query;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            header.query = (messageParameter && messageParameter.query) ||
                apprequestmessagetype_1.Query.General;
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppQueryMessageHeader = AppQueryMessageHeader;
//# sourceMappingURL=appquerymessageheader.js.map