"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseDataMessage = exports.AppResponseDataMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App response data message.
 *
 * @class AppResponseDataMessage
 */
class AppResponseDataMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app response data message.
     *
     * @class AppResponseDataMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseData;
    }
    /**
     * Create new response data message.
     *
     * @class AppResponseDataMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseDataMessage} - New response data message.
     */
    createMessage(messageParameter) {
        try {
            this.responseDataMessage = {};
            return this.responseDataMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseDataMessage = AppResponseDataMessage;
/**
 * Create new App response data message.
 *
 * @function createResponseDataMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response data message.
 */
function createResponseDataMessage(messageParameter) {
    try {
        return new AppResponseDataMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseDataMessage = createResponseDataMessage;
//# sourceMappingURL=appresponsedatamessage.js.map