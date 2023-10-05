import { Message, MessageParameter, RequestMessage, AppMessageHeaderOptions } from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppRequestMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected requestMessage: RequestMessage;
    protected createMessage(messageParameter: MessageParameter): RequestMessage;
}
export declare function createRequestMessage(messageParameter: MessageParameter): Message;
