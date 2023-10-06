"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = exports.isOfMessageId = exports.isOfMessageType = exports.isOfType = exports.isMessage = exports.AppMessageUtil = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../../types/appmessagetype");
const schema = require("../../schema/FisAppMessageSchema.json");
/**
 * App message utilities.
 * Provides functions to query message.
 *
 * @class AppMessageUtil
 */
class AppMessageUtil {
    /**
     * Initialise message utility.
     *
     * @class AppMessageUtil
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
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
    static isRequired(object, typeName) {
        return (typeof object === 'object' &&
            schema.definitions[typeName] &&
            schema.definitions[typeName].required &&
            schema.definitions[typeName].required.filter((item) => Object.keys(object).indexOf(item) < 0).length === 0);
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
    static isMessage(message) {
        return this.isRequired(message, appmessagetype_1.TypeOfMessage.Message);
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
    static isMessageHeader(messageHeader) {
        return this.isRequired(messageHeader, "MessageHeader");
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
    static isAllOf(message, type) {
        let isType;
        if (message && type && schema.definitions[type] &&
            schema.definitions[type].allOf) {
            for (let item of schema.definitions[type].allOf) {
                let ref = (item.$ref) ? item.$ref.split('/').pop() : "";
                if (type != ref && schema.definitions[ref] &&
                    schema.definitions[ref].allOf) {
                    if (!this.isAllOf(message, ref)) {
                        return false;
                    }
                }
                else if (!this.isRequired(message.header, ref)) { //Not header of type
                    return false;
                }
            }
            return true; // All valid
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
    static isOfType(message, type) {
        let headerType;
        if (this.isMessage(message) && // Valid message
            // this.isMessageHeader(message.header) &&     // Valida message header
            schema.definitions[type] &&
            schema.definitions[type].properties &&
            schema.definitions[type].properties.header &&
            schema.definitions[type].properties.header.$ref) {
            if (type === appmessagetype_1.TypeOfMessage.Message)
                return true;
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
    static isOfMessageType(message, type) {
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
    static isOfMessageId(message, id) {
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
    static filterByType(message, type) {
        let filterType = Array.isArray(type) && type.length > 0 ?
            type : typeof type === "string" ? [type] : [];
        if (Array.isArray(message) && filterType.length > 0) {
            return message.filter((message) => {
                for (let item of filterType) {
                    if (this.isOfType(message, item)) {
                        return true;
                    }
                }
            });
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
    static filterByMessageId(message, id) {
        let filterId = Array.isArray(id) && id.length > 0 ?
            id : typeof id === "string" ? [id] : [];
        if (Array.isArray(message) && filterId.length > 0) {
            return message.filter((message) => {
                for (let item of filterId) {
                    if (this.isOfMessageId(message, item)) {
                        return true;
                    }
                }
            });
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
    static filterByMessageType(message, messageType) {
        let filtermessageType = Array.isArray(messageType) && messageType.length > 0 ?
            messageType : typeof messageType === "string" ? [messageType] : [];
        if (Array.isArray(message) && filtermessageType.length > 0) {
            return message.filter((message) => {
                for (let item of filtermessageType) {
                    if (this.isOfMessageType(message, item)) {
                        return true;
                    }
                }
            });
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
    static filter(message, option) {
        let filteredMessage = message;
        if (option && option.type)
            filteredMessage = this.filterByType(filteredMessage, option.type);
        if (option && option.id)
            filteredMessage = this.filterByMessageId(filteredMessage, option.id);
        if (option && option.messageTypes)
            filteredMessage = this.filterByMessageType(filteredMessage, option.messageTypes);
        return filteredMessage;
    }
}
exports.AppMessageUtil = AppMessageUtil;
AppMessageUtil.__initialised = AppMessageUtil.initialise();
/**
 * Tests to see if the message is an app message.
 *
 * The return value is a boolean value.
 *
 * @function isMessage
 * @param message {Message[]} - Messages to test.
 * @return {boolean} - true is Yes, otherwise No.
 */
function isMessage(message) {
    try {
        return AppMessageUtil.isMessage(message);
    }
    catch (e) {
        throw e;
    }
}
exports.isMessage = isMessage;
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
function isOfType(message, type) {
    try {
        return AppMessageUtil.isOfType(message, type);
    }
    catch (e) {
        throw e;
    }
}
exports.isOfType = isOfType;
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
function isOfMessageType(message, type) {
    try {
        return AppMessageUtil.isOfMessageType(message, type);
    }
    catch (e) {
        throw e;
    }
}
exports.isOfMessageType = isOfMessageType;
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
function isOfMessageId(message, id) {
    try {
        return AppMessageUtil.isOfMessageId(message, id);
    }
    catch (e) {
        throw e;
    }
}
exports.isOfMessageId = isOfMessageId;
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
function filter(message, option) {
    try {
        return AppMessageUtil.filter(message, option);
    }
    catch (e) {
        throw e;
    }
}
exports.filter = filter;
//# sourceMappingURL=appmessageutil.js.map