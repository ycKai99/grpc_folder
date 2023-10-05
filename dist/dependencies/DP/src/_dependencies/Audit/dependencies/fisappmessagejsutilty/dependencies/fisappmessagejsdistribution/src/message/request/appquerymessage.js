"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryMessage = exports.AppQueryMessage = void 0;
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppQueryMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Query;
    }
    createMessage(messageParameter) {
        try {
            this.queryMessage = {};
            return this.queryMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppQueryMessage = AppQueryMessage;
function createQueryMessage(messageParameter) {
    try {
        return new AppQueryMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createQueryMessage = createQueryMessage;
//# sourceMappingURL=appquerymessage.js.map