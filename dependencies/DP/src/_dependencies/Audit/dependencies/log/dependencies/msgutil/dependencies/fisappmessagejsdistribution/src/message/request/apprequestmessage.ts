/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, MessageParameter, RequestMessage, 
    AppMessageHeaderOptions
} from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App request message.
 *
 * @class AppRequestMessage
 */
export class AppRequestMessage extends AppMessageKind {
    /**
     * Create new app request message.
     *
     * @class AppRequestMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Request;
    }

    /**
     * App request Message.
     * 
     * @class AppRequestMessage
     * @property requestMessage
     * @type {RequestMessage} - App request Message.
     */
    protected requestMessage: RequestMessage;

    /**
     * Create new request message.
     *
     * @class AppRequestMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {RequestMessage} - New request message.
     */
    protected createMessage(messageParameter: MessageParameter): RequestMessage {
        try {
            this.requestMessage = {} as RequestMessage;
            return this.requestMessage;
        }
        catch (e) {
            throw e;
        }
    }

}

/**
 * Create new App request message.
 *
 * @function createRequestMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App request message.
 */
export function createRequestMessage(messageParameter: MessageParameter): Message {
    try {
        return new AppRequestMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
