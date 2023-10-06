"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FisReadDataUtility = exports.MessageTypeProfile = exports.DataTypeProfile = void 0;
class DataTypeProfile {
}
exports.DataTypeProfile = DataTypeProfile;
class MessageTypeProfile {
}
exports.MessageTypeProfile = MessageTypeProfile;
class FisReadDataUtility {
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
    readDataType(request, response, messageType, dataType) {
        try {
            let data = {};
            let message;
            if (!response) {
                message = request;
            }
            else {
                message = response;
            }
            // Read message
            messageType.name = message.header.messageType;
            dataType.name = message.header.messageDataFormat.schema.name;
            data = message.data[dataType.name];
            return data;
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
}
exports.FisReadDataUtility = FisReadDataUtility;
//# sourceMappingURL=fis.read.data.js.map