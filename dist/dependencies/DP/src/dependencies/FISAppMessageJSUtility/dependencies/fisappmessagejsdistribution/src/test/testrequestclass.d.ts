import { RequestMessage, MessageHeader, RequestHeader, ExternalMessageLocation, MessageFormat, MessageProducerInformation, MessageSecurity, MessageType } from '../types/appmessagetype';
export declare class header implements MessageHeader {
    [k: string]: unknown;
    messageDataLocation?: ExternalMessageLocation;
    messageDataFormat?: MessageFormat;
    messageType: MessageType;
    messageID: string;
    messageName: string;
    dateCreated: string;
    isAggregate: boolean;
    messageProducerInformation: MessageProducerInformation;
    security: MessageSecurity;
}
export declare class Request implements RequestMessage {
    header: RequestHeader;
    data: unknown;
}
