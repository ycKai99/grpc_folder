import { Message, MessageHeader, MessageType, TypeOfMessage } from '../../types/appmessagetype';
export type FilterType = TypeOfMessage[] | TypeOfMessage;
export type FilterStringType = string[] | string;
export type FilterMessgeType = MessageType[] | MessageType;
export interface FilterOption {
    type?: FilterType;
    id?: FilterStringType;
    messageTypes?: FilterMessgeType;
}
export declare class AppMessageUtil {
    protected static __initialised: boolean;
    protected static initialise(): boolean;
    static isRequired(object: any, typeName: string): boolean;
    static isMessage(message: Message): boolean;
    static isMessageHeader(messageHeader: MessageHeader): boolean;
    protected static isAllOf(message: Message, type: string): boolean;
    static isOfType(message: Message, type: TypeOfMessage): boolean;
    static isOfMessageType(message: Message, type: MessageType): boolean;
    static isOfMessageId(message: Message, id: string): boolean;
    static filterByType(message: Message[], type: FilterType): Message[];
    static filterByMessageId(message: Message[], id: FilterStringType): Message[];
    static filterByMessageType(message: Message[], messageType: FilterMessgeType): Message[];
    static filter(message: Message[], option: FilterOption): Message[];
}
export declare function isMessage(message: Message): boolean;
export declare function isOfType(message: Message, type: TypeOfMessage): boolean;
export declare function isOfMessageType(message: Message, type: MessageType): boolean;
export declare function isOfMessageId(message: Message, id: string): boolean;
export declare function filter(message: Message[], option: FilterOption): Message[];
