"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerKind = exports.validateOrigin = void 0;
const appmessageuserapplication_1 = require("../common/appmessageuserapplication");
function validateOrigin(origin) {
    try {
        if (!origin) {
            throw "Message origin is undefined or null.";
        }
        else if (Object.keys(origin).length < 1) {
            throw "Message origin is empty.";
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}
exports.validateOrigin = validateOrigin;
class AppMessageProducerKind {
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
    createOrigin(messageParameter) {
        try {
            let origin = {};
            origin.userApplication = (0, appmessageuserapplication_1.createMessageUserApplication)(messageParameter);
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