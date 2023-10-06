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
export declare function validate(dataLocation: ExternalMessageLocation): boolean;
/**
 * App message data location.
 *
 * @class AppMessageDataLocation
 */
export declare class AppMessageDataLocation {
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
    create(messageParameter: MessageParameter): ExternalMessageLocation;
}
/**
 * Create App message data location.
 *
 * @function createDataLocation
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {ExternalMessageLocation} - App message data location.
 */
export declare function createDataLocation(messageParameter: MessageParameter): ExternalMessageLocation;
