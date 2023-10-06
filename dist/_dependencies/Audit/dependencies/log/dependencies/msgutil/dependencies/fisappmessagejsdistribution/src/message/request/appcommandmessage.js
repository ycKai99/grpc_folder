"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommandMessage = exports.AppCommandMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App command message.
 *
 * @class AppCommandMessage
 */
class AppCommandMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app command message.
     *
     * @class AppCommandMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Command;
    }
    /**
     * Create new command message.
     *
     * @class AppCommandMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {CommandMessage} - New command message.
     */
    createMessage(messageParameter) {
        try {
            this.commandMessage = {};
            return this.commandMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppCommandMessage = AppCommandMessage;
/**
 * Create new App command message.
 *
 * @function createCommandMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App command message.
 */
function createCommandMessage(messageParameter) {
    try {
        return new AppCommandMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createCommandMessage = createCommandMessage;
//# sourceMappingURL=appcommandmessage.js.map