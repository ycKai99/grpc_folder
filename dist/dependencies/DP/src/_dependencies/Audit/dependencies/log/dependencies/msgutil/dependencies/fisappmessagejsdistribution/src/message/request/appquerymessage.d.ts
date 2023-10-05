import { Message, QueryMessage, AppMessageHeaderOptions, QueryMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppQueryMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected queryMessage: QueryMessage;
    protected createMessage(messageParameter: MessageParameter): QueryMessage;
}
export declare function createQueryMessage(messageParameter: MessageParameter): Message;
