import { MessageParameter, Header, GenericHeader, AppResponseMessageHeaderOptions as AppMessageHeaderOptions } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppResponseMessageHeader extends AppMessageHeaderKind {
    respondToMessageValidator: Function;
    permissibleRespondToMessageType: object;
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
    validate(header: Header): boolean;
}
