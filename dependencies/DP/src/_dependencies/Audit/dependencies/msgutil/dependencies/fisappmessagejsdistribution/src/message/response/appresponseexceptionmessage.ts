/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, AppMessageHeaderOptions,
    ResponseExceptionMessageParameter as MessageParameter,
    ResponseExceptionMessage
} from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App response exception message.
 *
 * @class appresponseexceptionmessage
 */
export class appresponseexceptionmessage extends AppMessageKind {
    /**
     * Create new app response exception message.
     *
     * @class appresponseexceptionmessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.ResponseException;
    }

    /**
     * App response exception Message.
     * 
     * @class appresponseexceptionmessage
     * @property responseMessage
     * @type {ResponseExceptionMessage}
     */
    protected responseExceptionMessage: ResponseExceptionMessage;

    /**
     * Create new response exception message.
     *
     * @class appresponseexceptionmessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ResponseExceptionMessage} - New response exception message.
     */
    protected createMessage(messageParameter: MessageParameter): ResponseExceptionMessage {
        try {
            this.responseExceptionMessage = {} as ResponseExceptionMessage;
            return this.responseExceptionMessage;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new App response exception message.
 *
 * @function createResponseExceptionMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App response exception message.
 */
export function createResponseExceptionMessage(messageParameter: MessageParameter): Message {
    try {
        return new appresponseexceptionmessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
