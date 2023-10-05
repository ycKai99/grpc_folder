/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message } from '../types/appmessagetype';

/**
 * App message transformer.
 *
 * @interface AppMessageTransformer
 */
export interface AppMessageTransformer {
    /**
     * Transform app message.
     *
     * @interface AppMessageTransformer
     * @method transform
     * @param message  {Message} - Message. 
     * @return {object} - Output object.
     */
    transform(message: Message): object;

    /**
     * Validate app message transformer.
     *
     * @interface AppMessageTransformer
     * @method validate
     * @param message {Message} - Message. 
     * @return {boolean} - True = success, false = error.
     */
    validate(message: Message): boolean;

}