"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommandMessage = exports.AppCommandMessage = void 0;
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppCommandMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Command;
    }
    createMessage(messageParameter) {
        try {
            this.commandMessage = {};
            return this.commandMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppCommandMessage = AppCommandMessage;
function createCommandMessage(messageParameter) {
    try {
        return new AppCommandMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createCommandMessage = createCommandMessage;
//# sourceMappingURL=appcommandmessage.js.map