import { MessageDeliveryMode, MessageParameter } from '../../types/appmessagetype';
export declare class AppMessageDeliveryMode {
    protected messageDeliveryMode: MessageDeliveryMode;
    create(messageParameter: MessageParameter): MessageDeliveryMode;
}
export declare function createMessageDeliveryMode(messageParameter: MessageParameter): MessageDeliveryMode;
