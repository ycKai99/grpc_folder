"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageHeaderKind = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessagevalidation_1 = require("./appmessagevalidation");
const appmessageheadercreator_1 = require("../appmessageheadercreator");
const clone = require("rfdc");
/**
 * Abstract App message header.
 *
 * @class AppMessageHeaderKind
 */
class AppMessageHeaderKind {
    /**
     * Create new app message header.
     *
     * @class AppMessageHeaderKind
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message header options.
     */
    constructor(options) {
        /**
         * App Message Header validator.
         *
         * @class AppMessageHeaderKind
         * @property headerValidator
         * @type {Function}
         */
        this.headerValidator = appmessagevalidation_1.validateMessageHeader;
        /**
         * Permissible message types.
         *
         * @class AppMessageHeaderKind
         * @property permissibleMessageType
         * @type {object}
         */
        this.permissibleMessageType = appmessagetype_1.AppMessageType;
        // App message base header type. Default is Base
        this.messageBaseHeaderType = appmessagetype_1.AppMessageType.Base;
        if (options) {
            this.options = options;
        }
        if (this.options && this.options.validator) {
            this.headerValidator = this.options.validator;
        }
        if (this.options && this.options.permissibleMessageType) {
            this.permissibleMessageType = this.options.permissibleMessageType;
        }
    }
    /**
     * Create new app message header.
     *
     * @class AppMessageHeaderKind
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {Header} - App message header.
     */
    create(messageParameter) {
        try {
            let baseMessageParameter;
            if (!messageParameter) {
                messageParameter = {};
            }
            ;
            messageParameter.messageType = this.messageType;
            // baseMessageParameter = JSON.parse(JSON.stringify(messageParameter));//messageParameter   // deep copy;
            baseMessageParameter = clone()(messageParameter);
            baseMessageParameter.messageType = this.messageBaseHeaderType;
            this.header = Object.assign(Object.assign({}, appmessageheadercreator_1.createMessageHeader(baseMessageParameter, this.options)), this.createHeader(messageParameter));
            this.header.messageType = this.messageType;
            this.validate(this.header);
            return this.header;
        }
        catch (e) {
            throw this.messageType + " Message Header is not valid.\n" + e;
        }
    }
    /**
     * Validate app message.
     *
     * @class AppMessageHeaderKind
     * @method validate
     * @param header {Header} - Message header.
     * @return {boolean} - True = success, false = error.
     */
    validate(header) {
        try {
            this.headerValidator(header, this.permissibleMessageType);
            return appmessagevalidation_1.validateHeader(header, this.messageType);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageHeaderKind = AppMessageHeaderKind;
//# sourceMappingURL=appmessageheaderkind.js.map