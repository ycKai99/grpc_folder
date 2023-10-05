import { MessageType, Header, MessageParameter } from '../types/appmessagetype';
import { AppMessageHeader } from './common/appmessageheader';
export declare class AppMessageHeaderCreator {
    protected static __initialised: boolean;
    static messageHeaders: object;
    protected static initialise(): boolean;
    static new(alias: MessageType, options?: any): AppMessageHeader;
    static create(messageParameter: MessageParameter, options?: any): Header;
}
export declare function createMessageHeader(messageParameter: MessageParameter, options?: any): Header;
