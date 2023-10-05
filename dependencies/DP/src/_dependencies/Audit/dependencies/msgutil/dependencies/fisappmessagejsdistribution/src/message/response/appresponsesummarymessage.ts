/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, AppMessageHeaderOptions, 
    ResponseStatusMessageParameter as MessageParameter, ResponseStatusMessage, ResponseSummaryMessage
} from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App response summary message.
 *
 * @class AppResponseSummaryMessage
 */
export class AppResponseSummaryMessage extends AppMessageKind {
    /**
     * Create new app response summary message.
     *
     * @class AppResponseSummaryMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.ResponseSummary;
    }

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
    protected createMessage(messageParameter: MessageParameter): ResponseSummaryMessage {
        try {
            this.responseSummaryMessage = {} as ResponseSummaryMessage;
            return this.responseSummaryMessage;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new App response summary message.
 *
 * @function createResponseSummaryMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App response summary message.
 */
export function createResponseSummaryMessage(messageParameter: MessageParameter): Message {
    try {
        return new AppResponseSummaryMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}