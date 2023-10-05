// Testing and sample
import {
  AppMessageType,
  FisCreateMessageUtility,
  FisReadDataUtility,
  NotificationException,
  NotificationMessage,
  NotificationData,
  Query,
  SampleData,
  StatusException,
  StatusResponse,
  DataTypeProfile,
  MessageTypeProfile,
} from '../interface/export';
import {
  Command,
  CommandMessage,
  QueryMessage,
  RequestMessage,
  ResponseMessage,
} from '../interface/export';

// Load services classes
const messageUtil: FisCreateMessageUtility = new FisCreateMessageUtility(
  'FisAppID/Name',
);
const dataUtil: FisReadDataUtility = new FisReadDataUtility();
const messageType: MessageTypeProfile = new MessageTypeProfile();
const dataType: DataTypeProfile = new DataTypeProfile();

// Client create login message
console.log('Client create login message');
const newLoginRequestMessage: RequestMessage = messageUtil.getLoginMessage();
console.log(newLoginRequestMessage);

// Server create response message
console.log('Server create login response message');
const newLoginResponseMessage: ResponseMessage = messageUtil.getResponseMessage(
  'DummyUCPID',
  { ucpId: 'DummyUCPID' },
  newLoginRequestMessage,
  'Response to login',
);
console.log(newLoginResponseMessage);

// Get current UCP ID
console.log('Get current UCP ID');
const newUCPId: string = messageUtil.getUCPId(newLoginResponseMessage);
console.log('CurrentUCPID = ' + newUCPId);

// Client create command message
console.log('Client create command message');
const newCommandMessage: CommandMessage = messageUtil.getCommandMessage(
  newUCPId,
  Command.New,
  'Purchase Requisition',
);
console.log(newCommandMessage);

// Client set expected response data
let statusResponseData_ext: StatusResponse;
let statusExceptionData_ext: StatusException;

// Server create response message
console.log('Server create command response message');
const newCommandResponseMessage: ResponseMessage =
  messageUtil.getResponseMessage(
    newUCPId,
    { StatusResponse: { status: '1' } },
    newCommandMessage,
    'Response to command',
    AppMessageType.ResponseStatus,
    'StatusResponse',
  );
console.log(newCommandResponseMessage);

// Client read data from message
console.log('Client read data from command response message');
const statusData = dataUtil.readDataType(
  newCommandMessage,
  newCommandResponseMessage,
  messageType,
  dataType,
);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);

// Client interpret based on data type and perform correponding action
if (messageType.name == AppMessageType.ResponseStatus) {
  statusResponseData_ext = statusData as StatusResponse; // Client would have known the data typing in advance
  console.log(statusResponseData_ext);
} else if (messageType.name == AppMessageType.ResponseException) {
  statusExceptionData_ext = statusData as StatusException; // Client would have known the data typing in advance
  console.log(statusExceptionData_ext);
}

// Client create query message
console.log('Client create query message');
const newQueryMessage: QueryMessage = messageUtil.getQueryMessage(
  newUCPId,
  Query.GetData,
  { serviceId: 'XXX program' },
  'Retrieve service ID.',
); // Sample A
const newQueryMessage_2: QueryMessage = messageUtil.getQueryMessage_ext(
  newUCPId,
  '',
  'XXX program',
  {},
  'Retrieve service ID.',
); // Sample B
console.log(newQueryMessage);
console.log(newQueryMessage_2);

// Client set expected response data
let statusResponseData: StatusResponse;
let statusExceptionData: StatusException;
let sampleData: SampleData;

// Server create response message
console.log('Server create query response message');
const newQueryResponseMessage: ResponseMessage =
  messageUtil.getResponseDataMessage(
    newUCPId,
    { SampleData: { id: '1', code: 'TEST' } },
    newQueryMessage,
    'Response to command',
    null,
    'SampleData',
  );
console.log(newQueryResponseMessage);

// Client read data from message
console.log('Client read data from query response message');
const queryData = dataUtil.readDataType(
  newQueryMessage,
  newQueryResponseMessage,
  messageType,
  dataType,
);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);

// Client interpret based on message type and perform correponding action
if (messageType.name == AppMessageType.ResponseStatus) {
  // Check message type is ResponseStatus
  statusResponseData = queryData as StatusResponse; // Client would have known the data typing in advance
  // Process data here
  // ...
  console.log(statusResponseData);
} else if (messageType.name == AppMessageType.ResponseException) {
  // Check message type is ResponseException
  statusExceptionData = queryData as StatusException; // Client would have known the data typing in advance
  // Process data here
  // ...
  console.log(statusExceptionData);
} else if (messageType.name == AppMessageType.ResponseData) {
  // Check message type is ResponseData
  sampleData = queryData as SampleData; // Client would have known the data typing in advance
  // Process data here
  // ...
  console.log(sampleData);
} else {
  console.log('Invalid message format or data type.');
}

// Client\Server create notification message
console.log('Client\\Server create notification message');
const newNotificationMessage: NotificationMessage =
  messageUtil.getNotificationMessage(
    newUCPId,
    { NotificationData: { message: 'Some event occured.' } },
    'New Notification',
  );
console.log(newNotificationMessage);

// Client set expected response data
let notificationData: NotificationData;
let notificationException: NotificationException;

// Client read data from message
console.log('Client read data from notification message');
const dataRead = dataUtil.readDataType(
  newNotificationMessage,
  null,
  messageType,
  dataType,
);
console.log('Message type = ' + messageType.name);
console.log('Data type = ' + dataType.name);

// Client interpret based on message type and perform correponding action
if (messageType.name == AppMessageType.Notification) {
  notificationData = dataRead as NotificationData; // Client would have known the data typing in advance
  console.log(notificationData);
} else if (messageType.name == AppMessageType.NotificationException) {
  notificationException = dataRead as NotificationException; // Client would have known the data typing in advance
  console.log(notificationException);
}
setTimeout(() => {
  console.log('Ended test.');
}, 50000);

// Server create test summary message
console.log('Server create summary response message');
const newQueryResponseSummaryMessage: ResponseMessage =
  messageUtil.getResponseSummaryMessage(
    newUCPId,
    { SummaryResponse: { returnFormatType: 'full' } },
    newQueryMessage,
    'Summary response.',
  );
console.log(newQueryResponseMessage);
