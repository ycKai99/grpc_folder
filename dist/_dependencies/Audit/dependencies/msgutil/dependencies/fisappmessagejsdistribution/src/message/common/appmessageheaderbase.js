"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageHeaderBase = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessagevalidation_1 = require("./appmessagevalidation");
const appmessageproducercreator_1 = require("../producer/appmessageproducercreator");
const appmessagesecurity_1 = require("../security/appmessagesecurity");
const appmessagedatalocation_1 = require("./appmessagedatalocation");
const appmessageformat_1 = require("./appmessageformat");
const idgenerator_1 = require("../../utils/idgenerator");
/**
 * App message common(base) header.
 *
 * @class AppMessageHeaderBase
 */
class AppMessageHeaderBase {
    /**
     * Create new app message base header.
     *
     * @class AppMessageHeaderBase
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message header options.
     */
    constructor(options) {
        /**
         * App Message common(base) Header validator.
         *
         * @class AppMessageHeaderBase
         * @property headerValidator
         * @type {Function}
         */
        this.headerValidator = appmessagevalidation_1.validateMessageHeader;
        /**
         * Permissible message types.
         *
         * @class AppMessageHeaderBase
         * @property permissibleMessageType
         * @type {object}
         */
        this.permissibleMessageType = appmessagetype_1.AppMessageType;
        this.messageType = appmessagetype_1.AppMessageType.Base;
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
     * Create new app message common(base) header.
     *
     * @class AppMessageHeaderBase
     * @method creates
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageHeader as Header} - App message header.
     */
    create(messageParameter) {
        try {
            this.header = this.createHeader(messageParameter);
            this.header.messageProducerInformation = appmessageproducercreator_1.createProducerInformation(messageParameter);
            this.header.security = appmessagesecurity_1.createSecurity(messageParameter);
            this.header.messageDataLocation = appmessagedatalocation_1.createDataLocation(messageParameter);
            this.header.messageDataFormat = appmessageformat_1.createMessageFormat(messageParameter);
            this.validate(this.header);
            return this.header;
        }
        catch (e) {
            throw this.messageType + " Message Header is not valid. " + e;
        }
    }
    ;
    /**
     * Validate app message header.
     *
     * @interface AppMessageHeaderBase
     * @method validate
     * @param header {MessageHeader} - Message header.
     * @return {boolean} - True = success, false = error.
     */
    validate(header) {
        try {
            return this.headerValidator(header, this.permissibleMessageType);
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Create new message common(base)header.
     *
     * @class AppMessageHeaderBase
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageHeader} - Message header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            header.messageType = (messageParameter && messageParameter.messageType) || this.messageType;
            header.messageID = this.generateId();
            header.messageName = (messageParameter && messageParameter.messageName) ||
                "App " + header.messageType + " Message";
            header.dateCreated = new Date().toISOString();
            header.isAggregate = (messageParameter && messageParameter.isAggregate) || false;
            header.dataSourceTiming = (messageParameter && messageParameter.dataSourceTiming) || "";
            header.serviceId = (messageParameter && messageParameter.serviceId) || "";
            header.userId = (messageParameter && messageParameter.userId) || "";
            header.requesterId = (messageParameter && messageParameter.requesterId) || ("Generated" + this.generateId());
            return header;
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Generate new message id.
     *
     * @class AppMessageHeaderBase
     * @method generateId
     * @param
     * @return {string} - New Id.
     */
    generateId() {
        try {
            return idgenerator_1.generateNewId(idgenerator_1.Uuid);
            // return new Uuid().generateId();
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageHeaderBase = AppMessageHeaderBase;
//# sourceMappingURL=appmessageheaderbase.js.map