"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHeader = exports.validatePermissibleMessageType = exports.validateMessageHeader = exports.validateMessageData = exports.validateSchema = exports.validateMessage = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessageschema_1 = require("./appmessageschema");
function validateMessage(message) {
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
exports.validateMessage = validateMessage;
function validateSchema(message) {
    try {
        return (0, appmessageschema_1.validateSchema)(message);
    }
    catch (e) {
        throw e;
    }
}
exports.validateSchema = validateSchema;
function validateMessageData(data) {
    return true;
}
exports.validateMessageData = validateMessageData;
function validateMessageHeader(header, permissibleMessageType) {
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
        else if (!validatePermissibleMessageType(header, permissibleMessageType || appmessagetype_1.AppMessageType)) {
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
exports.validateMessageHeader = validateMessageHeader;
function validatePermissibleMessageType(header, permissibleMessageType) {
    try {
        let permissible = (Array.isArray(permissibleMessageType) ?
            permissibleMessageType : Object.values(permissibleMessageType || appmessagetype_1.AppMessageType));
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
exports.validatePermissibleMessageType = validatePermissibleMessageType;
function validateHeader(header, messageType) {
    try {
        if (header.messageType !== messageType) {
            throw "Message Type '" +
                header.messageType + "' is not valid. " +
                "It must be '" + messageType + "' type.";
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}
exports.validateHeader = validateHeader;
//# sourceMappingURL=appmessagevalidation.js.map