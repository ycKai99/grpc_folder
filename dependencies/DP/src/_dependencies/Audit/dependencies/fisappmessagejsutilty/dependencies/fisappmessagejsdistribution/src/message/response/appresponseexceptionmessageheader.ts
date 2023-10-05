/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, GenericHeader, GenericHeaderOf, AppMessageHeaderOptions,
    ResponseExceptionMessageParameter as MessageParameter,
    ResponseExceptionMessageHeader, ExceptionType
} from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';

/**
 * App response exception message header.
 *
 * @class appresponseexceptionmessageheader
 */
export class appresponseexceptionmessageheader extends AppMessageHeaderKind {
    /**
     * Create new app response exception message header.
     *
     * @class appresponseexceptionmessageheader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        // App message base header type is Response.
        this.messageBaseHeaderType = AppMessageType.Response;
        this.messageType = AppMessageType.ResponseException;
    }

    /**
     * Create new response exception header.
     *
     * @class appresponseexceptionmessageheader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ResponseExceptionMessageHeader} - New response exception header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: ResponseExceptionMessageHeader = {} as ResponseExceptionMessageHeader;
            header.exception = {};
            header.exception.exceptionType = (messageParameter &&
                messageParameter.responseException) || ExceptionType.InvalidRequest;
            return header as GenericHeaderOf<ResponseExceptionMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }
}
