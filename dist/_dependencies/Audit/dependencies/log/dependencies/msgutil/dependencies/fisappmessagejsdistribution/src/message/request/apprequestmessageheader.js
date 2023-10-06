"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRequestMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
const appmessageresponserequirement_1 = require("../common/appmessageresponserequirement");
/**
 * App request message header.
 *
 * @class AppRequestMessageHeader
 */
class AppRequestMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app request message header.
     *
     * @class AppRequestMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Request;
    }
    /**
     * Create new request header.
     *
     * @class AppRequestMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {RequestMessageHeader} - New request header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            header.requestExecutionMode = (messageParameter && messageParameter.requestExecutionMode) || 0; // default is immediate
            header.responseRequirement = appmessageresponserequirement_1.createMessageResponseRequirement(messageParameter); // Response expected
            header.resquestTimeOut = (messageParameter && messageParameter.resquestTimeOut) || 0; // default no limit
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppRequestMessageHeader = AppRequestMessageHeader;
//# sourceMappingURL=apprequestmessageheader.js.map