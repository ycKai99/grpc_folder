/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { AppMessageType, ResponseMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';

/**
 * App Fis response message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisResponseMessageTransformer
 */
export class AppFisResponseMessageTransformer extends AppMessageTransformerKind {
    /**
     * Create new app Fis response message transformer.
     *
     * @class  AppFisResponseMessageTransformer
     * @method constructor
     */
    constructor() {
        super();
        this.baseTransformerType = [AppMessageType.Base];
        this.permissibleMessageType = AppMessageType.Response;
    }

    /**
    * Transform app Fis response message extensions.
    *
    * @class AppFisResponseMessageTransformer
    * @method transformExtensions
    * @param message  {FisResponseMessage} - Fis response message. 
    * @return {object} - Output object..
    */
    protected transformExtensions(message: ResponseMessage): object {
        let fisMessage: FisMessage = {} as FisMessage;
        fisMessage.operation = "Response"   //message.header.response;
        fisMessage.requestType = AppMessageType.Response;    // Request for response service.
        return fisMessage;
    }
}

/**
 *  Transform app Fis response message.
 *
 * @function transform
 * @param message  {FisResponseMessage} - Fis response Message. 
 * @return {FisMessage} - Fis message.
 */
export function transform(message: ResponseMessage): FisMessage {
    try {
        return new AppFisResponseMessageTransformer().transform(message) as FisMessage;
    }
    catch (e) {
        throw e;
    }
}
