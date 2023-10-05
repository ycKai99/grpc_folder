"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseSummaryMessage = exports.AppResponseSummaryMessage = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppResponseSummaryMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseSummary;
    }
    createMessage(messageParameter) {
        try {
            this.responseSummaryMessage = {};
            return this.responseSummaryMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseSummaryMessage = AppResponseSummaryMessage;
function createResponseSummaryMessage(messageParameter) {
    try {
        return new AppResponseSummaryMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseSummaryMessage = createResponseSummaryMessage;
//# sourceMappingURL=appresponsesummarymessage.js.map