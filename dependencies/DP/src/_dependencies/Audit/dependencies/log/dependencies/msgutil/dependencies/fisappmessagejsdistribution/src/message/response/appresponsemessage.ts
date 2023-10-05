/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, MessageParameter, AppMessageHeaderOptions, 
    ResponseMessage
} from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App response message.
 *
 * @class AppResponseMessage
 */
export class AppResponseMessage extends AppMessageKind {
    /**
     * Create new app response message.
     *
     * @class AppResponseMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Response;
    }

    /**
     * App response Message.
     * 
     * @class AppResponseMessage
     * @property responseMessage
     * @type {ResponseMessage}
     */
    protected responseMessage: ResponseMessage;

    /**
     * Create new response message.
     *
     * @class AppResponseMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ResponseMessage} - New response message.
     */
    protected createMessage(messageParameter: MessageParameter): ResponseMessage {
        try {
            this.responseMessage = {} as ResponseMessage;
            return this.responseMessage;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new App response message.
 *
 * @function createResponseMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App response message.
 */
export function createResponseMessage(messageParameter: MessageParameter): Message {
    try {
        return new AppResponseMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
