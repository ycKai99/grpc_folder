"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryMessage = exports.AppQueryMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App query message.
 *
 * @class AppQueryMessage
 */
class AppQueryMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app query message.
     *
     * @class AppQueryMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Query;
    }
    /**
     * Create new query message.
     *
     * @class AppQueryMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {QueryMessage} - New query message.
     */
    createMessage(messageParameter) {
        try {
            this.queryMessage = {};
            return this.queryMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppQueryMessage = AppQueryMessage;
/**
 * Create new App query message.
 *
 * @function createQueryMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App query message.
 */
function createQueryMessage(messageParameter) {
    try {
        return new AppQueryMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createQueryMessage = createQueryMessage;
//# sourceMappingURL=appquerymessage.js.map