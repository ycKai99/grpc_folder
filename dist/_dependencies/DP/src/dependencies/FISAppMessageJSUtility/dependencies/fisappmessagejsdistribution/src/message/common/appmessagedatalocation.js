"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataLocation = exports.AppMessageDataLocation = exports.validate = void 0;
/**
 * Validate app message data location..
 *
 * @function validate
 * @param dataLocation {ExternalMessageLocation} - Data Location.
 * @return {boolean} - True = success, false = error.
 */
function validate(dataLocation) {
    try {
        if (!dataLocation) {
            throw "Data Location is undefined or null.";
        }
        else if (Object.keys(dataLocation).length < 1) {
            throw "Data Location is empty.";
        }
        else if (!dataLocation.isEmbaded) {
            // For non-embaded data, specific location where data can be read. 
            if ((!dataLocation.fileName || dataLocation.fileName.trim().length < 1) &&
                (!dataLocation.url || dataLocation.url.trim().length < 1)) {
                throw "For non-embaded data, specific location(File name or URL) where data can be read.\n";
            }
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}
exports.validate = validate;
/**
 * App message data location.
 *
 * @class AppMessageDataLocation
 */
class AppMessageDataLocation {
    /**
     * Create new message data location.
     * Compositable definition. Can be included in message header or message
     * data. For non-embaded data, specific location where data can be read.
     * Applicatiion for all message action type.
     *
     * @class AppMessageDataLocation
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ExternalMessageLocation} - App message data location.
     */
    create(messageParameter) {
        try {
            this.messageDataLocation = {};
            this.messageDataLocation.isEmbaded = true; // Default is embaded data.
            if (messageParameter && messageParameter.dataLocation) {
                if (messageParameter.dataLocation.hasOwnProperty("isEmbaded")) {
                    this.messageDataLocation.isEmbaded = messageParameter.dataLocation.isEmbaded;
                }
                if (messageParameter.dataLocation.accessId) {
                    this.messageDataLocation.accessId = messageParameter.dataLocation.accessId;
                }
                if (messageParameter.dataLocation.accessPassword) {
                    this.messageDataLocation.accessPassword = messageParameter.dataLocation.accessPassword;
                }
                if (messageParameter.dataLocation.fileName) {
                    this.messageDataLocation.fileName = messageParameter.dataLocation.fileName;
                }
                if (messageParameter.dataLocation.url) {
                    this.messageDataLocation.url = messageParameter.dataLocation.url;
                }
            }
            validate(this.messageDataLocation);
            return this.messageDataLocation;
        }
        catch (e) {
            throw "Message data location is not valid.\n" + e;
            ;
        }
    }
}
exports.AppMessageDataLocation = AppMessageDataLocation;
/**
 * Create App message data location.
 *
 * @function createDataLocation
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {ExternalMessageLocation} - App message data location.
 */
function createDataLocation(messageParameter) {
    try {
        return new AppMessageDataLocation().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createDataLocation = createDataLocation;
//# sourceMappingURL=appmessagedatalocation.js.map