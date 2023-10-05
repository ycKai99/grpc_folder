"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageFormat = exports.AppMessageFormat = exports.validate = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
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
class AppMessageFormat {
    create(messageParameter) {
        try {
            this.messageFormat = {};
            this.messageFormat.dataFormat = appmessagetype_1.DataFormat.Json;
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