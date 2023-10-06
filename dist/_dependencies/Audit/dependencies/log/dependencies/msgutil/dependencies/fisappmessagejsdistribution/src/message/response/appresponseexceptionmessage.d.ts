/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, AppMessageHeaderOptions, ResponseExceptionMessageParameter as MessageParameter, ResponseExceptionMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
/**
 * App response exception message.
 *
 * @class appresponseexceptionmessage
 */
export declare class appresponseexceptionmessage extends AppMessageKind {
    /**
     * Create new app response exception message.
     *
     * @class appresponseexceptionmessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options?: AppMessageHeaderOptions);
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
    protected createMessage(messageParameter: MessageParameter): ResponseExceptionMessage;
}
/**
 * Create new App response exception message.
 *
 * @function createResponseExceptionMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response exception message.
 */
export declare function createResponseExceptionMessage(messageParameter: MessageParameter): Message;
