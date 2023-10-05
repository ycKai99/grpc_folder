import { Message, CommandMessage, AppMessageHeaderOptions, CommandMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class AppCommandMessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected commandMessage: CommandMessage;
    protected createMessage(messageParameter: MessageParameter): CommandMessage;
}
export declare function createCommandMessage(messageParameter: MessageParameter): Message;
