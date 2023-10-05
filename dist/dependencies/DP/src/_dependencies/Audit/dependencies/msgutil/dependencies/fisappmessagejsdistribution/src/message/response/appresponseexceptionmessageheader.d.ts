import { GenericHeader, AppMessageHeaderOptions, ResponseExceptionMessageParameter as MessageParameter } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class appresponseexceptionmessageheader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
