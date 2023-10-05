import { Message, AppMessageHeaderOptions, ResponseStatusMessageParameter as MessageParameter, ResponseStatusMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppResponseStatusMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected responseStatusMessage: ResponseStatusMessage;
    protected createMessage(messageParameter: MessageParameter): ResponseStatusMessage;
}
export declare function createResponseStatusMessage(messageParameter: MessageParameter): Message;
