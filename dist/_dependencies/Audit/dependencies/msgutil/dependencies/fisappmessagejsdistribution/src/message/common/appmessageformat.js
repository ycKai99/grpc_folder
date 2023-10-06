"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageFormat = exports.AppMessageFormat = exports.validate = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../../types/appmessagetype");
/**
 * Validate app message data format.
 *
 * @function validate
 * @param messageFormat {MessageFormat} - Message data format.
 * @return {boolean} - True = success, false = error.
 */
function validate(messageFormat) {
    try {
        if (!messageFormat) {
            throw "Message data format is undefined or null.";
        }
        else if (Object.keys(messageFormat).length < 1) {
            throw "Message data format is empty.";
        }
        else if (!messageFormat.dataFormat || messageFormat.dataFormat.trim().length < 1) {
            throw "'Data Format' is unknown or blank..";
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}
exports.validate = validate;
/**
 * App message format.
 *
 * @class AppMessageFormat
 */
class AppMessageFormat {
    /**
     * Create new message format.
     * Compositable definition. Data message format details which is
     * required in different types of messages. Format can be used
     * (1) defining message when establishing commuincation protocal.
     * (2) defining message data section.
     * (3) defining a field in the message data section.
     *
     * @class AppMessageFormat
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageFormat} - Message format.
     */
    create(messageParameter) {
        try {
            this.messageFormat = {};
            this.messageFormat.dataFormat = appmessagetype_1.DataFormat.Json; // Required. Default is JSON
            if (messageParameter && messageParameter.dataFormat) {
                if (messageParameter.dataFormat.hasOwnProperty("dataFormat")) {
                    this.messageFormat.dataFormat = messageParameter.dataFormat.dataFormat;
                }
                if (messageParameter.dataFormat.fileFormat) {
                    this.messageFormat.fileFormat = messageParameter.dataFormat.fileFormat;
                }
                if (messageParameter.dataFormat.mediaType) {
                    this.messageFormat.mediaType = messageParameter.dataFormat.mediaType;
                }
                if (messageParameter.dataFormat.schemaType) {
                    this.messageFormat.schemaType = messageParameter.dataFormat.schemaType;
                }
                if (messageParameter.dataFormat.schema) {
                    this.messageFormat.schema = messageParameter.dataFormat.schema;
                }
            }
            validate(this.messageFormat);
            return this.messageFormat;
        }
        catch (e) {
            throw "Message data format is not valid.\n" + e;
        }
    }
}
exports.AppMessageFormat = AppMessageFormat;
/**
 * Create App message format.
 *
 * @function createMessageFormat
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {MessageFormat} - Message format.
 */
function createMessageFormat(messageParameter) {
    try {
        return new AppMessageFormat().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessageFormat = createMessageFormat;
//# sourceMappingURL=appmessageformat.js.map