"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageKind = void 0;
const appmessagevalidation_1 = require("./appmessagevalidation");
const appmessageheadercreator_1 = require("../appmessageheadercreator");
class AppMessageKind {
    constructor(options) {
        if (options) {
            this.options = options;
        }
    }
    create(messageParameter) {
        try {
            if (!this.messageType) {
                throw "Message tyeps is not set(undefined).";
            }
            this.message = this.createMessage(messageParameter);
            if (!this.message) {
                throw "Message is undefined or null.";
            }
            this.message.header = (0, appmessageheadercreator_1.createMessageHeader)(messageParameter, this.options);
            this.message.data = this.createData(messageParameter);
            this.validate(this.message);
            this.validateData(this.message.data);
            return this.message;
        }
        catch (e) {
            throw this.messageType + " Message is not valid. " + e;
        }
    }
    validate(message) {
        try {
            return (0, appmessagevalidation_1.validateMessage)(message);
        }
        catch (e) {
            throw e;
        }
    }
    validateData(data) {
        try {
            return (0, appmessagevalidation_1.validateMessageData)(data);
        }
        catch (e) {
            throw e;
        }
    }
    createData(messageParameter) {
        return (messageParameter &&
            messageParameter.hasOwnProperty("data")) ?
            messageParameter.data : {};
    }
}
exports.AppMessageKind = AppMessageKind;
//# sourceMappingURL=appmessagekind.js.map