/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericHeader, AppMessageHeaderOptions, QueryMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App query message header.
 *
 * @class AppQueryMessageHeader
 */
export declare class AppQueryMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app query message header.
     *
     * @class AppQueryMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new query header.
     *
     * @class AppQueryMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {QueryMessageHeader} - New query header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
