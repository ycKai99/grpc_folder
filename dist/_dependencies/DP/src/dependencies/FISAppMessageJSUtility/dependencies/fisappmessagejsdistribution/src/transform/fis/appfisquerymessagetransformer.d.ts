/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { QueryMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';
/**
 * App Fis query message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisQueryMessageTransformer
 */
export declare class AppFisQueryMessageTransformer extends AppMessageTransformerKind {
    /**
     * Create new app Fis query message transformer.
     *
     * @class  AppFisQueryMessageTransformer
     * @method constructor
     */
    constructor();
    /**
    * Transform app Fis query message extensions.
    *
    * @class AppFisQueryMessageTransformer
    * @method transformExtensions
    * @param message  {FisQueryMessage} - Fis query message.
    * @return {object} - Output object..
    */
    protected transformExtensions(message: QueryMessage): object;
}
/**
 *  Transform app Fis query message.
 *
 * @function transform
 * @param message  {FisQueryMessage} - Fis query Message.
 * @return {FisMessage} - Fis message.
 */
export declare function transform(message: QueryMessage): FisMessage;
