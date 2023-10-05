import { Message, MessageParameter, NotificationMessage, AppMessageHeaderOptions } from './appnotificationmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppNotificationMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected notificationMessage: NotificationMessage;
    protected createMessage(messageParameter: MessageParameter): NotificationMessage;
}
export declare function createNotificationMessage(messageParameter: MessageParameter): Message;
