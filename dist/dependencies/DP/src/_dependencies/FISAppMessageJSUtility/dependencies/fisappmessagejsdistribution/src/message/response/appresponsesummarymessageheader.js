"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseSummaryMessageHeader = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
class AppResponseSummaryMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageBaseHeaderType = appresponsemessagetype_1.AppMessageType.Response;
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseSummary;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseSummaryMessageHeader = AppResponseSummaryMessageHeader;
//# sourceMappingURL=appresponsesummarymessageheader.js.map