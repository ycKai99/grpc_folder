/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageType, MessageParameter, AppMessageHeaderOptions } from '../../types/appmessagetype';
import { AppMessage } from './appmessage';
/**
 * Abstract App message kind.
 *
 * @class AppMessageKind
 */
export declare abstract class AppMessageKind implements AppMessage {
    /**
     * App message type.
     *
     * @class AppMessageKind
     * @property messageType
     * @type {MessageType}
     */
    protected messageType: MessageType;
    /**
     * App message header options.
     *
     * @class AppMessageKind
     * @property options
     * @type {AppMessageHeaderOptions}
     */
    options: AppMessageHeaderOptions;
    /**
     * App Message.
     *
     * @class AppMessageKind
     * @property message
     * @type {Message}
     */
    protected message: Message;
    /**
     * Create new app message.
     *
     * @class AppMessageKind
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message header options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
    * Create new app message.
    *
    * @class AppMessageKind
    * @method create
    * @param messageParameter {MessageParameter} - Message parameters.
    * @return {Message} - New app message.
    */
    create(messageParameter: MessageParameter): Message;
    /**
     * Validate app message.
     *
     * @class AppMessageKind
     * @method validate
     * @param message {Message} - Message.
     * @return {boolean} - True = success, false = error.
     */
    validate(message: Message): boolean;
    /**
     * Validate app message data.
     * Default is any data
     *
     * @class AppMessageKind
     * @method validateData
     * @param data {unknown} - Message data.
     * @return {boolean} - True = success, false = error.
     */
    validateData(data: unknown): boolean;
    /**
     * Create new messages.
     * Descendant to implements.
     *
     * @class AppMessageKind
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {Message} - App message.
     */
    protected abstract createMessage(messageParameter: MessageParameter): Message;
    /**
    * Create message data.
    *
    * @class AppMessageKind
    * @method createData
    * @param  messageParameter {MessageParameter} - Message parameters
    * @return {unknown} - Data.
    */
    protected createData(messageParameter: MessageParameter): unknown;
}
