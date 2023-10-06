/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Header, MessageParameter, AppMessageHeaderOptions } from '../../types/appmessagetype';
/**
 * App message header.
 *
 * @interface AppMessageHeader
 */
export interface AppMessageHeader {
    /**
     * App message header options.
     *
     * @interface AppMessageHeader
     * @property options
     * @type {AppMessageHeaderOptions}
     */
    options: AppMessageHeaderOptions;
    /**
     * App Message Header validator.
     *
     * @interface AppMessageHeader
     * @property headerValidator
     * @type {Function}
     */
    headerValidator: Function;
    /**
     * Permissible message types.
     *
     * @interface AppMessageHeader
     * @property permissibleMessageType
     * @type {object}
     */
    permissibleMessageType: object;
    /**
     * Create new app message header.
     *
     * @interface AppMessageHeader
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {Header} - App message header.
     */
    create(messageParameter: MessageParameter): Header;
    /**
     * Validate app message header.
     *
     * @interface AppMessageHeader
     * @method validate
     * @param header {Header} - Message header.
     * @return {boolean} - True = success, false = error.
     */
    validate(header: Header): boolean;
}
