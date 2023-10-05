import { MessageParameter, GenericHeader, AppMessageHeaderOptions } from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppRequestMessageHeader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
