"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseDataMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
/**
 * App response data message header.
 *
 * @class AppResponseDataMessageHeader
 */
class AppResponseDataMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app response data message header.
     *
     * @class AppResponseDataMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        // App message base header type is Response.
        this.messageBaseHeaderType = appresponsemessagetype_1.AppMessageType.Response;
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseData;
    }
    /**
     * Create new response data header.
     *
     * @class AppResponseDataMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {GenericHeader} - New response data header.
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
exports.AppResponseDataMessageHeader = AppResponseDataMessageHeader;
//# sourceMappingURL=appresponsedatamessageheader.js.map