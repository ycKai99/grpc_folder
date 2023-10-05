import { MessageFormat, MessageParameter } from '../../types/appmessagetype';
export declare function validate(messageFormat: MessageFormat): boolean;
export declare class AppMessageFormat {
    protected messageFormat: MessageFormat;
    create(messageParameter: MessageParameter): MessageFormat;
}
export declare function createMessageFormat(messageParameter: MessageParameter): MessageFormat;
