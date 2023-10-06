"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageKind = void 0;
const appmessagevalidation_1 = require("./appmessagevalidation");
const appmessageheadercreator_1 = require("../appmessageheadercreator");
/**
 * Abstract App message kind.
 *
 * @class AppMessageKind
 */
class AppMessageKind {
    /**
     * Create new app message.
     *
     * @class AppMessageKind
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message header options.
     */
    constructor(options) {
        if (options) {
            this.options = options;
        }
    }
    /**
    * Create new app message.
    *
    * @class AppMessageKind
    * @method create
    * @param messageParameter {MessageParameter} - Message parameters.
    * @return {Message} - New app message.
    */
    create(messageParameter) {
        try {
            if (!this.messageType) {
                throw "Message tyeps is not set(undefined).";
            }
            this.message = this.createMessage(messageParameter);
            if (!this.message) {
                throw "Message is undefined or null.";
            }
            this.message.header = appmessageheadercreator_1.createMessageHeader(messageParameter, this.options);
            this.message.data = this.createData(messageParameter);
            this.validate(this.message);
            this.validateData(this.message.data);
            return this.message;
        }
        catch (e) {
            throw this.messageType + " Message is not valid. " + e;
        }
    }
    /**
     * Validate app message.
     *
     * @class AppMessageKind
     * @method validate
     * @param message {Message} - Message.
     * @return {boolean} - True = success, false = error.
     */
    validate(message) {
        try {
            return appmessagevalidation_1.validateMessage(message);
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Validate app message data.
     * Default is any data
     *
     * @class AppMessageKind
     * @method validateData
     * @param data {unknown} - Message data.
     * @return {boolean} - True = success, false = error.
     */
    validateData(data) {
        try {
            return appmessagevalidation_1.validateMessageData(data);
        }
        catch (e) {
            throw e;
        }
    }
    /**
    * Create message data.
    *
    * @class AppMessageKind
    * @method createData
    * @param  messageParameter {MessageParameter} - Message parameters
    * @return {unknown} - Data.
    */
    createData(messageParameter) {
        return (messageParameter &&
            messageParameter.hasOwnProperty("data")) ?
            messageParameter.data : {};
    }
}
exports.AppMessageKind = AppMessageKind;
//# sourceMappingURL=appmessagekind.js.map