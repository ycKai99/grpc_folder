"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const export_1 = require("../interface/export");
const export_2 = require("../interface/export");
const messageUtil = new export_1.FisCreateMessageUtility('FisAppID/Name');
const dataUtil = new export_1.FisReadDataUtility();
const messageType = new export_1.MessageTypeProfile();
const dataType = new export_1.DataTypeProfile();
console.log('Client create login message');
const newLoginRequestMessage = messageUtil.getLoginMessage();
console.log(newLoginRequestMessage);
console.log('Server create login response message');
const newLoginResponseMessage = messageUtil.getResponseMessage('DummyUCPID', { ucpId: 'DummyUCPID' }, newLoginRequestMessage, 'Response to login');
console.log(newLoginResponseMessage);
console.log('Get current UCP ID');
const newUCPId = messageUtil.getUCPId(newLoginResponseMessage);
console.log('CurrentUCPID = ' + newUCPId);
console.log('Client create command message');
const newCommandMessage = messageUtil.getCommandMessage(newUCPId, export_2.Command.New, 'Purchase Requisition');
console.log(newCommandMessage);
let statusResponseData_ext;
let statusExceptionData_ext;
console.log('Server create command response message');
const newCommandResponseMessage = messageUtil.getResponseMessage(newUCPId, { StatusResponse: { status: '1' } }, newCommandMessage, 'Response to command', export_1.AppMessageType.ResponseStatus, 'StatusResponse');
console.log(newCommandResponseMessage);
console.log('Client read data from command response message');
const statusData = dataUtil.readDataType(newCommandMessage, newCommandResponseMessage, messageType, dataType);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);
if (messageType.name == export_1.AppMessageType.ResponseStatus) {
    statusResponseData_ext = statusData;
    console.log(statusResponseData_ext);
}
else if (messageType.name == export_1.AppMessageType.ResponseException) {
    statusExceptionData_ext = statusData;
    console.log(statusExceptionData_ext);
}
console.log('Client create query message');
const newQueryMessage = messageUtil.getQueryMessage(newUCPId, export_1.Query.GetData, { serviceId: 'XXX program' }, 'Retrieve service ID.');
const newQueryMessage_2 = messageUtil.getQueryMessage_ext(newUCPId, '', 'XXX program', {}, 'Retrieve service ID.');
console.log(newQueryMessage);
console.log(newQueryMessage_2);
let statusResponseData;
let statusExceptionData;
let sampleData;
console.log('Server create query response message');
const newQueryResponseMessage = messageUtil.getResponseDataMessage(newUCPId, { SampleData: { id: '1', code: 'TEST' } }, newQueryMessage, 'Response to command', null, 'SampleData');
console.log(newQueryResponseMessage);
console.log('Client read data from query response message');
const queryData = dataUtil.readDataType(newQueryMessage, newQueryResponseMessage, messageType, dataType);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);
if (messageType.name == export_1.AppMessageType.ResponseStatus) {
    statusResponseData = queryData;
    console.log(statusResponseData);
}
else if (messageType.name == export_1.AppMessageType.ResponseException) {
    statusExceptionData = queryData;
    console.log(statusExceptionData);
}
else if (messageType.name == export_1.AppMessageType.ResponseData) {
    sampleData = queryData;
    console.log(sampleData);
}
else {
    console.log('Invalid message format or data type.');
}
console.log('Client\\Server create notification message');
const newNotificationMessage = messageUtil.getNotificationMessage(newUCPId, { NotificationData: { message: 'Some event occured.' } }, 'New Notification');
console.log(newNotificationMessage);
let notificationData;
let notificationException;
console.log('Client read data from notification message');
const dataRead = dataUtil.readDataType(newNotificationMessage, null, messageType, dataType);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);
if (messageType.name == export_1.AppMessageType.Notification) {
    notificationData = dataRead;
    console.log(notificationData);
}
else if (messageType.name == export_1.AppMessageType.NotificationException) {
    notificationException = dataRead;
    console.log(notificationException);
}
setTimeout(() => {
    console.log('Ended test.');
}, 50000);
console.log('Server create summary response message');
const newQueryResponseSummaryMessage = messageUtil.getResponseSummaryMessage(newUCPId, { SummaryResponse: { returnFormatType: 'full' } }, newQueryMessage, 'Summary response.');
console.log(newQueryResponseMessage);
//# sourceMappingURL=test.js.map