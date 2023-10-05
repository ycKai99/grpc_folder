/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageParameter } from '../../types/appmessagetype';

/**
 * App message.
 *
 * @interface AppMessage
 */
export interface AppMessage {
    /**
     * Create new app message.
     *
     * @interface AppMessage
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {Message} - App message.
     */
    create(messageParameter: MessageParameter): Message;

    /**
     * Validate app message.
     *
     * @interface AppMessage
     * @method validate
     * @param message {Message} - Message. 
     * @return {boolean} - True = success, false = error.
     */
    validate(message: Message): boolean;

    /**
     * Validate app message data.
     *
     * @interface AppMessage
     * @method validateData
     * @param data {unknown} - Message data. 
     * @return {boolean} - True = success, false = error.
     */
    validateData(data: unknown): boolean;

}
