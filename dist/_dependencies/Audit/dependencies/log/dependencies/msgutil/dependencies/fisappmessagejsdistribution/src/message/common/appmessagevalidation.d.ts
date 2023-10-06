/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageHeader, Header } from '../../types/appmessagetype';
/**
 * App message validations.
 *
 */
/**
 * Validate app message.
 *
 * @function validateMessage
 * @param message {Message} - Message.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateMessage(message: Message): boolean;
/**
 * Validate app message against JSON schema.
 *
 * @function validateSchema
 * @param message {Message} - Message.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateSchema(message: Message): boolean;
/**
 * Validate app message data.
 * Default is any data
 *
 * @function validateMessageData
 * @param data {unknown} - Message data.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateMessageData(data: unknown): boolean;
/**
 * Validate app message base header.
 *
 * @function validateMessageHeader
 * @param header {MessageHeader} - Message base header.
 * @param permissibleMessageType {object} - Permissible message types.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateMessageHeader(header: MessageHeader, permissibleMessageType?: object): boolean;
/**
 * Validate app message base header.
 * Permissible message types.
 *
 * @function validatePermissibleMessageType
 * @param header {MessageHeader} - Message base header.
 * @param permissibleMessageType {object} - Permissible message types.
 * @return {boolean} - True = success, false = error.
 */
export declare function validatePermissibleMessageType(header: MessageHeader, permissibleMessageType?: object): boolean;
/**
 * Validate app message header.
 * Concrete header
 *
 * @function validateHeader
 * @param header {Header} - Message header.
 * @param messageType {string} - Message type.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateHeader(header: Header, messageType: string): boolean;
