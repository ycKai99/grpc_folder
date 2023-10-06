/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageType, MessageParameter } from '../types/appmessagetype';
import { AppMessage } from './common/appmessage';
import * as Messages from './messages';
export declare type DefaultModule = typeof Messages;
/**
 * App message creator.
 *
 * @class AppMessageCreator
 */
export declare class AppMessageCreator {
    /**
     * Initialise message creator.
     *
     * @class AppMessageCreator
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean;
    /**
     * List of message objects
     *
     * @class AppMessageCreator
     * @property messages
     * @type {object}
     */
    static messages: object;
    /**
     * Initialise message creator.
     *
     * @class AppMessageCreator
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean;
    /**
     * Create new message instance.
     *
     * @class AppMessageCreator
     * @method new
     * @param alias {string} -  Message class alias name.
     * @param options {any} - Message options.
     * @return {AppMessage} - App message instance.
     */
    static new(alias: MessageType, options?: any): AppMessage;
    /**
     * Create new message.
     *
     * @class AppMessageCreator
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @param alias {string} -  Message class alias name.
     * @param options {any} - Message options.
     * @return {Message} - Message.
     */
    static create(messageParameter: MessageParameter, alias?: MessageType, options?: any): Message;
}
/**
 * Create new app message.
 *
 * @function createMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @param alias {string} -  Message class alias name.
 * @param options {any} - Message options.
 * @return {Message} - New app message.
 */
export declare function createMessage(messageParameter: MessageParameter, alias?: MessageType, options?: any): Message;
