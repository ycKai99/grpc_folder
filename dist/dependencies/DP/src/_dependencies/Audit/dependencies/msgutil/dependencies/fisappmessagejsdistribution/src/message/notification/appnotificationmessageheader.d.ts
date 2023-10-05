import { MessageParameter, GenericHeader, AppMessageHeaderOptions } from './appnotificationmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppNotificationMessageHeader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
