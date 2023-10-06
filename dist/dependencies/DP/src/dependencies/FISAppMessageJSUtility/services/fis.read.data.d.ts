import { AppMessageType, NotificationMessage, RequestMessage, ResponseMessage } from '../dependencies/dependencies';
export declare class DataTypeProfile {
    name: string;
}
export declare class MessageTypeProfile {
    name: AppMessageType;
}
export declare class FisReadDataUtility {
    /**
     * Read and interpret the request and response message to get the data type. This can read notification message as well.
     * @param {RequestMessage|NotificationMessage} request Request message. Must be provided.
     * @param {ResponseMessage|NotificationMessage} response Response message. Optional but required when reading response data.
     * @param {MessageTypeProfile} messageType Type of message.
     * @param {DataTypeProfile} dataType Type of data.
     * @example
     * const dataUtil: FisReadDataUtility = new FisReadDataUtility();
     * const messageType: MessageTypeProfile = new MessageTypeProfile();
     * const dataType: DataTypeProfile = new DataTypeProfile();
     * let data1 = dataUtil.readDataType(req,res,messageType,dataType) // For request and response.
     * let data2 = dataUtil.readDataType(notification,null,messageType,dataType) // For notification.
     * @returns {object} JSON object containing the data.
     */
    readDataType(request: RequestMessage | NotificationMessage, response: ResponseMessage | NotificationMessage, messageType: MessageTypeProfile, dataType: DataTypeProfile): object;
}
