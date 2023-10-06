/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageParameter, AppMessageHeaderOptions, ResponseDataMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
/**
 * App response data message.
 *
 * @class AppResponseDataMessage
 */
export declare class AppResponseDataMessage extends AppMessageKind {
    /**
     * Create new app response data message.
     *
     * @class AppResponseDataMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * App response data Message.
     *
     * @class AppResponseDataMessage
     * @property responseMessage
     * @type {ResponseDataMessage}
     */
    protected responseDataMessage: ResponseDataMessage;
    /**
     * Create new response data message.
     *
     * @class AppResponseDataMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseDataMessage} - New response data message.
     */
    protected createMessage(messageParameter: MessageParameter): ResponseDataMessage;
}
/**
 * Create new App response data message.
 *
 * @function createResponseDataMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response data message.
 */
export declare function createResponseDataMessage(messageParameter: MessageParameter): Message;
