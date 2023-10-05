import { GenericHeader, AppMessageHeaderOptions, MicroserviceNotificationMessageParameter as MessageParameter } from './appnotificationmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppMicroserviceNotificationMessageHeader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
