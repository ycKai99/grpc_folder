/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, GenericHeader, GenericHeaderOf, AppMessageHeaderOptions,
    ResponseSummaryMessageParameter as MessageParameter,
    ResponseMessageHeader
} from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';

/**
 * App response summary message header.
 *
 * @class AppResponseSummaryMessageHeader
 */
export class AppResponseSummaryMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app response summary message header.
     *
     * @class AppResponseSummaryMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        // App message base header type is Response.
        this.messageBaseHeaderType = AppMessageType.Response;
        this.messageType = AppMessageType.ResponseSummary;
    }

    /**
     * Create new response summary header.
     *
     * @class AppResponseSummaryMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ResponseMessageHeader} - New response summary header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: ResponseMessageHeader = {} as ResponseMessageHeader;

            return header as GenericHeaderOf<ResponseMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }
}
