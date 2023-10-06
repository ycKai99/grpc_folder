/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, AppMessageHeaderOptions, ResponseStatusMessageParameter as MessageParameter, ResponseStatusMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
/**
 * App response status message.
 *
 * @class AppResponseStatusMessage
 */
export declare class AppResponseStatusMessage extends AppMessageKind {
    /**
     * Create new app response status message.
     *
     * @class AppResponseStatusMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * App response status Message.
     *
     * @class AppResponseStatusMessage
     * @property responseMessage
     * @type {ResponseStatusMessage}
     */
    protected responseStatusMessage: ResponseStatusMessage;
    /**
     * Create new response status message.
     *
     * @class AppResponseStatusMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseStatusMessage} - New response status message.
     */
    protected createMessage(messageParameter: MessageParameter): ResponseStatusMessage;
}
/**
 * Create new App response status message.
 *
 * @function createResponseStatusMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response status message.
 */
export declare function createResponseStatusMessage(messageParameter: MessageParameter): Message;
