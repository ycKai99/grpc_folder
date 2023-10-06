/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericHeader, AppMessageHeaderOptions, ResponseExceptionMessageParameter as MessageParameter } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App response exception message header.
 *
 * @class appresponseexceptionmessageheader
 */
export declare class appresponseexceptionmessageheader extends AppMessageHeaderKind {
    /**
     * Create new app response exception message header.
     *
     * @class appresponseexceptionmessageheader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new response exception header.
     *
     * @class appresponseexceptionmessageheader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseExceptionMessageHeader} - New response exception header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
