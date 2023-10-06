/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericHeader, AppMessageHeaderOptions, ResponseStatusMessageParameter as MessageParameter } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App response status message header.
 *
 * @class AppResponseStatusMessageHeader
 */
export declare class AppResponseStatusMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app response status message header.
     *
     * @class AppResponseStatusMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new response status header.
     *
     * @class AppResponseStatusMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseStatusMessageHeader} - New response status header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
