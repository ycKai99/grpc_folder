/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message } from '../types/appmessagetype';
import { AppMessageTransformer } from './appmessagetransformer';
/**
 * App base message transformer.
 *
 * @class AppMessageBaseTransformer
 */
export declare class AppMessageBaseTransformer implements AppMessageTransformer {
    /**
     * Transform app base message.
     *
     * @class AppMessageBaseTransformer
     * @method transform
     * @param message  {Message} - Message.
     * @return {object} - Output object.
     */
    transform(message: Message): object;
    /**
     * Validate app base message.
     *
     * @class AppMessageBaseTransformer
     * @method validate
     * @param message {Message} - Message.
     * @return {boolean} - True = success, false = error.
     */
    validate(message: Message): boolean;
}
