"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.AppMessageCreator = void 0;
const Messages = require("./messages");
class AppMessageCreator {
    static initialise() {
        if (this.__initialised) {
        }
        else {
            this.messages = Object.assign({}, Messages);
            this.__initialised = true;
        }
        return true;
    }
    static new(alias, options) {
        try {
            this.initialise();
            return new this.messages[alias](options);
        }
        catch (e) {
            throw "Message alias name '" + alias + "' not found.\n" + e;
        }
    }
    static create(messageParameter, options) {
        try {
            return this.new((messageParameter && messageParameter.messageType), options).create(messageParameter);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageCreator = AppMessageCreator;
function createMessage(messageParameter, options) {
    try {
        return AppMessageCreator.create(messageParameter, options);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessage = createMessage;
//# sourceMappingURL=appmessagecreator.js.map