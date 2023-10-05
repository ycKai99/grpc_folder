import { Message, MicroserviceNotificationMessage, MicroserviceNotificationMessageParameter as MessageParameter, AppMessageHeaderOptions } from './appnotificationmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppMicroserviceNotificationMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected microserviceNotificationMessage: MicroserviceNotificationMessage;
    protected createMessage(messageParameter: MessageParameter): MicroserviceNotificationMessage;
}
export declare function createMicroserviceNotificationMessage(messageParameter: MessageParameter): Message;
