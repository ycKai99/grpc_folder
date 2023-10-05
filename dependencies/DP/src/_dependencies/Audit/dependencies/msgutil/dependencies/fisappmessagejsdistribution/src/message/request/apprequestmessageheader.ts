/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, MessageParameter, GenericHeader, GenericHeaderOf,
    AppMessageHeaderOptions, RequestMessageHeader
} from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
import { createMessageResponseRequirement } from '../common/appmessageresponserequirement';

/**
 * App request message header.
 *
 * @class AppRequestMessageHeader
 */
export class AppRequestMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app request message header.
     *
     * @class AppRequestMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Request;
    }

    /**
     * Create new request header.
     *
     * @class AppRequestMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {RequestMessageHeader} - New request header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: RequestMessageHeader = {} as RequestMessageHeader;
            header.requestExecutionMode = (messageParameter && messageParameter.requestExecutionMode) || 0; // default is immediate
            header.responseRequirement = createMessageResponseRequirement(messageParameter);    // Response expected
            header.resquestTimeOut = (messageParameter && messageParameter.resquestTimeOut) || 0;           // default no limit
            return header as GenericHeaderOf<RequestMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }
}
