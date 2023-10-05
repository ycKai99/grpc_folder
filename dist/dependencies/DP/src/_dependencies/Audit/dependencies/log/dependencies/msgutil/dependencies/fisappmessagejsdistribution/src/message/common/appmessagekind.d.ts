import { Message, MessageType, MessageParameter, AppMessageHeaderOptions } from '../../types/appmessagetype';
import { AppMessage } from './appmessage';
export declare abstract class AppMessageKind implements AppMessage {
    protected messageType: MessageType;
    options: AppMessageHeaderOptions;
    protected message: Message;
    constructor(options?: AppMessageHeaderOptions);
    create(messageParameter: MessageParameter): Message;
    validate(message: Message): boolean;
    validateData(data: unknown): boolean;
    protected abstract createMessage(messageParameter: MessageParameter): Message;
    protected createData(messageParameter: MessageParameter): unknown;
}
