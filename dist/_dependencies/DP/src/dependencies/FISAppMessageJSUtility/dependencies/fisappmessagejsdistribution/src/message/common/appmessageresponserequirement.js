"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageResponseRequirement = exports.AppMessageResponseRequirement = exports.validate = void 0;
const appmessagedeliverymode_1 = require("./appmessagedeliverymode");
const appmessageformat_1 = require("./appmessageformat");
const appmessagedatalocation_1 = require("./appmessagedatalocation");
const clone = require('rfdc'); //import * as clone from 'rfdc'; 
/**
 * Validate app message response requirement.
 *
 * @function validate
 * @param responseRequirement {ResponseRequirement} - Message response requirement.
 * @return {boolean} - True = success, false = error.
 */
function validate(responseRequirement) {
    try {
        // if (!responseRequirement) {
        //     throw "Message response requirement is undefined or null.";
        // }
        // else if (Object.keys(responseRequirement).length < 1) {
        //     throw "Message response requirement is empty.";
        // }
    }
    catch (e) {
        throw e;
    }
    return true;
}
exports.validate = validate;
/**
 * App message response requirement.
 *
 * @class AppMessageResponseRequirement
 */
class AppMessageResponseRequirement {
    /**
     * Create new message response requirement.
     * Client that request defines what sort of response expected.
     * App message response requirement details:
     *  (1) How message is to be delivered.
     *  (2) Message data format.
     *  (3) Message data location.
     *
     * @class AppMessageResponseRequirement
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseRequirement} - Message response requirement.
     */
    create(messageParameter) {
        try {
            if (messageParameter && messageParameter.responseRequirement) {
                // let tempMessageParameter: MessageParameter = JSON.parse(JSON.stringify(messageParameter));//messageParameter   // deep copy;
                let tempMessageParameter = clone()(messageParameter);
                this.responseRequirement = {};
                if (messageParameter.responseRequirement.responseDeliveryMode) {
                    tempMessageParameter.deliveryMode = messageParameter.responseRequirement.responseDeliveryMode;
                    this.responseRequirement.responseDeliveryMode = appmessagedeliverymode_1.createMessageDeliveryMode(tempMessageParameter);
                }
                if (messageParameter.responseRequirement.externalResponseLocation) {
                    tempMessageParameter.dataLocation = messageParameter.responseRequirement.externalResponseLocation;
                    this.responseRequirement.externalResponseLocation = appmessagedatalocation_1.createDataLocation(tempMessageParameter);
                }
                if (messageParameter.responseRequirement.responseDataFormat) {
                    tempMessageParameter.dataFormat = messageParameter.responseRequirement.responseDataFormat;
                    this.responseRequirement.responseDataFormat = appmessageformat_1.createMessageFormat(tempMessageParameter);
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
/**
 * Create App message response requirement.
 *
 * @function createMessageResponseRequirement
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {ResponseRequirement} - Message response requirement.
 */
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