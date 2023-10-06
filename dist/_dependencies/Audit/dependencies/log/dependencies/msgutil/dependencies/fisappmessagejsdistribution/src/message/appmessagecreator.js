"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.AppMessageCreator = void 0;
const Messages = require("./messages");
/**
 * App message creator.
 *
 * @class AppMessageCreator
 */
class AppMessageCreator {
    /**
     * Initialise message creator.
     *
     * @class AppMessageCreator
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
        if (this.__initialised) {
        }
        else {
            // 20201228 -Fixed Angular Webpack not support dynamic require
            // Load additional message modules
            // Angular Webpack does not suipport require using string based variable
            // Cause Module not found.
            // this.messages = {
            //     ...Messages,
            //     ...load(Config.messageModule()) as object
            // };
            this.messages = Object.assign({}, Messages);
            this.__initialised = true;
            // End 20201228 -Fixed Angular Webpack not support dynamic require
        }
        return true;
    }
    /**
     * Create new message instance.
     *
     * @class AppMessageCreator
     * @method new
     * @param alias {MessageType, } -  Message class alias name.
     * @param options {any} - Message options.
     * @return {AppMessage} - App message instance.
     */
    static new(alias, options) {
        try {
            this.initialise(); // 20201228 -Fixed Angular Webpack not support dynamic require
            return new this.messages[alias](options);
        }
        catch (e) {
            throw "Message alias name '" + alias + "' not found.\n" + e;
        }
    }
    /**
     * Create new message.
     *
     * @class AppMessageCreator
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @param options {any} - Message options.
     * @return {Message} - Message.
     */
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
/**
 * Create new app message.
 *
 * @function createMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @param options {any} - Message options.
 * @return {Message} - New app message.
 */
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