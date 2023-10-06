/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageHeader, Header, MessageType, MessageParameter, AppMessageHeaderOptions } from '../../types/appmessagetype';
import { AppMessageHeader } from './appmessageheader';
/**
 * App message common(base) header.
 *
 * @class AppMessageHeaderBase
 */
export declare class AppMessageHeaderBase implements AppMessageHeader {
    /**
     * App message header type.
     *
     * @class AppMessageHeaderBase
     * @property messageType
     * @type {MessageType}
     */
    protected messageType: MessageType;
    /**
     * App message common(base) header options.
     *
     * @class AppMessageHeaderBase
     * @property options
     * @type {AppMessageHeaderOptions}
     */
    options: AppMessageHeaderOptions;
    /**
     * App Message common(base) Header validator.
     *
     * @class AppMessageHeaderBase
     * @property headerValidator
     * @type {Function}
     */
    headerValidator: Function;
    /**
     * Permissible message types.
     *
     * @class AppMessageHeaderBase
     * @property permissibleMessageType
     * @type {object}
     */
    permissibleMessageType: object;
    /**
     * App Message common(base) Header.
     *
     * @class AppMessageHeaderBase
     * @property message
     * @type {MessageHeader}
     */
    protected header: MessageHeader;
    /**
     * Create new app message base header.
     *
     * @class AppMessageHeaderBase
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message header options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new app message common(base) header.
     *
     * @class AppMessageHeaderBase
     * @method creates
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageHeader as Header} - App message header.
     */
    create(messageParameter: MessageParameter): Header;
    /**
     * Validate app message header.
     *
     * @interface AppMessageHeaderBase
     * @method validate
     * @param header {MessageHeader} - Message header.
     * @return {boolean} - True = success, false = error.
     */
    validate(header: MessageHeader): boolean;
    /**
     * Create new message common(base)header.
     *
     * @class AppMessageHeaderBase
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageHeader} - Message header.
     */
    protected createHeader(messageParameter: MessageParameter): MessageHeader;
    /**
     * Generate new message id.
     *
     * @class AppMessageHeaderBase
     * @method generateId
     * @param
     * @return {string} - New Id.
     */
    protected generateId(): string;
}
