"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppQueryMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
/**
 * App query message header.
 *
 * @class AppQueryMessageHeader
 */
class AppQueryMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app query message header.
     *
     * @class AppQueryMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        // App message base header type is Request.
        this.messageBaseHeaderType = apprequestmessagetype_1.AppMessageType.Request;
        this.messageType = apprequestmessagetype_1.AppMessageType.Query;
    }
    /**
     * Create new query header.
     *
     * @class AppQueryMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {QueryMessageHeader} - New query header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            header.query = (messageParameter && messageParameter.query) ||
                apprequestmessagetype_1.Query.General; // Default is General
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppQueryMessageHeader = AppQueryMessageHeader;
//# sourceMappingURL=appquerymessageheader.js.map