"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
const appresponsemessagevalidation_1 = require("./appresponsemessagevalidation");
/**
 * App response message header.
 *
 * @class AppResponseMessageHeader
 */
class AppResponseMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app response message header.
     *
     * @class AppResponseMessageHeader
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        /**
         * Respond to message validator.
         *
         * @class AppResponseMessageHeader
         * @property respondToMessageValidator
         * @type {Function}
         */
        this.respondToMessageValidator = appresponsemessagevalidation_1.validateRespondToMessage;
        /**
         * Permissible respond to message types.
         *
         * @class AppResponseMessageHeader
         * @property permissibleRespondToMessageType
         * @type {object}
         */
        this.permissibleRespondToMessageType = appresponsemessagetype_1.RespondToMessageType;
        this.messageType = appresponsemessagetype_1.AppMessageType.Response;
        if (options && options.permissibleRespondToMessageType) {
            this.permissibleRespondToMessageType = options.permissibleRespondToMessageType; //options.permissibleMessageType;
        }
    }
    /**
     * Create new response header.
     *
     * @class AppResponseMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseMessageHeader} - New response header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            header.requestMessageRespondTo = (messageParameter &&
                messageParameter.requestMessageRespondTo);
            return header;
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Validate app message.
     *
     * @class AppResponseMessageHeader
     * @method validate
     * @param header {Header} - Message header.
     * @return {boolean} - True = success, false = error.
     */
    validate(header) {
        let responseHeader = header;
        try {
            super.validate(header);
            this.respondToMessageValidator(responseHeader.requestMessageRespondTo, this.permissibleMessageType, this.permissibleRespondToMessageType);
        }
        catch (e) {
            throw e;
        }
        return true;
    }
}
exports.AppResponseMessageHeader = AppResponseMessageHeader;
//# sourceMappingURL=appresponsemessageheader.js.map