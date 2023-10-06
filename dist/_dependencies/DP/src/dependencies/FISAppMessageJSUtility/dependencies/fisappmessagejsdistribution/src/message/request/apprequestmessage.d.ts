/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageParameter, RequestMessage, AppMessageHeaderOptions } from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
/**
 * App request message.
 *
 * @class AppRequestMessage
 */
export declare class AppRequestMessage extends AppMessageKind {
    /**
     * Create new app request message.
     *
     * @class AppRequestMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options?: AppMessageHeaderOptions);
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
    protected createMessage(messageParameter: MessageParameter): RequestMessage;
}
/**
 * Create new App request message.
 *
 * @function createRequestMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App request message.
 */
export declare function createRequestMessage(messageParameter: MessageParameter): Message;
