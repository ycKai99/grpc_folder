import { Message, MessageParameter } from '../../types/appmessagetype';
export interface AppMessage {
    create(messageParameter: MessageParameter): Message;
    validate(message: Message): boolean;
    validateData(data: unknown): boolean;
}
