"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseStatusMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
/**
 * App response status message header.
 *
 * @class AppResponseStatusMessageHeader
 */
class AppResponseStatusMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app response status message header.
     *
     * @class AppResponseStatusMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        // App message base header type is Response.
        this.messageBaseHeaderType = appresponsemessagetype_1.AppMessageType.Response;
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseStatus;
    }
    /**
     * Create new response status header.
     *
     * @class AppResponseStatusMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseStatusMessageHeader} - New response status header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            header.responseStatus = (messageParameter &&
                messageParameter.responseStatus) || appresponsemessagetype_1.ResponseStatus.AcknowledgeReceived;
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseStatusMessageHeader = AppResponseStatusMessageHeader;
//# sourceMappingURL=appresponsestatusmessageheader.js.map