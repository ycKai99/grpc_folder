/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericHeader, AppMessageHeaderOptions, ResponseSummaryMessageParameter as MessageParameter } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App response summary message header.
 *
 * @class AppResponseSummaryMessageHeader
 */
export declare class AppResponseSummaryMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app response summary message header.
     *
     * @class AppResponseSummaryMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new response summary header.
     *
     * @class AppResponseSummaryMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseMessageHeader} - New response summary header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
