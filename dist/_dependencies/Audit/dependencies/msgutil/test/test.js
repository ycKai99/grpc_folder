"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Testing and sample
const export_1 = require("../interface/export");
const export_2 = require("../interface/export");
// Load services classes
const messageUtil = new export_1.FisCreateMessageUtility('FisAppID/Name');
const dataUtil = new export_1.FisReadDataUtility();
const messageType = new export_1.MessageTypeProfile();
const dataType = new export_1.DataTypeProfile();
// Client create login message
console.log('Client create login message');
const newLoginRequestMessage = messageUtil.getLoginMessage();
console.log(newLoginRequestMessage);
// Server create response message
console.log('Server create login response message');
const newLoginResponseMessage = messageUtil.getResponseMessage('DummyUCPID', { ucpId: 'DummyUCPID' }, newLoginRequestMessage, 'Response to login');
console.log(newLoginResponseMessage);
// Get current UCP ID
console.log('Get current UCP ID');
const newUCPId = messageUtil.getUCPId(newLoginResponseMessage);
console.log('CurrentUCPID = ' + newUCPId);
// Client create command message
console.log('Client create command message');
const newCommandMessage = messageUtil.getCommandMessage(newUCPId, export_2.Command.New, 'Purchase Requisition');
console.log(newCommandMessage);
// Client set expected response data
let statusResponseData_ext;
let statusExceptionData_ext;
// Server create response message
console.log('Server create command response message');
const newCommandResponseMessage = messageUtil.getResponseMessage(newUCPId, { StatusResponse: { status: '1' } }, newCommandMessage, 'Response to command', export_1.AppMessageType.ResponseStatus, 'StatusResponse');
console.log(newCommandResponseMessage);
// Client read data from message
console.log('Client read data from command response message');
const statusData = dataUtil.readDataType(newCommandMessage, newCommandResponseMessage, messageType, dataType);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);
// Client interpret based on data type and perform correponding action
if (messageType.name == export_1.AppMessageType.ResponseStatus) {
    statusResponseData_ext = statusData; // Client would have known the data typing in advance
    console.log(statusResponseData_ext);
}
else if (messageType.name == export_1.AppMessageType.ResponseException) {
    statusExceptionData_ext = statusData; // Client would have known the data typing in advance
    console.log(statusExceptionData_ext);
}
// Client create query message
console.log('Client create query message');
const newQueryMessage = messageUtil.getQueryMessage(newUCPId, export_1.Query.GetData, { serviceId: 'XXX program' }, 'Retrieve service ID.'); // Sample A
const newQueryMessage_2 = messageUtil.getQueryMessage_ext(newUCPId, '', 'XXX program', {}, 'Retrieve service ID.'); // Sample B
console.log(newQueryMessage);
console.log(newQueryMessage_2);
// Client set expected response data
let statusResponseData;
let statusExceptionData;
let sampleData;
// Server create response message
console.log('Server create query response message');
const newQueryResponseMessage = messageUtil.getResponseDataMessage(newUCPId, { SampleData: { id: '1', code: 'TEST' } }, newQueryMessage, 'Response to command', null, 'SampleData');
console.log(newQueryResponseMessage);
// Client read data from message
console.log('Client read data from query response message');
const queryData = dataUtil.readDataType(newQueryMessage, newQueryResponseMessage, messageType, dataType);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);
// Client interpret based on message type and perform correponding action
if (messageType.name == export_1.AppMessageType.ResponseStatus) {
    // Check message type is ResponseStatus
    statusResponseData = queryData; // Client would have known the data typing in advance
    // Process data here
    // ...
    console.log(statusResponseData);
}
else if (messageType.name == export_1.AppMessageType.ResponseException) {
    // Check message type is ResponseException
    statusExceptionData = queryData; // Client would have known the data typing in advance
    // Process data here
    // ...
    console.log(statusExceptionData);
}
else if (messageType.name == export_1.AppMessageType.ResponseData) {
    // Check message type is ResponseData
    sampleData = queryData; // Client would have known the data typing in advance
    // Process data here
    // ...
    console.log(sampleData);
}
else {
    console.log('Invalid message format or data type.');
}
// Client\Server create notification message
console.log('Client\\Server create notification message');
const newNotificationMessage = messageUtil.getNotificationMessage(newUCPId, { NotificationData: { message: 'Some event occured.' } }, 'New Notification');
console.log(newNotificationMessage);
// Client set expected response data
let notificationData;
let notificationException;
// Client read data from message
console.log('Client read data from notification message');
const dataRead = dataUtil.readDataType(newNotificationMessage, null, messageType, dataType);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);
// Client interpret based on message type and perform correponding action
if (messageType.name == export_1.AppMessageType.Notification) {
    notificationData = dataRead; // Client would have known the data typing in advance
    console.log(notificationData);
}
else if (messageType.name == export_1.AppMessageType.NotificationException) {
    notificationException = dataRead; // Client would have known the data typing in advance
    console.log(notificationException);
}
setTimeout(() => {
    console.log('Ended test.');
}, 50000);
// Server create test summary message
console.log('Server create summary response message');
const newQueryResponseSummaryMessage = messageUtil.getResponseSummaryMessage(newUCPId, { SummaryResponse: { returnFormatType: 'full' } }, newQueryMessage, 'Summary response.');
console.log(newQueryResponseMessage);
//# sourceMappingURL=test.js.map