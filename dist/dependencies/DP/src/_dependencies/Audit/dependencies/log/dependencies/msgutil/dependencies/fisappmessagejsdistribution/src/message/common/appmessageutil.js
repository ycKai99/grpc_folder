"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = exports.isOfMessageId = exports.isOfMessageType = exports.isOfType = exports.isMessage = exports.AppMessageUtil = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
const schema = require("../../schema/FisAppMessageSchema.json");
class AppMessageUtil {
    static initialise() {
        if (this.__initialised) {
        }
        else {
        }
        return true;
    }
    static isRequired(object, typeName) {
        return (typeof object === 'object' &&
            schema.definitions[typeName] &&
            schema.definitions[typeName].required &&
            schema.definitions[typeName].required.filter((item) => Object.keys(object).indexOf(item) < 0).length === 0);
    }
    static isMessage(message) {
        return this.isRequired(message, appmessagetype_1.TypeOfMessage.Message);
    }
    static isMessageHeader(messageHeader) {
        return this.isRequired(messageHeader, "MessageHeader");
    }
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
                else if (!this.isRequired(message.header, ref)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return this.isRequired(message.header, type);
        }
    }
    static isOfType(message, type) {
        let headerType;
        if (this.isMessage(message) &&
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
    static isOfMessageType(message, type) {
        return (message && message.header && message.header.messageType &&
            message.header.messageType === type);
    }
    static isOfMessageId(message, id) {
        return (message && message.header && message.header.messageID &&
            message.header.messageID === id);
    }
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
function isMessage(message) {
    try {
        return AppMessageUtil.isMessage(message);
    }
    catch (e) {
        throw e;
    }
}
exports.isMessage = isMessage;
function isOfType(message, type) {
    try {
        return AppMessageUtil.isOfType(message, type);
    }
    catch (e) {
        throw e;
    }
}
exports.isOfType = isOfType;
function isOfMessageType(message, type) {
    try {
        return AppMessageUtil.isOfMessageType(message, type);
    }
    catch (e) {
        throw e;
    }
}
exports.isOfMessageType = isOfMessageType;
function isOfMessageId(message, id) {
    try {
        return AppMessageUtil.isOfMessageId(message, id);
    }
    catch (e) {
        throw e;
    }
}
exports.isOfMessageId = isOfMessageId;
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