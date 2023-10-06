/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { ResponseMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';
/**
 * App Fis response message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisResponseMessageTransformer
 */
export declare class AppFisResponseMessageTransformer extends AppMessageTransformerKind {
    /**
     * Create new app Fis response message transformer.
     *
     * @class  AppFisResponseMessageTransformer
     * @method constructor
     */
    constructor();
    /**
    * Transform app Fis response message extensions.
    *
    * @class AppFisResponseMessageTransformer
    * @method transformExtensions
    * @param message  {FisResponseMessage} - Fis response message.
    * @return {object} - Output object..
    */
    protected transformExtensions(message: ResponseMessage): object;
}
/**
 *  Transform app Fis response message.
 *
 * @function transform
 * @param message  {FisResponseMessage} - Fis response Message.
 * @return {FisMessage} - Fis message.
 */
export declare function transform(message: ResponseMessage): FisMessage;
