import { Message, MessageType } from '../types/appmessagetype';
import { AppMessageTransformer } from './appmessagetransformer';
export declare abstract class AppMessageTransformerKind implements AppMessageTransformer {
    protected baseTransformerType: MessageType[];
    permissibleMessageType: MessageType;
    constructor();
    transform(message: Message): object;
    validate(message: Message): boolean;
    protected transformBase(message: Message): object;
    protected abstract transformExtensions(message: Message): object;
}
