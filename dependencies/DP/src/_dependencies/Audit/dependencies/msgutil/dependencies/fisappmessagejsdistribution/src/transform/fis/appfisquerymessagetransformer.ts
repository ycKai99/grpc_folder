/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { AppMessageType, QueryMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';

/**
 * App Fis query message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisQueryMessageTransformer
 */
export class AppFisQueryMessageTransformer extends AppMessageTransformerKind {
    /**
     * Create new app Fis query message transformer.
     *
     * @class  AppFisQueryMessageTransformer
     * @method constructor
     */
    constructor() {
        super();
        this.baseTransformerType = [AppMessageType.Base];
        this.permissibleMessageType = AppMessageType.Query;
    }

    /**
    * Transform app Fis query message extensions.
    *
    * @class AppFisQueryMessageTransformer
    * @method transformExtensions
    * @param message  {FisQueryMessage} - Fis query message. 
    * @return {object} - Output object..
    */
    protected transformExtensions(message: QueryMessage): object {
        let fisMessage: FisMessage = {} as FisMessage;
        fisMessage.operation = message.header.query;
        fisMessage.requestType = AppMessageType.Query;    // Request for query service.
        return fisMessage;
    }
}

/**
 *  Transform app Fis query message.
 *
 * @function transform
 * @param message  {FisQueryMessage} - Fis query Message. 
 * @return {FisMessage} - Fis message.
 */
export function transform(message: QueryMessage): FisMessage {
    try {
        return new AppFisQueryMessageTransformer().transform(message) as FisMessage;
    }
    catch (e) {
        throw e;
    }
}
