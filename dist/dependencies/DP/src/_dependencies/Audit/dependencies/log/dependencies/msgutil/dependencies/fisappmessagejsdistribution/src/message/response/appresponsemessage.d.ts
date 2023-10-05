import { Message, MessageParameter, AppMessageHeaderOptions, ResponseMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppResponseMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected responseMessage: ResponseMessage;
    protected createMessage(messageParameter: MessageParameter): ResponseMessage;
}
export declare function createResponseMessage(messageParameter: MessageParameter): Message;
