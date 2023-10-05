/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, GenericHeader, GenericHeaderOf, AppMessageHeaderOptions,
    QueryMessageHeader, Query, QueryMessageParameter as MessageParameter
} from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';

/**
 * App query message header.
 *
 * @class AppQueryMessageHeader
 */
export class AppQueryMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app query message header.
     *
     * @class AppQueryMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        // App message base header type is Request.
        this.messageBaseHeaderType = AppMessageType.Request;
        this.messageType = AppMessageType.Query;
    }

    /**
     * Create new query header.
     *
     * @class AppQueryMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {QueryMessageHeader} - New query header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: QueryMessageHeader = {} as QueryMessageHeader;
            header.query = (messageParameter && messageParameter.query) ||
                Query.General;  // Default is General
            return header as GenericHeaderOf<QueryMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }
}
