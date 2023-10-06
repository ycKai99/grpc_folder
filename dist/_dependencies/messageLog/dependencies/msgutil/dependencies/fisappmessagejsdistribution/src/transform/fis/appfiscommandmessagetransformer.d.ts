/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { CommandMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';
/**
 * App Fis command message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisCommandMessageTransformer
 */
export declare class AppFisCommandMessageTransformer extends AppMessageTransformerKind {
    /**
     * Create new app Fis command message transformer.
     *
     * @class  AppFisCommandMessageTransformer
     * @method constructor
     */
    constructor();
    /**
    * Transform app Fis command message extensions.
    *
    * @class AppFisCommandMessageTransformer
    * @method transformExtensions
    * @param message  {FisCommandMessage} - Fis command message.
    * @return {object} - Output object..
    */
    protected transformExtensions(message: CommandMessage): object;
}
/**
 *  Transform app Fis command message.
 *
 * @function transform
 * @param message  {FisCommandMessage} - Fis command Message.
 * @return {FisMessage} - Fis message.
 */
export declare function transform(message: CommandMessage): FisMessage;
