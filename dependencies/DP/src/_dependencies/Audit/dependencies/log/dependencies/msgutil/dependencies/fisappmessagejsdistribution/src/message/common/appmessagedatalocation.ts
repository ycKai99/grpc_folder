/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { ExternalMessageLocation, MessageParameter } from '../../types/appmessagetype';

/**
 * Validate app message data location..
 *
 * @function validate
 * @param dataLocation {ExternalMessageLocation} - Data Location. 
 * @return {boolean} - True = success, false = error.
 */
export function validate(dataLocation: ExternalMessageLocation): boolean {
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

/**
 * App message data location.
 *
 * @class AppMessageDataLocation
 */
export class AppMessageDataLocation {
    /**
     * App message data location.
     * 
     * @class AppMessageDataLocation
     * @property messageDataLocation
     * @type {ExternalMessageLocation}
     */
    protected messageDataLocation: ExternalMessageLocation;

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
    public create(messageParameter: MessageParameter): ExternalMessageLocation {
        try {
            this.messageDataLocation = {} as ExternalMessageLocation;
            this.messageDataLocation.isEmbaded = true;  // Default is embaded data.

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
            throw "Message data location is not valid.\n" + e;;
        }
    }

}

/**
 * Create App message data location.
 *
 * @function createDataLocation
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {ExternalMessageLocation} - App message data location.
 */
export function createDataLocation(messageParameter: MessageParameter): ExternalMessageLocation {
    try {
        return new AppMessageDataLocation().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
