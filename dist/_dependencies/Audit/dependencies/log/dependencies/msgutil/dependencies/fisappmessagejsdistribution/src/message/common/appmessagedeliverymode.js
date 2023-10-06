"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageDeliveryMode = exports.AppMessageDeliveryMode = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../../types/appmessagetype");
/**
 * App message delivery mode.
 *
 * @class AppMessageDeliveryMode
 */
class AppMessageDeliveryMode {
    /**
     * Create new message delivery mode.
     *
     * @class AppMessageDeliveryMode
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageDeliveryMode} - Message delivery mode.
     */
    create(messageParameter) {
        try {
            this.messageDeliveryMode = {};
            this.messageDeliveryMode.timing = appmessagetype_1.Timing.Interactive; // Default is interactive
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
/**
 * Create App message delivery mode.
 *
 * @function createMessageDeliveryMode
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {MessageDeliveryMode} - Message delivery mode.
 */
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