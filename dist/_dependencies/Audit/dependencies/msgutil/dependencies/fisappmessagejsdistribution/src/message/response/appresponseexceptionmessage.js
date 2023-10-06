"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseExceptionMessage = exports.appresponseexceptionmessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App response exception message.
 *
 * @class appresponseexceptionmessage
 */
class appresponseexceptionmessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app response exception message.
     *
     * @class appresponseexceptionmessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseException;
    }
    /**
     * Create new response exception message.
     *
     * @class appresponseexceptionmessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseExceptionMessage} - New response exception message.
     */
    createMessage(messageParameter) {
        try {
            this.responseExceptionMessage = {};
            return this.responseExceptionMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.appresponseexceptionmessage = appresponseexceptionmessage;
/**
 * Create new App response exception message.
 *
 * @function createResponseExceptionMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response exception message.
 */
function createResponseExceptionMessage(messageParameter) {
    try {
        return new appresponseexceptionmessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseExceptionMessage = createResponseExceptionMessage;
//# sourceMappingURL=appresponseexceptionmessage.js.map