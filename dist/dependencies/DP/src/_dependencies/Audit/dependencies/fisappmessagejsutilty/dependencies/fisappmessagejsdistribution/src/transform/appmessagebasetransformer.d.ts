import { Message } from '../types/appmessagetype';
import { AppMessageTransformer } from './appmessagetransformer';
export declare class AppMessageBaseTransformer implements AppMessageTransformer {
    transform(message: Message): object;
    validate(message: Message): boolean;
}
