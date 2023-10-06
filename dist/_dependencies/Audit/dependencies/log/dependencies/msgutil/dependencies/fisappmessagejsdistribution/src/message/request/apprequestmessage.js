"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestMessage = exports.AppRequestMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App request message.
 *
 * @class AppRequestMessage
 */
class AppRequestMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app request message.
     *
     * @class AppRequestMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Request;
    }
    /**
     * Create new request message.
     *
     * @class AppRequestMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {RequestMessage} - New request message.
     */
    createMessage(messageParameter) {
        try {
            this.requestMessage = {};
            return this.requestMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppRequestMessage = AppRequestMessage;
/**
 * Create new App request message.
 *
 * @function createRequestMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App request message.
 */
function createRequestMessage(messageParameter) {
    try {
        return new AppRequestMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createRequestMessage = createRequestMessage;
//# sourceMappingURL=apprequestmessage.js.map