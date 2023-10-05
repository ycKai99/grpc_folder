/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, MessageHeader, MessageType, TypeOfMessage,
} from '../../types/appmessagetype';
import * as schema from '../../schema/FisAppMessageSchema.json';

export type FilterType = TypeOfMessage[] | TypeOfMessage;
export type FilterStringType = string[] | string;
export type FilterMessgeType = MessageType[] | MessageType;

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
export class AppMessageUtil {    /**
    * Initialise message utility.
    *
    * @class AppMessageUtil
    * @property __initialised
    * @type {boolean}
    */
    protected static __initialised: boolean = AppMessageUtil.initialise();

    /**
     * Initialise message utility.
     *
     * @class AppMessageUtil
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean {
        if (this.__initialised) {
        }
        else {
        }
        return true;
    }

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
    public static isRequired(object: any, typeName: string): boolean {
        return (typeof object === 'object' &&
            schema.definitions[typeName] &&
            schema.definitions[typeName].required &&
            schema.definitions[typeName].required.filter(
                (item: string) => Object.keys(object).indexOf(item) < 0).length === 0);
    }

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
    public static isMessage(message: Message): boolean {
        return this.isRequired(message, TypeOfMessage.Message)
    }

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
    public static isMessageHeader(messageHeader: MessageHeader): boolean {
        return this.isRequired(messageHeader, "MessageHeader")
    }

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
    protected static isAllOf(message: Message, type: string): boolean {
        let isType: boolean;
        if (message && type && schema.definitions[type] &&
            schema.definitions[type].allOf) {
            for (let item of schema.definitions[type].allOf) {
                let ref: string = (item.$ref) ? item.$ref.split('/').pop() : "";
                if (type != ref && schema.definitions[ref] &&
                    schema.definitions[ref].allOf) {
                    if (!this.isAllOf(message, ref)) { return false; }
                }
                else if (!this.isRequired(message.header, ref)) { //Not header of type
                    return false;
                }
            }
            return true;    // All valid
        }
        else {
            return this.isRequired(message.header, type);
        }
    }

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
    public static isOfType(message: Message, type: TypeOfMessage): boolean {
        let headerType: string;
        if (this.isMessage(message) &&      // Valid message
            // this.isMessageHeader(message.header) &&     // Valida message header
            schema.definitions[type] &&
            schema.definitions[type].properties &&
            schema.definitions[type].properties.header &&
            schema.definitions[type].properties.header.$ref) {

            if (type === TypeOfMessage.Message) return true;
            headerType = schema.definitions[type].properties.header.$ref.split('/').pop();
            return this.isAllOf(message, headerType);
        }
        else {
            return false;
        }
    }

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
    public static isOfMessageType(message: Message, type: MessageType): boolean {
        return (message && message.header && message.header.messageType &&
            message.header.messageType === type);
    }

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
    public static isOfMessageId(message: Message, id: string): boolean {
        return (message && message.header && message.header.messageID &&
            message.header.messageID === id);
    }

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
    public static filterByType(message: Message[], type: FilterType): Message[] {
        let filterType: FilterType = Array.isArray(type) && type.length > 0 ?
           type : typeof type === "string" ? [type] : [];
        if (Array.isArray(message) && filterType.length > 0) {
            return message.filter(
                (message: Message) => {
                    for (let item of filterType) {
                        if (this.isOfType(message, item as TypeOfMessage)) { return true; }
                    }

                }
            );
        }
        else {
            return message;
        }
    }

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
    public static filterByMessageId(message: Message[], id: FilterStringType): Message[] {
        let filterId: string[] = Array.isArray(id) && id.length > 0 ?
            id : typeof id === "string" ? [id] : [];
        if (Array.isArray(message) && filterId.length > 0) {
            return message.filter(
                (message: Message) => {
                    for (let item of filterId) {
                        if (this.isOfMessageId(message, item)) { return true; }
                    }

                }
            );
        }
        else {
            return message;
        }
    }

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
    public static filterByMessageType(message: Message[], messageType: FilterMessgeType): Message[] {
        let filtermessageType: string[] = Array.isArray(messageType) && messageType.length > 0 ?
            messageType : typeof messageType === "string" ? [messageType] : [];
        if (Array.isArray(message) && filtermessageType.length > 0) {
            return message.filter(
                (message: Message) => {
                    for (let item of filtermessageType) {
                        if (this.isOfMessageType(message, item as MessageType)) { return true; }
                    }

                }
            );
        }
        else {
            return message;
        }
    }

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
    public static filter(message: Message[], option: FilterOption): Message[] {
        let filteredMessage: Message[] = message;

        if (option && option.type) filteredMessage = this.filterByType(filteredMessage, option.type);
        if (option && option.id) filteredMessage = this.filterByMessageId(filteredMessage, option.id);
        if (option && option.messageTypes) filteredMessage = this.filterByMessageType(filteredMessage, option.messageTypes);
        return filteredMessage;
    }

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
export function isMessage(message: Message): boolean {
    try {
        return AppMessageUtil.isMessage(message);
    }
    catch (e) {
        throw e;
    }
}

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
export function isOfType(message: Message, type: TypeOfMessage): boolean {
    try {
        return AppMessageUtil.isOfType(message, type);
    }
    catch (e) {
        throw e;
    }
}

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
export function isOfMessageType(message: Message, type: MessageType): boolean {
    try {
        return AppMessageUtil.isOfMessageType(message, type);
    }
    catch (e) {
        throw e;
    }
}

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
export function isOfMessageId(message: Message, id: string): boolean {
    try {
        return AppMessageUtil.isOfMessageId(message, id);
    }
    catch (e) {
        throw e;
    }
}

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
export function filter(message: Message[], option: FilterOption): Message[] {
    try {
        return AppMessageUtil.filter(message, option);
    }
    catch (e) {
        throw e;
    }
}
