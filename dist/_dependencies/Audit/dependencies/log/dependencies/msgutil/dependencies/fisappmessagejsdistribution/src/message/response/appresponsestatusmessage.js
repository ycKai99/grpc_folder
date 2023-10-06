"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseStatusMessage = exports.AppResponseStatusMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App response status message.
 *
 * @class AppResponseStatusMessage
 */
class AppResponseStatusMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app response status message.
     *
     * @class AppResponseStatusMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseStatus;
    }
    /**
     * Create new response status message.
     *
     * @class AppResponseStatusMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseStatusMessage} - New response status message.
     */
    createMessage(messageParameter) {
        try {
            this.responseStatusMessage = {};
            return this.responseStatusMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseStatusMessage = AppResponseStatusMessage;
/**
 * Create new App response status message.
 *
 * @function createResponseStatusMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response status message.
 */
function createResponseStatusMessage(messageParameter) {
    try {
        return new AppResponseStatusMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseStatusMessage = createResponseStatusMessage;
//# sourceMappingURL=appresponsestatusmessage.js.map