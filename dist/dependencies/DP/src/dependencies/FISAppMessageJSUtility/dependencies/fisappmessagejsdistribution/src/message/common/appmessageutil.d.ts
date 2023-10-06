/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageHeader, MessageType, TypeOfMessage } from '../../types/appmessagetype';
export declare type FilterType = TypeOfMessage[] | TypeOfMessage;
export declare type FilterStringType = string[] | string;
export declare type FilterMessgeType = MessageType[] | MessageType;
/**
 * Filter options.
 *
 * @interface FilterOption
 */
export interface FilterOption {
    /**
     * List of types.
     *
     * @property type
     * @type {FilterType}
     */
    type?: FilterType;
    /**
     * List of message id.
     *
     * @property id
     * @type {FilterStringType}
     */
    id?: FilterStringType;
    /**
     * List of message types.
     *
     * @property messageTypes
     * @type {FilterMessgeType}
     */
    messageTypes?: FilterMessgeType;
}
/**
 * App message utilities.
 * Provides functions to query message.
 *
 * @class AppMessageUtil
 */
export declare class AppMessageUtil {
    protected static __initialised: boolean;
    /**
     * Initialise message utility.
     *
     * @class AppMessageUtil
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean;
    /**
     * Tests to see if the object of app message schema type.
     * Check against app message schema required properties.
     * The return value is a boolean value.
     *
     * @class AppMessageUtil
     * @method isRequired
     * @param object {any} - object to test.
     * @param typeName {string} - Type name to test against
     * @return {boolean} - true is Yes, otherwise No.
     */
    static isRequired(object: any, typeName: string): boolean;
    /**
     * Tests to see if the message is an app message.
     * Check against app message schema required properties.
     * The return value is a boolean value.
     *
     * @class AppMessageUtil
     * @method isMessage
     * @param message {Message} - Message to test.
     * @return {boolean} - true is Yes, otherwise No.
     */
    static isMessage(message: Message): boolean;
    /**
     * Common information for all messages.
     * Tests to see if the message header is an app message header.
     * Check against app message header schema required properties.
     * The return value is a boolean value.
     *
     * @class AppMessageUtil
     * @method isMessageHeader
     * @param messageHeader {MessageHeader} - Message header to test.
     * @return {boolean} - true is Yes, otherwise No.
     */
    static isMessageHeader(messageHeader: MessageHeader): boolean;
    /**
     * Tests to see if the message is valid against all of the given subschemas
     * of 'type'.
     * Check against app message schema allOf properties.
     * Check against app message schema required properties.
     * The return value is a boolean value.
     *
     * @class AppMessageUtil
     * @method isAllOf
     * @param message {Message} - Message to test.
     * @param type {string} - Type to test against.
     * @return {boolean} - true is Yes, otherwise No.
     */
    protected static isAllOf(message: Message, type: string): boolean;
    /**
     * Tests to see if the message  is of message 'type'.
     * Check is a valid app message.
     * Check common message header(MessageHeader).
     * Check against app message schema allOf properties..
     * i.e. type are Message, RequestMessage, ResponseMessage, CommandMessage, etc.
     * The return value is a boolean value.
     *
     * @class AppMessageUtil
     * @method isOfType
     * @param message {Message} - Message to test.
     * @param type {TypeOfMessage} - Type to test against.
     * @return {boolean} - true is Yes, otherwise No.
     */
    static isOfType(message: Message, type: TypeOfMessage): boolean;
    /**
     * Tests to see if the message  is of 'MessageType'.
     * Check against app message property 'MessageType'.
     * i.e. type are Request, Response, Command, etc.
     * The return value is a boolean value.
     *
     * @class AppMessageUtil
     * @method isOfMessageType
     * @param message {Message} - Message to test.
     * @param type {MessageType} - Type to test against.
     * @return {boolean} - true is Yes, otherwise No.
     */
    static isOfMessageType(message: Message, type: MessageType): boolean;
    /**
     * Tests to see if the message id equals to 'id'.
     * Check against app message property 'MessageId'.
     * The return value is a boolean value.
     *
     * @class AppMessageUtil
     * @method isOfMessageId
     * @param message {Message} - Message to test.
     * @param id {string - Id to test against.
     * @return {boolean} - true is Yes, otherwise No.
     */
    static isOfMessageId(message: Message, id: string): boolean;
    /**
     * Creates a new message array with all elements that pass the test,
     * provided type.
     *
     * i.e. type are Message, RequestMessage, ResponseMessage, CommandMessage, etc.
     *
     * The return value is array of messages.
     *
     * @class AppMessageUtil
     * @method filterByType
     * @param message {Message[]} - Messages to filter.
     * @param type {FilterType} - Filter type.
     * @return {Message[]} - Array of messages.
     */
    static filterByType(message: Message[], type: FilterType): Message[];
    /**
     * Creates a new message array with all elements that pass the test,
     * provided 'Id' as message id.
     *
     * The return value is array of messages.
     *
     * @class AppMessageUtil
     * @method filterByMessageId
     * @param message {Message[]} - Messages to filter.
     * @param id {FilterStringType} - Filter message id.
     * @return {Message[]} - Array of messages.
     */
    static filterByMessageId(message: Message[], id: FilterStringType): Message[];
    /**
     * Creates a new message array with all elements that pass the test,
     * provided 'messageType' as message type.
     *
     * The return value is array of messages.
     *
     * @class AppMessageUtil
     * @method filterByMessageType
     * @param message {Message[]} - Messages to filter.
     * @param messageType {FilterMessgeType} - Filter message type.
     * @return {Message[]} - Array of messages.
     */
    static filterByMessageType(message: Message[], messageType: FilterMessgeType): Message[];
    /**
     * Creates a new message array with all elements that pass the test,
     * provided as an option.
     *
     * Options:
     *
     *  type?: FilterType - Optional. Type to check against.
     *
     *  id?: FilterStringType - Optional. Id to check against.
     *
     *  messageType?: FilterMessgeType - Optional. Message Type to check against.
     *
     * The return value is array of messages.
     *
     * @class AppMessageUtil
     * @method filter
     * @param message {Message[]} - Messages to filter.
     * @param option {FilterOption} - Filter options.
     * @return {Message[]} - Array of messages.
     */
    static filter(message: Message[], option: FilterOption): Message[];
}
/**
 * Tests to see if the message is an app message.
 *
 * The return value is a boolean value.
 *
 * @function isMessage
 * @param message {Message[]} - Messages to test.
 * @return {boolean} - true is Yes, otherwise No.
 */
export declare function isMessage(message: Message): boolean;
/**
 * Tests to see if the message  is of message 'type'.
 *
 * i.e. type are Message, RequestMessage, ResponseMessage, CommandMessage, etc.
 *
 * The return value is a boolean value.
 *
 * @function isOfType
 * @param message {Message[]} - Messages to test.
 * @param type {TypeOfMessage} - Type to test against.
 * @return {boolean} - true is Yes, otherwise No.
 */
export declare function isOfType(message: Message, type: TypeOfMessage): boolean;
/**
 * Tests to see if the message  is of 'MessageType'.
 *
 * Check against app message property 'MessageType'.
 *
 * i.e. type are Request, Response, Command, etc.
 *
 * The return value is a boolean value.
 *
 * @function isOfMessageType
 * @param message {Message[]} - Messages to test.
 * @param type {MessageType} - Type to test against.
 * @return {boolean} - true is Yes, otherwise No.
 */
export declare function isOfMessageType(message: Message, type: MessageType): boolean;
/**
 * Tests to see if the message  is equals to 'id'.
 *
 * Check against app message property 'MessageId'.
 *
 * The return value is a boolean value.
 *
 * @function isOfMessageId
 * @param message {Message[]} - Messages to test.
 * @param id {MessageType} - Id to test against.
 * @return {boolean} - true is Yes, otherwise No.
 */
export declare function isOfMessageId(message: Message, id: string): boolean;
/**
 * Creates a new message array with all elements that pass the test,
 * provided as an option.
 *
 * Options:
 *
 *  type?: FilterType - Optional. Type to check against.
 *
 *  id?: FilterStringType - Optional. Id to check against.
 *
 *  messageType?: FilterMessgeType - Optional. Message Type to check against.
 *
 * The return value is array of messages.
 *
 * @function filter
 * @param message {Message[]} - Messages to filter.
 * @param option {FilterOption} - Filter options.
 * @return {Message[]} - Array of messages.
 */
export declare function filter(message: Message[], option: FilterOption): Message[];
