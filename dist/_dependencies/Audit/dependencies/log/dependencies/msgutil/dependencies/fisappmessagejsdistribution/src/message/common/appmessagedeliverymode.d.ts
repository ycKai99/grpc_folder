/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageDeliveryMode, MessageParameter } from '../../types/appmessagetype';
/**
 * App message delivery mode.
 *
 * @class AppMessageDeliveryMode
 */
export declare class AppMessageDeliveryMode {
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
    create(messageParameter: MessageParameter): MessageDeliveryMode;
}
/**
 * Create App message delivery mode.
 *
 * @function createMessageDeliveryMode
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {MessageDeliveryMode} - Message delivery mode.
 */
export declare function createMessageDeliveryMode(messageParameter: MessageParameter): MessageDeliveryMode;
