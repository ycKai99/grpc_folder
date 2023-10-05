/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { AppMessageType, CommandMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';

/**
 * App Fis command message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisCommandMessageTransformer
 */
export class AppFisCommandMessageTransformer extends AppMessageTransformerKind {
    /**
     * Create new app Fis command message transformer.
     *
     * @class  AppFisCommandMessageTransformer
     * @method constructor
     */
    constructor() {
        super();
        this.baseTransformerType = [AppMessageType.Base];
        this.permissibleMessageType = AppMessageType.Command;
    }

    /**
    * Transform app Fis command message extensions.
    *
    * @class AppFisCommandMessageTransformer
    * @method transformExtensions
    * @param message  {FisCommandMessage} - Fis command message. 
    * @return {object} - Output object..
    */
    protected transformExtensions(message: CommandMessage): object {
        let fisMessage: FisMessage = {} as FisMessage;
        fisMessage.operation = message.header.command;
        fisMessage.requestType = AppMessageType.Command;    // Request for command service.
        return fisMessage;
    }
}

/**
 *  Transform app Fis command message.
 *
 * @function transform
 * @param message  {FisCommandMessage} - Fis command Message. 
 * @return {FisMessage} - Fis message.
 */
export function transform(message: CommandMessage): FisMessage {
    try {
        return new AppFisCommandMessageTransformer().transform(message) as FisMessage;
    }
    catch (e) {
        throw e;
    }
}
