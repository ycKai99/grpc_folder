"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseSummaryMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
/**
 * App response summary message header.
 *
 * @class AppResponseSummaryMessageHeader
 */
class AppResponseSummaryMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app response summary message header.
     *
     * @class AppResponseSummaryMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        // App message base header type is Response.
        this.messageBaseHeaderType = appresponsemessagetype_1.AppMessageType.Response;
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseSummary;
    }
    /**
     * Create new response summary header.
     *
     * @class AppResponseSummaryMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseMessageHeader} - New response summary header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppResponseSummaryMessageHeader = AppResponseSummaryMessageHeader;
//# sourceMappingURL=appresponsesummarymessageheader.js.map