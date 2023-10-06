"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerKind = exports.validateOrigin = void 0;
const appmessageuserapplication_1 = require("../common/appmessageuserapplication");
/**
 * Validate app message origin.
 *
 * @function validate
 * @param origin {MessageProducerInformationBase} - Message origin.
 * @return {boolean} - True = success, false = error.
 */
function validateOrigin(origin) {
    try {
        if (!origin) {
            throw "Message origin is undefined or null.";
        }
        else if (Object.keys(origin).length < 1) {
            throw "Message origin is empty.";
        }
        // else if (!origin.programID || origin.programID.trim().length < 1) {
        //     throw "'Program Id' is unknown or blank.";
        // }
    }
    catch (e) {
        throw e;
    }
    return true;
}
exports.validateOrigin = validateOrigin;
/**
 * App message producer kind of information.
 *
 * @class AppMessageProducerKind
 */
class AppMessageProducerKind {
    /**
     * Create new message producer information.
     *
     * @class AppMessageProducerKind
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageProducerInformation} - Message producer information.
     */
    create(messageParameter) {
        try {
            this.messageProducerInformation = this.createProducer(messageParameter);
            this.messageProducerInformation.origin = this.createOrigin(messageParameter);
            this.messageProducerInformation.components = this.createComponent(messageParameter);
            return this.messageProducerInformation;
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Create location of source program that generated this message.
     *
     * @class AppMessageProducerKind
     * @method createOrigin
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageProducerInformationBase} - Message producer information Base.
     */
    createOrigin(messageParameter) {
        try {
            let origin = {};
            origin.userApplication = appmessageuserapplication_1.createMessageUserApplication(messageParameter);
            if (messageParameter && messageParameter.producer &&
                messageParameter.producer.origin) {
                if (messageParameter.producer.origin.appArchitectureTiers) {
                    origin.appArchitectureTiers = messageParameter.producer.origin.appArchitectureTiers;
                }
                if (messageParameter.producer.origin.messageFactoryType) {
                    origin.messageFactoryType = messageParameter.producer.origin.messageFactoryType;
                }
                if (messageParameter.producer.origin.programID) {
                    origin.programID = messageParameter.producer.origin.programID;
                }
                if (messageParameter.producer.origin.programName) {
                    origin.programName = messageParameter.producer.origin.programName;
                }
            }
            validateOrigin(origin);
            return origin;
        }
        catch (e) {
            throw "Producer information is not valid.\n" + e;
        }
    }
}
exports.AppMessageProducerKind = AppMessageProducerKind;
//# sourceMappingURL=appmessageproducer.js.map