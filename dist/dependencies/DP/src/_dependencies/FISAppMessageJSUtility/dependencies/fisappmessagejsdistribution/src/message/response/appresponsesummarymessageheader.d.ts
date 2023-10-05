import { GenericHeader, AppMessageHeaderOptions, ResponseSummaryMessageParameter as MessageParameter } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppResponseSummaryMessageHeader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
