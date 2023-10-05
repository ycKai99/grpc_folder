import { Message } from '../types/appmessagetype';
export interface AppMessageTransformer {
    transform(message: Message): object;
    validate(message: Message): boolean;
}
