"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageHeaderKind = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessagevalidation_1 = require("./appmessagevalidation");
const appmessageheadercreator_1 = require("../appmessageheadercreator");
const clone = require("rfdc");
class AppMessageHeaderKind {
    constructor(options) {
        this.headerValidator = appmessagevalidation_1.validateMessageHeader;
        this.permissibleMessageType = appmessagetype_1.AppMessageType;
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
    create(messageParameter) {
        try {
            let baseMessageParameter;
            if (!messageParameter) {
                messageParameter = {};
            }
            ;
            messageParameter.messageType = this.messageType;
            baseMessageParameter = clone()(messageParameter);
            baseMessageParameter.messageType = this.messageBaseHeaderType;
            this.header = Object.assign(Object.assign({}, (0, appmessageheadercreator_1.createMessageHeader)(baseMessageParameter, this.options)), this.createHeader(messageParameter));
            this.header.messageType = this.messageType;
            this.validate(this.header);
            return this.header;
        }
        catch (e) {
            throw this.messageType + " Message Header is not valid.\n" + e;
        }
    }
    validate(header) {
        try {
            this.headerValidator(header, this.permissibleMessageType);
            return (0, appmessagevalidation_1.validateHeader)(header, this.messageType);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageHeaderKind = AppMessageHeaderKind;
//# sourceMappingURL=appmessageheaderkind.js.map