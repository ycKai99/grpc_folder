"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageHeaderBase = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessagevalidation_1 = require("./appmessagevalidation");
const appmessageproducercreator_1 = require("../producer/appmessageproducercreator");
const appmessagesecurity_1 = require("../security/appmessagesecurity");
const appmessagedatalocation_1 = require("./appmessagedatalocation");
const appmessageformat_1 = require("./appmessageformat");
const idgenerator_1 = require("../../utils/idgenerator");
class AppMessageHeaderBase {
    constructor(options) {
        this.headerValidator = appmessagevalidation_1.validateMessageHeader;
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
    create(messageParameter) {
        try {
            this.header = this.createHeader(messageParameter);
            this.header.messageProducerInformation = (0, appmessageproducercreator_1.createProducerInformation)(messageParameter);
            this.header.security = (0, appmessagesecurity_1.createSecurity)(messageParameter);
            this.header.messageDataLocation = (0, appmessagedatalocation_1.createDataLocation)(messageParameter);
            this.header.messageDataFormat = (0, appmessageformat_1.createMessageFormat)(messageParameter);
            this.validate(this.header);
            return this.header;
        }
        catch (e) {
            throw this.messageType + " Message Header is not valid. " + e;
        }
    }
    ;
    validate(header) {
        try {
            return this.headerValidator(header, this.permissibleMessageType);
        }
        catch (e) {
            throw e;
        }
    }
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
    generateId() {
        try {
            return (0, idgenerator_1.generateNewId)(idgenerator_1.Uuid);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageHeaderBase = AppMessageHeaderBase;
//# sourceMappingURL=appmessageheaderbase.js.map