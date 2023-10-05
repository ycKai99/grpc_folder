import { Message, MessageType, MessageParameter } from '../types/appmessagetype';
import { AppMessage } from './common/appmessage';
import * as Messages from './messages';
export type DefaultModule = typeof Messages;
export declare class AppMessageCreator {
    protected static __initialised: boolean;
    static messages: object;
    protected static initialise(): boolean;
    static new(alias: MessageType, options?: any): AppMessage;
    static create(messageParameter: MessageParameter, options?: any): Message;
}
export declare function createMessage(messageParameter: MessageParameter, options?: any): Message;
