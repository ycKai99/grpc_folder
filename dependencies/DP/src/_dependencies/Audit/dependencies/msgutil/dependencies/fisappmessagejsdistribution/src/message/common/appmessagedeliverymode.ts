/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    MessageDeliveryMode, MessageParameter, Timing,
} from '../../types/appmessagetype';

/**
 * App message delivery mode.
 *
 * @class AppMessageDeliveryMode
 */
export class AppMessageDeliveryMode {
    /**
     * App message delivery mode.
     * 
     * @class AppMessageDeliveryMode
     * @property messageDeliveryMode
     * @type {MessageDeliveryMode} - Message delivery mode.
     */
    protected messageDeliveryMode: MessageDeliveryMode;

    /**
     * Create new message delivery mode.
     *
     * @class AppMessageDeliveryMode
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {MessageDeliveryMode} - Message delivery mode.
     */
    public create(messageParameter: MessageParameter): MessageDeliveryMode {
        try {
            this.messageDeliveryMode = {} as MessageDeliveryMode;
            this.messageDeliveryMode.timing = Timing.Interactive;   // Default is interactive
            if (messageParameter && messageParameter.deliveryMode) {
                if (messageParameter.deliveryMode.channelId) {
                    this.messageDeliveryMode.channelId = messageParameter.deliveryMode.channelId;
                }
                if (messageParameter.deliveryMode.hasOwnProperty("timing")) {
                    this.messageDeliveryMode.timing = messageParameter.deliveryMode.timing
                }
            }
            return this.messageDeliveryMode;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create App message delivery mode.
 *
 * @function createMessageDeliveryMode
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {MessageDeliveryMode} - Message delivery mode.
 */
export function createMessageDeliveryMode(messageParameter: MessageParameter): MessageDeliveryMode {
    try {
        return new AppMessageDeliveryMode().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
