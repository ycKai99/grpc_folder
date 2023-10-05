import { Message, MessageHeader, Header } from '../../types/appmessagetype';
export declare function validateMessage(message: Message): boolean;
export declare function validateSchema(message: Message): boolean;
export declare function validateMessageData(data: unknown): boolean;
export declare function validateMessageHeader(header: MessageHeader, permissibleMessageType?: object): boolean;
export declare function validatePermissibleMessageType(header: MessageHeader, permissibleMessageType?: object): boolean;
export declare function validateHeader(header: Header, messageType: string): boolean;
