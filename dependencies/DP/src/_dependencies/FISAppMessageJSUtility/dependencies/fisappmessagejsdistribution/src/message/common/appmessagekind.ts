/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, MessageType, MessageParameter,
    AppMessageHeaderOptions
} from '../../types/appmessagetype';
import { AppMessage } from './appmessage';
import { validateMessage, validateMessageData } from './appmessagevalidation';
import { createMessageHeader } from '../appmessageheadercreator';

/**
 * Abstract App message kind.
 *
 * @class AppMessageKind
 */
export abstract class AppMessageKind implements AppMessage {
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
    public options: AppMessageHeaderOptions;

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
    constructor(options?: AppMessageHeaderOptions) {
        if (options) {
            this.options = options;
        }
    }

    /**
    * Create new app message.
    *
    * @class AppMessageKind
    * @method create
    * @param messageParameter {MessageParameter} - Message parameters. 
    * @return {Message} - New app message.
    */
    create(messageParameter: MessageParameter): Message {
        try {
            if (!this.messageType) {
                throw "Message tyeps is not set(undefined).";
            }
            this.message = this.createMessage(messageParameter);
            if (!this.message) {
                throw "Message is undefined or null.";
            }
            this.message.header = createMessageHeader(messageParameter, this.options);
            this.message.data = this.createData(messageParameter);
            this.validate(this.message);
            this.validateData(this.message.data);
            return this.message;
        }
        catch (e) {
            throw this.messageType + " Message is not valid. " + e;
        }
    }

    /**
     * Validate app message.
     *
     * @class AppMessageKind
     * @method validate
     * @param message {Message} - Message. 
     * @return {boolean} - True = success, false = error.
     */
    validate(message: Message): boolean {
        try {
            return validateMessage(message);
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Validate app message data.
     * Default is any data
     *
     * @class AppMessageKind
     * @method validateData
     * @param data {unknown} - Message data. 
     * @return {boolean} - True = success, false = error.
     */
    validateData(data: unknown): boolean {
        try {
            return validateMessageData(data);
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Create new messages.
     * Descendant to implements. 
     *
     * @class AppMessageKind
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {Message} - App message.
     */
    protected abstract createMessage(messageParameter: MessageParameter): Message

    /**
    * Create message data.
    *
    * @class AppMessageKind
    * @method createData
    * @param  messageParameter {MessageParameter} - Message parameters
    * @return {unknown} - Data.
    */
    protected createData(messageParameter: MessageParameter): unknown {
        return (messageParameter && 
                messageParameter.hasOwnProperty("data")) ? 
                messageParameter.data : {};
    }
}
