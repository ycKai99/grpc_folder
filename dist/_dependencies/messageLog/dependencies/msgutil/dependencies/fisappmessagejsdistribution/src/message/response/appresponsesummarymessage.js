"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseSummaryMessage = exports.AppResponseSummaryMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App response summary message.
 *
 * @class AppResponseSummaryMessage
 */
class AppResponseSummaryMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app response summary message.
     *
     * @class AppResponseSummaryMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseSummary;
    }
    /**
     * Create new response summary message.
     *
     * @class AppResponseSummaryMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseSummaryMessage} - New response summary message.
     */
    createMessage(messageParameter) {
        try {
            this.responseSummaryMessage = {};
            return this.responseSummaryMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseSummaryMessage = AppResponseSummaryMessage;
/**
 * Create new App response summary message.
 *
 * @function createResponseSummaryMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response summary message.
 */
function createResponseSummaryMessage(messageParameter) {
    try {
        return new AppResponseSummaryMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createResponseSummaryMessage = createResponseSummaryMessage;
//# sourceMappingURL=appresponsesummarymessage.js.map