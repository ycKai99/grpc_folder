"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageHeader = exports.AppMessageHeaderCreator = void 0;
const MessageHeaders = require("./messageheaders");
class AppMessageHeaderCreator {
    static initialise() {
        if (this.__initialised) {
        }
        else {
            this.messageHeaders = Object.assign({}, MessageHeaders);
            this.__initialised = true;
        }
        return true;
    }
    static new(alias, options) {
        try {
            this.initialise();
            return new this.messageHeaders[alias](options);
        }
        catch (e) {
            throw "Message header: Alias name '" + alias + "' not found.\n" + e;
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
exports.AppMessageHeaderCreator = AppMessageHeaderCreator;
function createMessageHeader(messageParameter, options) {
    try {
        return AppMessageHeaderCreator.create(messageParameter, options);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessageHeader = createMessageHeader;
//# sourceMappingURL=appmessageheadercreator.js.map