import { GenericHeader, AppMessageHeaderOptions, QueryMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppQueryMessageHeader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
