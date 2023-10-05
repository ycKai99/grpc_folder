import { AppMessageType, NotificationMessage, RequestMessage, ResponseMessage } from '../dependencies/dependencies';
export declare class DataTypeProfile {
    name: string;
}
export declare class MessageTypeProfile {
    name: AppMessageType;
}
export declare class FisReadDataUtility {
    readDataType(request: RequestMessage | NotificationMessage, response: ResponseMessage | NotificationMessage, messageType: MessageTypeProfile, dataType: DataTypeProfile): object;
}
