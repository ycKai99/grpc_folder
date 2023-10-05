/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, AppMessageHeaderOptions, 
    ResponseStatusMessageParameter as MessageParameter, ResponseStatusMessage
} from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App response status message.
 *
 * @class AppResponseStatusMessage
 */
export class AppResponseStatusMessage extends AppMessageKind {
    /**
     * Create new app response status message.
     *
     * @class AppResponseStatusMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.ResponseStatus;
    }

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
    protected createMessage(messageParameter: MessageParameter): ResponseStatusMessage {
        try {
            this.responseStatusMessage = {} as ResponseStatusMessage;
            return this.responseStatusMessage;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new App response status message.
 *
 * @function createResponseStatusMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App response status message.
 */
export function createResponseStatusMessage(messageParameter: MessageParameter): Message {
    try {
        return new AppResponseStatusMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}