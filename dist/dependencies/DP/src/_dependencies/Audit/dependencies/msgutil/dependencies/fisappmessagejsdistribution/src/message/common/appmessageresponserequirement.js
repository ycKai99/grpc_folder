"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageResponseRequirement = exports.AppMessageResponseRequirement = exports.validate = void 0;
const appmessagedeliverymode_1 = require("./appmessagedeliverymode");
const appmessageformat_1 = require("./appmessageformat");
const appmessagedatalocation_1 = require("./appmessagedatalocation");
const clone = require("rfdc");
function validate(responseRequirement) {
    try {
    }
    catch (e) {
        throw e;
    }
    return true;
}
exports.validate = validate;
class AppMessageResponseRequirement {
    create(messageParameter) {
        try {
            if (messageParameter && messageParameter.responseRequirement) {
                let tempMessageParameter = clone()(messageParameter);
                this.responseRequirement = {};
                if (messageParameter.responseRequirement.responseDeliveryMode) {
                    tempMessageParameter.deliveryMode = messageParameter.responseRequirement.responseDeliveryMode;
                    this.responseRequirement.responseDeliveryMode = (0, appmessagedeliverymode_1.createMessageDeliveryMode)(tempMessageParameter);
                }
                if (messageParameter.responseRequirement.externalResponseLocation) {
                    tempMessageParameter.dataLocation = messageParameter.responseRequirement.externalResponseLocation;
                    this.responseRequirement.externalResponseLocation = (0, appmessagedatalocation_1.createDataLocation)(tempMessageParameter);
                }
                if (messageParameter.responseRequirement.responseDataFormat) {
                    tempMessageParameter.dataFormat = messageParameter.responseRequirement.responseDataFormat;
                    this.responseRequirement.responseDataFormat = (0, appmessageformat_1.createMessageFormat)(tempMessageParameter);
                }
            }
            validate(this.responseRequirement);
            return this.responseRequirement;
        }
        catch (e) {
            throw "Message response requirement is not valid.\n" + e;
        }
    }
}
exports.AppMessageResponseRequirement = AppMessageResponseRequirement;
function createMessageResponseRequirement(messageParameter) {
    try {
        return new AppMessageResponseRequirement().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessageResponseRequirement = createMessageResponseRequirement;
//# sourceMappingURL=appmessageresponserequirement.js.map