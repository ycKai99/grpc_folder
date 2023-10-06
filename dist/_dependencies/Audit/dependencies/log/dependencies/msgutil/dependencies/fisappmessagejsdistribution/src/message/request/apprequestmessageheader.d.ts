/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, GenericHeader, AppMessageHeaderOptions } from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App request message header.
 *
 * @class AppRequestMessageHeader
 */
export declare class AppRequestMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app request message header.
     *
     * @class AppRequestMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new request header.
     *
     * @class AppRequestMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {RequestMessageHeader} - New request header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
