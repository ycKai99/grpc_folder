# FISAppMessageJSUtility library

FISAppMessageJSUtility library is used to help create message with type and read data type. This library can be shared by all applications and clients.

#### Library setup:

This library depend on FIS-Types and FISAppMessageDistribution library.
Hence, this library inherited these dependencies:
```
  "dependencies": {
    "jsonschema": "^1.2.11",
    "rfdc": "^1.1.4",
    "uuid": "^8.3.1"
  },
  "devDependencies": {
    "@types/node": "^17.0.36"
  }
```

#### Usage:
All client should import services classes exported from "./interface" and should not directly get the classes from other folders. 
```
import { AppMessageType, FisCreateMessageUtility, FisReadDataUtility, NotificationException, NotificationMessage, NotificationData, Query, SampleData, StatusException, StatusResponse, DataTypeProfile, MessageTypeProfile } from "../interface/export";
import { Command, CommandMessage, QueryMessage, RequestMessage, ResponseMessage } from "../interface/export";
```

Then, you should first start create the services classes.

```
const messageUtil:FisCreateMessageUtility = new FisCreateMessageUtility("FisAppID/Name")
const dataUtil: FisReadDataUtility = new FisReadDataUtility();
const messageType: MessageTypeProfile = new MessageTypeProfile();
const dataType: DataTypeProfile = new DataTypeProfile(); 
```

You can refer to file "test\test.ts" for more samples. 

(1) Here a few samples shown below for creating message: 
```
// Client create login message 
const newLoginRequestMessage:RequestMessage = messageUtil.getLoginMessage();  
```
```
// Server create response message  
const newCommandResponseMessage:ResponseMessage = messageUtil.getResponseMessage(newUCPId,{ "statusResponse":{ "status" : "1" }},newCommandMessage,"Response to command",AppMessageType.ResponseStatus,"statusResponse");
```
```
// Client create command message 
const newCommandMessage:CommandMessage = messageUtil.getCommandMessage(newUCPId,Command.New,"Purchase Requisition"); 
```
```
// Client create query message
const newQueryMessage:QueryMessage = messageUtil.getQueryMessage(newUCPId,{ serviceId: "XXX program"}, "Retrieve service ID."); // Sample A
const newQueryMessage_2:QueryMessage = messageUtil.getQueryMessage_ext(newUCPId,"","XXX program", {},"Retrieve service ID."); // Sample B
```
```
// Client\Server create notification message
const newNotificationMessage:NotificationMessage = messageUtil.getNotificationMessage(newUCPId, {"message":"Some event occured."},"New Notification");
```

(2) Here a samples shown below for reading data:  
```
// Client set expected response data
let statusResponseData: StatusResponse;
let statusExceptionData: StatusException;
let sampleData: SampleData;
```
```
// Client read data from message 
console.log("Client read data from query response message");
const queryData = dataUtil.readDataType(newQueryMessage,newQueryResponseMessage, messageType, dataType);
console.log("Message type = " + messageType.name);
console.log("Data type = " + dataType.name); 

// Client interpret based on message type and perform correponding action 
if ( messageType.name == AppMessageType.ResponseStatus ) // Check message type is ResponseStatus  
{
    statusResponseData = queryData as StatusResponse;  // Client would have known the data typing in advance
    // Process data here
    // ...
    console.log(statusResponseData);
}
else if (  messageType.name == AppMessageType.ResponseException ) // Check message type is ResponseException  
{
    statusExceptionData = queryData as StatusException;  // Client would have known the data typing in advance
    // Process data here
    // ...
    console.log(statusExceptionData);
}
else if (  messageType.name == AppMessageType.ResponseData ) // Check message type is ResponseData  
{
     sampleData = queryData as SampleData; // Client would have known the data typing in advance
    // Process data here
    // ...
    console.log(sampleData);
}
else {
    console.log("Invalid message format or data type.");
}
``` 