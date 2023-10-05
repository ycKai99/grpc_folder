import { GenericHeader, AppMessageHeaderOptions, SubscriptionMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class appsubscriptionmessageheader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
    protected dateToString(date: any): string;
}
