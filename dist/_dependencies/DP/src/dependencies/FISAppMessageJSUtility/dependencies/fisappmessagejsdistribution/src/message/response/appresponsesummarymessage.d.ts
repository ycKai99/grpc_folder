/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, AppMessageHeaderOptions, ResponseStatusMessageParameter as MessageParameter, ResponseSummaryMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
/**
 * App response summary message.
 *
 * @class AppResponseSummaryMessage
 */
export declare class AppResponseSummaryMessage extends AppMessageKind {
    /**
     * Create new app response summary message.
     *
     * @class AppResponseSummaryMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * App response summary Message.
     *
     * @class AppResponseSummaryMessage
     * @property responseMessage
     * @type {ResponseSummaryMessage}
     */
    protected responseSummaryMessage: ResponseSummaryMessage;
    /**
     * Create new response summary message.
     *
     * @class AppResponseSummaryMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseSummaryMessage} - New response summary message.
     */
    protected createMessage(messageParameter: MessageParameter): ResponseSummaryMessage;
}
/**
 * Create new App response summary message.
 *
 * @function createResponseSummaryMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App response summary message.
 */
export declare function createResponseSummaryMessage(messageParameter: MessageParameter): Message;
