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