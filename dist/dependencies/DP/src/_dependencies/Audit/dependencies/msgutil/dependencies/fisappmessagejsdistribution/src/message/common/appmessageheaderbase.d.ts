import { MessageHeader, Header, MessageType, MessageParameter, AppMessageHeaderOptions } from '../../types/appmessagetype';
import { AppMessageHeader } from './appmessageheader';
export declare class AppMessageHeaderBase implements AppMessageHeader {
    protected messageType: MessageType;
    options: AppMessageHeaderOptions;
    headerValidator: Function;
    permissibleMessageType: object;
    protected header: MessageHeader;
    constructor(options?: AppMessageHeaderOptions);
    create(messageParameter: MessageParameter): Header;
    validate(header: MessageHeader): boolean;
    protected createHeader(messageParameter: MessageParameter): MessageHeader;
    protected generateId(): string;
}
