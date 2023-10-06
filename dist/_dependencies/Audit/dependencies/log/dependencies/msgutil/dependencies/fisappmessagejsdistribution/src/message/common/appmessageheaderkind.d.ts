/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageType, MessageParameter, GenericHeader, Header, AppMessageHeaderOptions } from '../../types/appmessagetype';
import { AppMessageHeader } from './appmessageheader';
/**
 * Abstract App message header.
 *
 * @class AppMessageHeaderKind
 */
export declare abstract class AppMessageHeaderKind implements AppMessageHeader {
    /**
     * App message header type.
     *
     * @class AppMessageHeaderKind
     * @property messageType
     * @type {MessageType}
     */
    protected messageType: MessageType;
    /**
     * App message header options.
     *
     * @class AppMessageHeaderKind
     * @property options
     * @type {AppMessageHeaderOptions}
     */
    options: AppMessageHeaderOptions;
    /**
     * App Message Header validator.
     *
     * @class AppMessageHeaderKind
     * @property headerValidator
     * @type {Function}
     */
    headerValidator: Function;
    /**
     * Permissible message types.
     *
     * @class AppMessageHeaderKind
     * @property permissibleMessageType
     * @type {object}
     */
    permissibleMessageType: object;
    /**
     * App message base header type.
     * Default is Base
     *
     * @class AppMessageHeaderKind
     * @property messageBaseHeaderType
     * @type {MessageType}
     */
    protected messageBaseHeaderType: MessageType;
    /**
     * App message header.
     *
     * @class AppMessageHeaderKind
     * @property message
     * @type {Header}
     */
    protected header: Header;
    /**
     * Create new app message header.
     *
     * @class AppMessageHeaderKind
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message header options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new app message header.
     *
     * @class AppMessageHeaderKind
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {Header} - App message header.
     */
    create(messageParameter: MessageParameter): Header;
    /**
     * Validate app message.
     *
     * @class AppMessageHeaderKind
     * @method validate
     * @param header {Header} - Message header.
     * @return {boolean} - True = success, false = error.
     */
    validate(header: Header): boolean;
    /**
    * Create new generic header.
    *
    * @class AppMessageHeaderKind
    * @method createHeader
    * @param messageParameter {MessageParameter} - Message parameters.
    * @return {GenericHeader} - New generic header.
    */
    protected abstract createHeader(messageParameter: MessageParameter): GenericHeader;
}
