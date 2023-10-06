/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, GenericHeader, AppMessageHeaderOptions } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App response data message header.
 *
 * @class AppResponseDataMessageHeader
 */
export declare class AppResponseDataMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app response data message header.
     *
     * @class AppResponseDataMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new response data header.
     *
     * @class AppResponseDataMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {GenericHeader} - New response data header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
