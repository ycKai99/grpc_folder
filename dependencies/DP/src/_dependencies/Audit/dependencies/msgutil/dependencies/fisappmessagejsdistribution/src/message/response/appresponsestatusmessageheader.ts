/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, GenericHeader, GenericHeaderOf, AppMessageHeaderOptions,
    ResponseStatusMessageParameter as MessageParameter,
    ResponseStatusMessageHeader, ResponseStatus
} from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';

/**
 * App response status message header.
 *
 * @class AppResponseStatusMessageHeader
 */
export class AppResponseStatusMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app response status message header.
     *
     * @class AppResponseStatusMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        // App message base header type is Response.
        this.messageBaseHeaderType = AppMessageType.Response;
        this.messageType = AppMessageType.ResponseStatus;
    }

    /**
     * Create new response status header.
     *
     * @class AppResponseStatusMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ResponseStatusMessageHeader} - New response status header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: ResponseStatusMessageHeader = {} as ResponseStatusMessageHeader;
            header.responseStatus = (messageParameter &&
                messageParameter.responseStatus) || ResponseStatus.AcknowledgeReceived;
            return header as GenericHeaderOf<ResponseStatusMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }
}
