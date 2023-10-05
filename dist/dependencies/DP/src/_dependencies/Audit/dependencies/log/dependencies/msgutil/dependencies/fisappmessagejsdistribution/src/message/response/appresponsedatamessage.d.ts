import { Message, MessageParameter, AppMessageHeaderOptions, ResponseDataMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppResponseDataMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected responseDataMessage: ResponseDataMessage;
    protected createMessage(messageParameter: MessageParameter): ResponseDataMessage;
}
export declare function createResponseDataMessage(messageParameter: MessageParameter): Message;
