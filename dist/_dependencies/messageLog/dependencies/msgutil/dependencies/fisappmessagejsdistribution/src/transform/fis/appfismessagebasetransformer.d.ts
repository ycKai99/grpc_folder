/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { BaseMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformer } from '../appmessagetransformer';
import { FisMessage } from './fismessage';
/**
 * App FIS base message transformer.
 *
 * @class AppFisMessageBaseTransformer
 */
export declare class AppFisMessageBaseTransformer implements AppMessageTransformer {
    /**
     * Transform app FIS base message.
     *
     * @class AppFisMessageBaseTransformer
     * @method transform
     * @param message  {FisMessageBase} - FIS base message.
     * @return {FisMessage} - Fis message.
     */
    transform(message: BaseMessage): FisMessage;
    /**
     * Validate app FIS base message.
     *
     * @class AppFisMessageBaseTransformer
     * @method validate
     * @param message {FisMessageBase} - FIS base message.
     * @return {boolean} - True = success, false = error.
     */
    validate(message: BaseMessage): boolean;
}
