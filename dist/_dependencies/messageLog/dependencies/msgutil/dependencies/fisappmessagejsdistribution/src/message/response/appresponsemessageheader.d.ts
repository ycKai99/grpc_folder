/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, Header, GenericHeader, AppResponseMessageHeaderOptions as AppMessageHeaderOptions } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App response message header.
 *
 * @class AppResponseMessageHeader
 */
export declare class AppResponseMessageHeader extends AppMessageHeaderKind {
    /**
     * Respond to message validator.
     *
     * @class AppResponseMessageHeader
     * @property respondToMessageValidator
     * @type {Function}
     */
    respondToMessageValidator: Function;
    /**
     * Permissible respond to message types.
     *
     * @class AppResponseMessageHeader
     * @property permissibleRespondToMessageType
     * @type {object}
     */
    permissibleRespondToMessageType: object;
    /**
     * Create new app response message header.
     *
     * @class AppResponseMessageHeader
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new response header.
     *
     * @class AppResponseMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseMessageHeader} - New response header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
    /**
     * Validate app message.
     *
     * @class AppResponseMessageHeader
     * @method validate
     * @param header {Header} - Message header.
     * @return {boolean} - True = success, false = error.
     */
    validate(header: Header): boolean;
}
