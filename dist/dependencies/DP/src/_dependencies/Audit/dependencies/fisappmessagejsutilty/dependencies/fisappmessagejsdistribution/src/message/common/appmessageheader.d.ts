import { Header, MessageParameter, AppMessageHeaderOptions } from '../../types/appmessagetype';
export interface AppMessageHeader {
    options: AppMessageHeaderOptions;
    headerValidator: Function;
    permissibleMessageType: object;
    create(messageParameter: MessageParameter): Header;
    validate(header: Header): boolean;
}
