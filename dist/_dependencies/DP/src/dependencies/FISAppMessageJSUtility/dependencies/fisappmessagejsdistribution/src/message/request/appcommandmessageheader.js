"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommandMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
/**
 * App command message header.
 *
 * @class AppCommandMessageHeader
 */
class AppCommandMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app command message header.
     *
     * @class AppCommandMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        // App message base header type is Request.
        this.messageBaseHeaderType = apprequestmessagetype_1.AppMessageType.Request;
        this.messageType = apprequestmessagetype_1.AppMessageType.Command;
    }
    /**
     * Create new command header.
     *
     * @class AppCommandMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {CommandMessageHeader} - New command header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            header.command = (messageParameter && messageParameter.command);
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppCommandMessageHeader = AppCommandMessageHeader;
//# sourceMappingURL=appcommandmessageheader.js.map