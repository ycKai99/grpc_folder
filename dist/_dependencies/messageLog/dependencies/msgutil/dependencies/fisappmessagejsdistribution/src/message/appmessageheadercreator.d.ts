/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageType, Header, MessageParameter } from '../types/appmessagetype';
import { AppMessageHeader } from './common/appmessageheader';
/**
 * App message header creator.
 *
 * @class AppMessageHeaderCreator
 */
export declare class AppMessageHeaderCreator {
    /**
     * Initialise message header creator.
     *
     * @class AppMessageHeaderCreator
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean;
    /**
     * List of message header objects
     *
     * @class AppMessageHeaderCreator
     * @property messageHeaders
     * @type {object}
     */
    static messageHeaders: object;
    /**
     * Initialise message header creator.
     *
     * @class AppMessageHeaderCreator
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean;
    /**
     * Create new message header instance.
     *
     * @class AppMessageHeaderCreator
     * @method new
     * @param alias {MessageType} - Message header class alias name.
     * @param options {any} - Message header options.
     * @return {AppMessageHeader} - Message .
     */
    static new(alias: MessageType, options?: any): AppMessageHeader;
    /**
     * Create new message header.
     *
     * @class AppMessageHeaderCreator
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @param options {any} - Message header options.
     * @return {Header} - Message header.
     */
    static create(messageParameter: MessageParameter, options?: any): Header;
}
/**
 * Create new app message header.
 *
 * @function createMessageHeader
 * @param messageParameter {MessageParameter} - Message parameters.
 * @param options {any} - Message header options.
 * @return {Header} - New app message header.
 */
export declare function createMessageHeader(messageParameter: MessageParameter, options?: any): Header;
