"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageDeliveryMode = exports.AppMessageDeliveryMode = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
class AppMessageDeliveryMode {
    create(messageParameter) {
        try {
            this.messageDeliveryMode = {};
            this.messageDeliveryMode.timing = appmessagetype_1.Timing.Interactive;
            if (messageParameter && messageParameter.deliveryMode) {
                if (messageParameter.deliveryMode.channelId) {
                    this.messageDeliveryMode.channelId = messageParameter.deliveryMode.channelId;
                }
                if (messageParameter.deliveryMode.hasOwnProperty("timing")) {
                    this.messageDeliveryMode.timing = messageParameter.deliveryMode.timing;
                }
            }
            return this.messageDeliveryMode;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageDeliveryMode = AppMessageDeliveryMode;
function createMessageDeliveryMode(messageParameter) {
    try {
        return new AppMessageDeliveryMode().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessageDeliveryMode = createMessageDeliveryMode;
//# sourceMappingURL=appmessagedeliverymode.js.map