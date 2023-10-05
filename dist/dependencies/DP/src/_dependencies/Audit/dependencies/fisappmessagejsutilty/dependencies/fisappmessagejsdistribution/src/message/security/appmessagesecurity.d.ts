import { MessageSecurity, MessageParameter } from '../../types/appmessagetype';
export declare function validate(messageSecurity: MessageSecurity): boolean;
export declare class AppMessageSecurity {
    protected messageSecurity: MessageSecurity;
    create(messageParameter: MessageParameter): MessageSecurity;
}
export declare function createSecurity(messageParameter: MessageParameter): MessageSecurity;
