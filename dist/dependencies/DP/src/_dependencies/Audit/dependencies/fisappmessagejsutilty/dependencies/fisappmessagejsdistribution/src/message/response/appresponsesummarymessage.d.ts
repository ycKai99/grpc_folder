import { Message, AppMessageHeaderOptions, ResponseStatusMessageParameter as MessageParameter, ResponseSummaryMessage } from './appresponsemessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppResponseSummaryMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected responseSummaryMessage: ResponseSummaryMessage;
    protected createMessage(messageParameter: MessageParameter): ResponseSummaryMessage;
}
export declare function createResponseSummaryMessage(messageParameter: MessageParameter): Message;
