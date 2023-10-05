import { RequestMessage, MessageHeader, RequestMessageHeader, RequestHeader, ExternalMessageLocation, MessageFormat, MessageProducerInformation, MessageSecurity, MessageType } from '../types/appmessagetype';

export class header implements MessageHeader {
    [k: string]: unknown;
    messageDataLocation?: ExternalMessageLocation;
    messageDataFormat?: MessageFormat;
    messageType: MessageType = null;
    messageID: string = null;
    messageName: string= null;
    dateCreated: string= null;
    isAggregate: boolean= null;
    messageProducerInformation: MessageProducerInformation = null;
    security: MessageSecurity = null;
}

export class Request implements RequestMessage  {

    header: RequestHeader = null;
    data: unknown = null;

    

}