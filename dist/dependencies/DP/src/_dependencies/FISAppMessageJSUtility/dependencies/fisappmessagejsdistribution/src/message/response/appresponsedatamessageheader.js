"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseDataMessageHeader = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
class AppResponseDataMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageBaseHeaderType = appresponsemessagetype_1.AppMessageType.Response;
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseData;
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
exports.AppResponseDataMessageHeader = AppResponseDataMessageHeader;
//# sourceMappingURL=appresponsedatamessageheader.js.map