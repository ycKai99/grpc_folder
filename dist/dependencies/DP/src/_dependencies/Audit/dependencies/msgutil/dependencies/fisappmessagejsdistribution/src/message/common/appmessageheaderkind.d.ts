import { MessageType, MessageParameter, GenericHeader, Header, AppMessageHeaderOptions } from '../../types/appmessagetype';
import { AppMessageHeader } from './appmessageheader';
export declare abstract class AppMessageHeaderKind implements AppMessageHeader {
    protected messageType: MessageType;
    options: AppMessageHeaderOptions;
    headerValidator: Function;
    permissibleMessageType: object;
    protected messageBaseHeaderType: MessageType;
    protected header: Header;
    constructor(options?: AppMessageHeaderOptions);
    create(messageParameter: MessageParameter): Header;
    validate(header: Header): boolean;
    protected abstract createHeader(messageParameter: MessageParameter): GenericHeader;
}
