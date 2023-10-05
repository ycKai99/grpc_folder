/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageHeader, Header, AppMessageType } from '../../types/appmessagetype';
import { validateSchema as validateSchemaJson  } from './appmessageschema';
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
export function validateMessage(message: Message): boolean {

    try {
        if (!message) {
            throw "Message is unknown.";
        }
        else if (Object.keys(message).length < 1) {
            throw "Message is empty.";
        }
        else if (!message.header) {
            throw "Message header is unknown.";
        }
        validateSchema(message);
    }
    catch (e) {
        throw e;
    }
    return true;
}

/**
 * Validate app message against JSON schema.
 *
 * @function validateSchema
 * @param message {Message} - Message. 
 * @return {boolean} - True = success, false = error.
 */
export function validateSchema(message: Message): boolean {

    try {
        // let m: any = message;
        // // m.header.command = "Newx";
        // //message = {header:{messageID:null}, data:{}} as Message;
        // //    message = {header:{messageType:"",messageID:"",messageName:"",dateCreated: new Date().toISOString(),
        // //isAggregate:false, messageProducerInformation:message.header.messageProducerInformation}, data:{}    } as Message;
        // let schema: Schema = require("../../" + Config.schemaDefinitionPath());   // Load schema
        // // validateJsonSchema(message, schema, {
        // validateJsonSchema(m, schema, {
        //     throwError: true    //,
        //     // disableFormat: Config.schemaDisableFormat()     // 'disableFormat' not defined in jsonschema Options type definition 'index.d.ts', if add in then OK.
        // });
        return validateSchemaJson(message);
        // return AppMessageSchema.validateSchema(message);
    }
    catch (e) {
        throw e;
    }
    // return true;
}

/**
 * Validate app message data.
 * Default is any data
 *
 * @function validateMessageData
 * @param data {unknown} - Message data. 
 * @return {boolean} - True = success, false = error.
 */
export function validateMessageData(data: unknown): boolean {
    return true;
}

/**
 * Validate app message base header.
 *
 * @function validateMessageHeader
 * @param header {MessageHeader} - Message base header. 
 * @param permissibleMessageType {object} - Permissible message types.
 * @return {boolean} - True = success, false = error.
 */
export function validateMessageHeader(header: MessageHeader,
    permissibleMessageType?: object): boolean {
    try {
        if (!header) {
            throw "Header is undefined or null.";
        }
        else if (Object.keys(header).length < 1) {
            throw "Header is empty.";
        }
        else if (!header.messageType || header.messageType.trim().length < 1) {
            throw "'Message Type' is unknown or blank..";
        }
        else if (!validatePermissibleMessageType(header, permissibleMessageType || AppMessageType)) {

        }
        else if (!header.messageID || header.messageID.trim().length < 1) {
            throw "'Message Id' is unknown or blank.";
        }
        else if (!header.messageName || header.messageName.trim().length < 1) {
            throw "'Message Name' is unknown or blank.";
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}

/**
 * Validate app message base header.
 * Permissible message types.
 * 
 * @function validatePermissibleMessageType
 * @param header {MessageHeader} - Message base header. 
 * @param permissibleMessageType {object} - Permissible message types.
 * @return {boolean} - True = success, false = error.
 */
export function validatePermissibleMessageType(header: MessageHeader,
    permissibleMessageType?: object): boolean {
    try {
        let permissible: string[] =
            (Array.isArray(permissibleMessageType) ?
                permissibleMessageType : Object.values(permissibleMessageType || AppMessageType));
        if (!permissible.includes(header.messageType)) {
            throw "Invalid message type '" + header.messageType + "'." +
            "\nMessage type must be " +
            (permissible.length > 1 ?
                "either " + permissible.toString().replace(/\s*([^,]+)$/, ' or $1') :
                permissible[0]);
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}

/**
 * Validate app message header.
 * Concrete header
 *
 * @function validateHeader
 * @param header {Header} - Message header. 
 * @param messageType {string} - Message type.
 * @return {boolean} - True = success, false = error.
 */
export function validateHeader(header: Header, messageType: string): boolean {
    try {
        if (header.messageType !== messageType) {
            throw "Message Type '" +
            header.messageType + "' is not valid. " +
            "It must be '" + messageType + "' type."
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}
