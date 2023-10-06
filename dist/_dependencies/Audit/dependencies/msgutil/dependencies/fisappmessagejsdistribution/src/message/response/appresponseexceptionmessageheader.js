"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appresponseexceptionmessageheader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
/**
 * App response exception message header.
 *
 * @class appresponseexceptionmessageheader
 */
class appresponseexceptionmessageheader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app response exception message header.
     *
     * @class appresponseexceptionmessageheader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        // App message base header type is Response.
        this.messageBaseHeaderType = appresponsemessagetype_1.AppMessageType.Response;
        this.messageType = appresponsemessagetype_1.AppMessageType.ResponseException;
    }
    /**
     * Create new response exception header.
     *
     * @class appresponseexceptionmessageheader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseExceptionMessageHeader} - New response exception header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            header.exception = {};
            header.exception.exceptionType = (messageParameter &&
                messageParameter.responseException) || appresponsemessagetype_1.ExceptionType.InvalidRequest;
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.appresponseexceptionmessageheader = appresponseexceptionmessageheader;
//# sourceMappingURL=appresponseexceptionmessageheader.js.map