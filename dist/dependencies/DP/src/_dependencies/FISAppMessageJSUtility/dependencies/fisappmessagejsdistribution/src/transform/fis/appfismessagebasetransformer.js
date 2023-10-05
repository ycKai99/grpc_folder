"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFisMessageBaseTransformer = void 0;
class AppFisMessageBaseTransformer {
    transform(message) {
        try {
            this.validate(message);
            let fisMessage = {};
            fisMessage.dataSourceTiming = message.header.dataSourceTiming;
            fisMessage.messageId = message.header.messageID;
            fisMessage.messageType = message.header.messageType;
            fisMessage.payload = message.data;
            fisMessage.requestType = message.header.messageType;
            fisMessage.requestName = message.header.messageName;
            fisMessage.requesterId = message.header.security.ucpId;
            fisMessage.serviceId = message.header.serviceId || message.data['serviceId'];
            fisMessage.serviceInstanceId = message.header.instanceId;
            fisMessage.userId = message.header.security.applicationLogInID;
            if (message.header.security.socialNetworkLoginID &&
                message.header.security.socialNetworkLoginID.trim().length > 0) {
                fisMessage.socialNetworkLoginId = message.header.security.socialNetworkLoginID;
            }
            return fisMessage;
        }
        catch (e) {
            throw e;
        }
    }
    validate(message) {
        try {
            if (!message.header.security ||
                Object.keys(message.header.security).length < 1) {
                throw "Message security is unknown or empty.";
            }
            else if (!message.header.security.ucpId ||
                message.header.security.ucpId.trim().length < 1) {
                throw "Message Security: 'User Proxy Id' is unknown or blank.";
            }
        }
        catch (e) {
            throw e;
        }
        return true;
    }
}
exports.AppFisMessageBaseTransformer = AppFisMessageBaseTransformer;
//# sourceMappingURL=appfismessagebasetransformer.js.map