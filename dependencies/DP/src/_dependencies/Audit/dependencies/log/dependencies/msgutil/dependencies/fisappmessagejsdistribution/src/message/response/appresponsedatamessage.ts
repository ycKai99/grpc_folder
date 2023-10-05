/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, MessageParameter, AppMessageHeaderOptions,
    ResponseDataMessage
} from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App response data message.
 *
 * @class AppResponseDataMessage
 */
export class AppResponseDataMessage extends AppMessageKind {
    /**
     * Create new app response data message.
     *
     * @class AppResponseDataMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.ResponseData;
    }

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
    protected createMessage(messageParameter: MessageParameter): ResponseDataMessage {
        try {
            this.responseDataMessage = {} as ResponseDataMessage;
            return this.responseDataMessage;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new App response data message.
 *
 * @function createResponseDataMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App response data message.
 */
export function createResponseDataMessage(messageParameter: MessageParameter): Message {
    try {
        return new AppResponseDataMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
