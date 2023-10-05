import { Message, AppMessageHeaderOptions, ResponseExceptionMessageParameter as MessageParameter, ResponseExceptionMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class appresponseexceptionmessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected responseExceptionMessage: ResponseExceptionMessage;
    protected createMessage(messageParameter: MessageParameter): ResponseExceptionMessage;
}
export declare function createResponseExceptionMessage(messageParameter: MessageParameter): Message;
