"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseMessage = exports.AppResponseMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App response message.
 *
 * @class AppResponseMessage
 */
class AppResponseMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app response message.
     *
     * @class AppResponseMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.Response;
    }
    /**
     * Create new response message.
     *
     * @class AppResponseMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseMessage} - New response message.
     */
    createMessage(messageParameter) {
        try {
            this.responseMessage = {};
            return this.responseMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseMessage = AppResponseMessage;
/**
 * Create new App response message.
 *
 * @function createResponseMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response message.
 */
function createResponseMessage(messageParameter) {
    try {
        return new AppResponseMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseMessage = createResponseMessage;
//# sourceMappingURL=appresponsemessage.js.map