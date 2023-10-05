import { GenericHeader, AppMessageHeaderOptions, CommandMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppCommandMessageHeader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
