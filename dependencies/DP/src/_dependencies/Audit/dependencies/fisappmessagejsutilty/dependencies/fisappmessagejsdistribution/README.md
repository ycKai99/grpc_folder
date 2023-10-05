# FIS App Message Services(FISAppMessagejs) provide services to create App messages

## Requirements

### Install Dependencies

Install NodeJS

[NodeJS](https://nodejs.org/en/)

Install Json Schema

    npm install --save jsonschema

Install UUID

    npm install --save uuid

Install RFDC

    npm install --save rfdc

#### TypeScript is required for  development only

Install TypeScript for development only

    npm install --save-dev @typescript

Install TypeScript definitions for JSON schema to typescript

    npm install --save-dev @types/json-schema-to-typescript

Install TypeScript definitions for Node.js

    npm install --save-dev @types/node

Install TypeScript definitions for UUID

    npm install --save-dev @types/uuid

Install TypeScript definitions for rfdc

    npm install --save-dev @types/rfdc

## Introduction

Fis App Message is a communication between software components. Message contains information 
that can be used by the controller to direct message to an appropriate handler(or service).
Fis App Message library provides functions to create three main types of message, 
namely Request, Response and Notification. Request message sent by the client to trigger an 
action on the recipient. Response message is an answer from the recipient. Notification message from server.

### <mark>Assume your FisAppMessagejs is in folder fisappmessagejs.</mark>

### How to create App message

Assume your FisAppMessagejs is in folder fisappmessagejs

#### Example on how to create an app command message

    import { CommandMessage, AppMessageType, CommandMessageParameter, 
             Command, ProducerType} from 'fisappmessagejs/message/request/apprequestmessagetype';
    import { AppMessageCreator as AppMessag, } from 'fisappmessagejs/message/appmessagecreator';

    let messageParameter: CommandMessageParameter = {} as CommandMessageParameter;
    messageParameter.messageType = AppMessageType.Command; // Message type is Command
    messageParameter.messageName = "Testing command"; // Short description of this message.
    messageParameter.isAggregate = false; // Whether the message data is an aggregate of messages.
    messageParameter.security = {ucpId: "ucp123", applicationLogInID: "FIS",applicationUserName: "FIS"}; // Authentication and authorization information.
    messageParameter.producer = { type: ProducerType.AppServer, 
            origin: {
                userApplication: {
                    userAppId: "FIS",
                    userAppName: "FIS"
                }
            }
        }; //Origin location(as in app architecture components) where this message is created.
    messageParameter.command = Command.New; // New
    messageParameter.data = {id: 1234, code: "1234"};    //Message payload data.

    let message: CommandMessage = AppMessage.create(messageParameter);   // Create new message

        // OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
        //let message: CommandMessage = createMessage(messageParameter);   // Create new message

#### Example on how to create App Microservice Notification Message

    import { MicroserviceNotificationMessage, AppMessageType, MicroserviceNotificationMessageParameter, 
             ProducerType, NotificationNature, NotificationType} from 'fisappmessagejs/fis/appnotificationmessagetype';
    import { AppMessageCreator as AppMessag, } from 'fisappmessagejs/message/appmessagecreator';

    let messageParameter: MicroserviceNotificationMessageParameter = {} as MicroserviceNotificationMessageParameter;
    messageParameter.messageType = AppMessageType.MicroserviceNotification; // Message type is MicroserviceNotification
    messageParameter.messageName = "Notification new person created."; // Short description of this message.
    messageParameter.isAggregate = false; // Whether the message data is an aggregate of messages.
    messageParameter.security = {ucpId: "ucp123", applicationLogInID: "FIS",applicationUserName: "FIS"}; // Authentication and authorization information.
    messageParameter.producer = { type: ProducerType.AppServer, 
            origin: {
                userApplication: {
                    userAppId: "FIS",
                    userAppName: "FIS"
                }
            }
        }; //Origin location(as in app architecture components) where this message is created.
    messageParameter.notificationNature = NotificationNature.ActionRequired;
    messageParameter.notificationType = NotificationType.UserActivity;
    messageParameter.topicParameter = {code: "NewPerson", name: "New Person"}; // Topic        
    messageParameter.data = {};    //Message payload data.

    let message: FisCommandMessage = AppMessage.create(messageParameter);   // Create new message

        // OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
        //let message: FisCommandMessage = createMessage(messageParameter);   // Create new message

#### Example on how to create FIS command message to Start(Login) Fis APP

    import { FisCommandMessage, AppMessageType, FisCommandMessageParameter, 
             Command, ProducerType} from 'fisappmessagejs/fis/fisrequestmessagetype';
    import { AppMessageCreator as AppMessag, } from 'fisappmessagejs/message/appmessagecreator';

    let messageParameter: FisCommandMessageParameter = {} as FisCommandMessageParameter;
    messageParameter.messageType = AppMessageType.FisCommand; // Message type is FisCommand
    messageParameter.messageName = "Start(Login) FIS App"; // Short description of this message.
    messageParameter.isAggregate = false; // Whether the message data is an aggregate of messages.
    messageParameter.security = {ucpId: "ucp123", applicationLogInID: "FIS",applicationUserName: "FIS"}; // Authentication and authorization information.
    messageParameter.producer = { type: ProducerType.AppServer, 
            origin: {
                userApplication: {
                    userAppId: "FIS",
                    userAppName: "FIS"
                }
            }
        }; //Origin location(as in app architecture components) where this message is created.
    messageParameter.command = Command.Start; // Start
    messageParameter.userId = "FIS";
    messageParameter.serviceId = "FIS App";
    messageParameter.data = {userId: "FIS", userPass: "FIS"};    //Message payload data.

    let message: FisCommandMessage = AppMessage.create(messageParameter);   // Create new message

        // OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
        //let message: FisCommandMessage = createMessage(messageParameter);   // Create new message

#### Example on how to create FIS query message to get data(GetData) from data service

    import { FisQueryMessage, AppMessageType, FisQueryMessageParameter, 
             Query, ProducerType} from 'fisappmessagejs/fis/fisrequestmessagetype';
    import { AppMessageCreator as AppMessag, } from 'fisappmessagejs/message/appmessagecreator';

    let messageParameter: FisQueryMessageParameter = {} as FisQueryMessageParameter;
    messageParameter.messageType = AppMessageType.FisQuery; // Message type is FisQuery
    messageParameter.messageName = "Get Role Type Profile Data; // Short description of this message.
    messageParameter.isAggregate = false; // Whether the message data is an aggregate of messages.
    messageParameter.security = {ucpId: "ucp123", applicationLogInID: "FIS",applicationUserName: "FIS"}; // Authentication and authorization information.
    messageParameter.producer = { type: ProducerType.AppServer, 
            origin: {
                userApplication: {
                    userAppId: "FIS",
                    userAppName: "FIS"
                }
            }
        }; //Origin location(as in app architecture components) where this message is created.
    messageParameter.query = Query.GetData; // GetData
    messageParameter.userId = "FIS";
    messageParameter.serviceId = "Role Type Profile Data";
    messageParameter.data = {argument: null, dataRow: null};    //Message payload data.

    let message: FisQueryMessage = AppMessage.create(messageParameter);   // Create new message

        // OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
        //let message: FisQueryMessage = createMessage(messageParameter);   // Create new message

## App message utilities

Provides functions to query message.

### Usage

Creates a new message array with all elements that pass the test, provided as an option.
The return value is array of messages.
Options:

|Property|Type|Description|
|---|---|---|
|type|FilterType|<mark>Optional</mark>. Type to check against. Type are Message, RequestMessage, ResponseMessage, CommandMessage, etc.|
|id|FilterStringType|<mark>Optional</mark>. Id to check against.|
|messageType|FilterMessgeType|<mark>Optional</mark>. Message Type to check against. Message type are Request, Response, Command, etc.|

#### Example

    import { AppMessageUtil, TypeOfMessage } from 'fisappmessagejs/message/common/appmessageutil';
    let messages: Message[]	// List of app messages to filter
    // Filter by type
    AppMessageUtil.filter(messages, {type: TypeOfMessage.ResponseMessage});

    // Filter by multiple types
    AppMessageUtil.filter(messages, {type: [TypeOfMessage.RequestMessage, TypeOfMessage.ResponseMessage]});

    // Filter by Id, if multiple id, use array of id 
    AppMessageUtil.filter(messages, {id: "123"}); 

    // Filter by both type and id
    AppMessageUtil.filter(messages, {type: TypeOfMessage.ResponseMessage, id: "123"}

Even simpler: Use filter function

    import { filter, TypeOfMessage } from 'fisappmessagejs/message/common/appmessageutil';
    // Filter by type
    filter(messages, {type: TypeOfMessage.ResponseMessage});

Others functions:

|Function|Return|Description|
|---|---|---|
|isMessage(message: Message)|boolean|Tests to see if the message is an app message.|
|isOfType(message: Message, type: TypeOfMessage)|boolean|Tests to see if the message  is of 'type'. Type are Message, RequestMessage, ResponseMessage, CommandMessage, etc.|
|isOfMessageType(message: Message, type: MessageType)|boolean|Tests to see if the message  is of 'MessageType'. Message Type to check against. Message type are Request, Response, Command, etc.|
|isOfMessageId(message: Message, id: string)|boolean|Tests to see if the message id equals to 'id'.|

## Validation Functions

Validate Fis app message.

    import { validateMessage, validateMessageHeader } from 'isappmessagejs/message/common/appmessagevalidation';

|Function|Return|Description|
|---|---|---|
|validateMessage(message: Message)|If valid return boolean, otherwise exception.|Validate app message.|
|validateMessageHeader(header: MessageHeader,permissibleMessageType?: object)|If valid return boolean, otherwise exception.|Validate Fis app message header. Parameter permissible message types 'permissibleMessageType' is optional, default is AppMessageType.|

## Fis App Messages share similar structure and are composed of

## Fis App Message(Message)

Fis App Message

    import { Message } from 'fisappmessagejs/types/appmessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|header|MessageHeader|||Contains information usually used by the controller to direct message to an appropriate handler(or service).|
|data|any|||Data associated with the request. Answer(result/error/exception) from response. Information from notification server.| 


## Fis App Message Header(MessageHeader) 

The following table describes required and optional common properties of Fis App message header(MessageHeader).

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|messageID|string|||Unique identifier of every message. Every message has a internally unique identifier within FisApp environment. This value is generated at the originator of the message and which in most cases is the message factory(creator).|
|messageType|&lt;string&gt;MessageType|||Message type. To identify different types of message.|
|messageName|string|||Short description of this message.|
|dateCreated|string|date-time||The date time that the message was created by the factory(creator).|
|isAggregate|boolean||false|Whether the message data is an aggregate of messages. If true then the aggregate messages are contained in the MessageData section as array of messages. This feature is not to  be implemented unless required.|
|messageProducerInformation|MessageProducerInformation|||Origin location(as in app architecture components) where this message is created. Note that as message is passed to a component, a new message may be created to wrap around the first message.|
|security|MessageSecurity|||Authentication and authorization information.|
|messageDataLocation|ExternalMessageLocation|||<mark>Optional</mark>. Compostable definition. Can be included in message header or message data. For non-embaded data, specific location where data can be read. Applicatiion for all message action type.|
|messageDataFormat|MessageFormat|||<mark>Optional</mark>. Compostable definition. Data message format details which is required in different types of messages.<br>Format can be used<ol><li> Defining message when establishing commuincation protocal.</li><li>Defining message data section.</li><li>Defining a field in the message data section.</li></ol>|

## Message Type(MessageType)

Message type. To identify different types of message.

    import { MessageType } from 'fisappmessagejs/types/appmessagetype'


## App Message Type(AppMessageType)

Standard message type:

    AppMessageType is Enum
    import { AppMessageType } from 'fisappmessagejs/types/appmessagetype'

|Type Name|Type|Description|
|---|---|---|
|Command|CommandMessage|Command message.|
|MicroserviceNotification|MicroserviceNotificationMessage|Microservice Notification message.<br>All messages sent over microservice is in fisapp context considered as Notification messages.|
|Notification|NotificationMessage|Notification message.<br>Notification is at time named as event.|
|Query|QueryMessage|Query message.|
|Request|RequestMessage|Request message.<br>A Request can be a Command or a Query. Abstract definition and can not existing by itself. Name of request only appear at concrete type.|
|Response|ResponseMessage|Response message.<br>Message returned from successful request operation.|
|ResponseData|ResponseDataMessage|Response Data message.|
|ResponseException|ResponseExceptionMessage|Response Exception message.<br>Message returned from unsuccessful request operation. When an exception(or validation error) occurred, a response exception message is created with exception details.|
|ResponseStatus|ResponseStatusMessage|Response Status message. Message with status returned from successful request operation.|
|ResponseSubscription|ResponseSubscriptionMessage|Response Subscription message.|
|Subscription|SubscriptionMessage|Subscription message.<br>Request to subscribe notifications(or events). Note that notification can be emitted from UI, Business Domain, Databases and other application tiers. Regardless, the notification and subscription each has format used consistently across all application tiers. What events to subscribes are provided in the message data section.|

## Message Producer Information(MessageProducerInformation)

Origin location(as in app architecture components) where this message is created. Note that as message is passed to a component, a new message may be created to wrap around the first message.<br>Message producer information must be at least is one of the following:

|Type|Description|
|---|---|
|ProducerInformationUi|Message Producer is UI. Message producer information consists of common message producer information and UI information.|
|ProducerInformationAppServer|Message Producer is App Server. Message producer information consists of common message producer information and app server information.|
|ProducerInformationSystemServer|Message Producer is System Server. Message producer information consists of common message producer information and system server information.|

## Message Producer Information Base(MessageProducerInformationBase)

Origin location(as in app architecture components) where this message is created. Note that as message is passed to a component, a new message may be created to wrap around the first message. 

The following table describes required and optional common properties of message producer formation.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|programID|string|||<mark>Optional</mark>. Program Id.|
|programName|string|||<mark>Optional</mark>. Program name.|
|messageFactoryType|&lt;string&gt;FactoryType|||<mark>Optional</mark>. Factory type. Types of injectable services.|
|appArchitectureTiers|&lt;string&gt;AppArchitectureTiers|||<mark>Optional</mark>. High level app architecture levels.|
|userApplication|UserApplication|||Applications as login by user. Is a logical application with a  collection of programs to perform some related business functions. It referrrs to one or more back office applications under the User-BackOffice relationship entity. Example, FisPayment, PlantationFiledApp, FisSalesForce.|

### User Application(UserApplication)

Applications as login by user. Is a logical application with a  collection of programs to perform some related business functions. It referrrs to one or more back office applications under the User-BackOffice relationship entity. Example, FisPayment, PlantationFiledApp, FisSalesForce.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|userAppId|string|||User application id.|
|userAppName|string|||User application name.|

### Message Producer is UI(ProducerInformationUi)

Message producer information consists of common message producer information and UI information.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|origin|MessageProducerInformationBase|||Origin location(as in app architecture components) where this message is created. Note that as message is passed to a component, a new message may be created to wrap around the first message.|
|components|&lt;string&gt;UserInterfaceComponentTypes|||Major UI components.|

### Message Producer is App Server(ProducerInformationAppServer)

Message producer information consists of common message producer information and app server information.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|origin|MessageProducerInformationBase|||Origin location(as in app architecture components) where this message is created. Note that as message is passed to a component, a new message may be created to wrap around the first message.|
|components|&lt;string&gt;FisAppServerComponents|||Major components of Fis Application server.|

### Message Producer is System Server(ProducerInformationSystemServer)

Message producer information consists of common message producer information and system server information.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|origin|MessageProducerInformationBase|||Origin location(as in app architecture components) where this message is created. Note that as message is passed to a component, a new message may be created to wrap around the first message.|
|components|&lt;string&gt;SystemServers|||System softwares. Windows, NodeJs, NestJS, MicroserviceServers etc.|

### Message Security(MessageSecurity)

Authentication and authorization information.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|socialNetworkLoginID|string|email||<mark>Optional</mark>. Social network user id that user log on. can be null and in which case user did not use social network user id to log in but instead directly log on using FisApp user id. Note that a client can be a daemon process and in which case it also has a log in id.|
|ucpId|string|||User application session client proxy.|
|socialNetworkUserName|string|||<mark>Optional</mark>. Name of social network user.|
|applicationLogInID|string|||<mark>Optional</mark>. FIS User ID.|
|applicationUserName|string|||<mark>Optional</mark>. Name of application user.|

### Message Data Location(ExternalMessageLocation)

Compostable definition. Can be included in message header or message data. For non-embaded data, specific location where data can be read. Applicatiion for all message action type.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|isEmbaded|boolean||true|Embaded data?|
|url|string|uri||<mark>Optional</mark>. Uniform Resource Locator (URL).|
|accessId|string|||<mark>Optional</mark>. Access Id.|
|accessPassword|string|||<mark>Optional</mark>. Access password.|
|fileName|string|||<mark>Optional</mark>. File name.|

### Message Data Format(MessageFormat)

Compostable definition. Data message format details which is required in different types of messages.<br>Format can be used<ol><li>Defining message when establishing commuincation protocal.</li><li>Defining message data section.</li><li>Defining a field in the message data section.</li></ol>

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|dataFormat|&lt;string&gt;DataFormat||Jason|Data format. Applicable for report query.|
|fileFormat|&lt;string&gt;FileFormat|||<mark>Optional</mark>. File type in which the message is kept. Usually correspond to the file extension.|
|schemaType|&lt;string&gt;SchemaType|||<mark>Optional</mark>. The response data schema type.|
|mediaType|&lt;string&gt;MediaType||Text|<mark>Optional</mark>. Media type. Need to review this part in order to comply to standard naming.|

### Message Parameter(MessageParameter)

The message parameter is used by Fis app message service(creator) to create a new message. Message parameter allow you to define 
what type of message you want to create. Common message parameters:

|Property|Type|Description|
|---|---|---|
|messageType|&lt;string&gt;MessageType|Message type. Message type to be created.|
|messageName|string|Message name. Short description of this message.|
|isAggregate|boolean|Aggregate message? Whether the message data is an aggregate of messages.|
|security|MessageSecurity|Message security. Authentication and authorization information.|
|producer|Producer|Message producer. Origin location(as in app architecture components) where this message is created.|
|dataLocation|ExternalMessageLocation|Message data location. For non-embaded data, specific location where data can be read.|
|dataFormat|MessageFormat|Message data format. Data message format details which is required in different types of messages.<br>Format can be used<ol><li> Defining message when establishing commuincation protocal.</li><li>Defining message data section.</li><li>Defining a field in the message data section.</li></ol>|
|deliveryMode|MessageDeliveryMode|<mark>Optional</mark>. Message delivery mode. How message is to be delivered. Usually though not mendatory is as requested by client. If not specidied then leave to default transport handler. Applicable more for a requesting client message to specify how response messages should be delivered back.<br><mark>This section to be expanded and implemented at a later stage.</mark></br>|
|responseRequirement|ResponseRequirement|<mark>Optional</mark>. App message response requirement. Client that request defines what sort of response expected.<br>App message response requirement details:<ol><li> How message is to be delivered.</li><li> Message data format.</li><li> Message data location.</li></ol>|
|data|any|Message data. Data associated with the request. Answer(result/error/exception) from response. Information from notification server.|

### Request Message(RequestMessage)

A Request can be a Command or a Query. Abstract definition and can not existing by itself. Name of request only appear at concrete type.
Request message consists of common message header(MessageHeader) and request properties.

    import { RequestMessage } from 'fisappmessagejs/types/appmessagetype'
    or
    import { RequestMessage } from 'fisappmessagejs/message/request/apprequestmessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|responseRequirement|ResponseRequirement|||<mark>Optional</mark>. Client that request defines what sort of response expected.|
|resquestTimeOut|number||0|If not completed within stipulated time(since message created), then cancel request. Time out in milli seconds. 0-no time out.|
|requestExecutionMode|integer||0|To execute after a specified certain time (since message created), 0 as immediate, -1 as batch queue.|

### Response Requirement(ResponseRequirement)

Client that request defines what sort of response expected.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|responseDeliveryMode|MessageDeliveryMode|||<mark>Optional</mark>. Compostable definition. How message is to be delivered. Usually though not mendatory is as requested by client. If not specidied then leave to default transport handler. Applicable more for a requesting client message to specify how response messages should be delivered back.<br><mark>This section to be expanded and implemented at a later stage.</mark>
|responseDataFormat|MessageFormat|||<mark>Optional</mark>. Compostable definition. Data message format details which is required in different types of messages.<br>Format can be used<ol><li>Defining message when establishing commuincation protocal.</li><li>Defining message data section.</li><li>Defining a field in the message data section.</li></ol>|
|externalResponseLocation|ExternalMessageLocation|||<mark>Optional</mark>. Compostable definition. Can be included in message header or message data. For non-embaded data, specific location where data can be read. Applicatiion for all message action type.|

### Message Delivery Mode(MessageDeliveryMode)

Compostable definition. How message is to be delivered. Usually though not mendatory is as requested by client. If not specidied then leave to default transport handler. Applicable more for a requesting client message to specify how response messages should be delivered back.
<br><mark>This section to be expanded and implemented at a later stage.</mark>

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|timing|&lt;string&gt;Timing||Interactive|Interactive message exchange or batch delayed. Interactive reponse is immediate by individually message continuous streaming. Batched messages are collected for one delivery.|
|channelId|string|||<mark>Optional</mark>. Identifier for a particular transport channel to use. <mark>Set aside for later enhancement.</mark>|

### Request Message Parameter(RequestMessageParameter)

Request message parameter consists of common message parameters and request parameters.

    import { MessageParameter } from 'fisappmessagejs/message/request/apprequestmessagetype'
    or
    import { RequestMessageParameter } from 'fisappmessagejs/message/request/apprequestmessagetype'
    or 
    import { RequestMessageParameter } from 'fisappmessagejs/message/request/requestmessageparameter'

|Property|Type|Description|
|---|---|---|
|resquestTimeOut|number|<mark>Optional</mark>. Resquest time out. If not completed within stipulated time(since message created), then cancel request. Time out in milli seconds. 0-no time out.|
|requestExecutionMode|number|<mark>Optional</mark>. Request execution mode. To execute after a specified certain time (since message created), 0 as immediate, -1 as batch queue.|

### Command Message(CommandMessage)

A Request can be a command. Command message consists of common request message header(RequestMessageHeader) and command properties.

    import { CommandMessage } from 'fisappmessagejs/types/appmessagetype'
    or
    import { CommandMessage } from 'fisappmessagejs/message/request/apprequestmessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|command|&lt;string&gt;Command|||Command to trigger an action on the recipient.|

### Command Message Parameter(CommandMessageParameter)

Command message parameter consists of request message parameters and command parameters.

    import { CommandMessageParameter } from 'fisappmessagejs/message/request/apprequestmessagetype'
    or
    import { CommandMessageParameter } from 'fisappmessagejs/message/request/requestmessageparameter'

|Property|Type|Description|
|---|---|---|
|command|&lt;string&gt;Command|Command to perform. Command to trigger an action on the recipient.|

### Query Message(QueryMessage)

A Request can be a query.  Query message consists of common request message header(RequestMessageHeader) and query properties.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|query|&lt;string&gt;Query|||Query request.|

### Query Message Parameter(QueryMessageParameter)

Query message parameter consists of request message parameters and query parameters.

    import { QueryMessageParameter } from 'fisappmessagejs/message/request/apprequestmessagetype'
    or
    import { QueryMessageParameter } from 'fisappmessagejs/message/request/requestmessageparameter'

|Property|Type|Description|
|---|---|---|
|query|&lt;string&gt;Query|Query to perform.|

### Subscription Message(SubscriptionMessage)

Request to subscribe notifications(or events). Note that notification can be emitted from UI, Business Domain, Databases and other application tiers. Regardless, the notification and subscription each has format used consistently across all application tiers. What events to subscribes are provided in the message data section.
<br>Subscription message consists of common request message header(RequestMessageHeader) and subscription properties.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|subscription|&lt;string&gt;Subscription||General|Request to subscribe messages.|
|startSubscribingDateTime|string|date-time|undefined|<mark>Optional</mark>. Effect date time when to start subscribing. Default is right now.|
|endSubscribingDateTime|string|date-time|undefined|<mark>Optional</mark>. Effect date time when to end subscribing. Default is forever.|

### Subscription Message Parameter(SubscriptionMessageParameter)

Subscription message parameter consists of request message parameters and subscription parameters.

    import { SubscriptionMessageParameter } from 'fisappmessagejs/message/request/apprequestmessagetype'
    or
    import { SubscriptionMessageParameter } from 'fisappmessagejs/message/request/requestmessageparameter'

|Property|Type|Description|
|---|---|---|
|subscription|&lt;string&gt;Subscription|Subscription type. Request to subscribe messages.|
|startSubscribingDateTime|Date&vert;string|Effect date time when to start subscribing.|
|endSubscribingDateTime|Date&vert;string|Effect date time when to end subscribing|

### Response Message(ResponseMessage)

Response Message returned from successful request operation.
Response message consists of common message header(MessageHeader) and response properties.

    import { ResponseMessage } from 'fisappmessagejs/types/appmessagetype'
    or
    import { ResponseMessage } from 'fisappmessagejs/message/request/appresponsemessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|requestMessageRespondTo|RequestMessage|||Respond to message(RequestMessage type).|

### Response Message Parameter(ResponseMessageParameter)

Response message parameter consists of common message parameters and response parameters.

    import { MessageParameter } from 'fisappmessagejs/message/request/appresponsemessagetype'
    or
    import { ResponseMessageParameter } from 'fisappmessagejs/message/request/appresponsemessagetype'
    or 
    import { ResponseMessageParameter } from 'fisappmessagejs/message/request/responsemessageparameter'

|Property|Type|Description|
|---|---|---|
|requestMessageRespondTo|RequestMessage|Respond to message(RequestMessage type).|

### Response Exception Message(ResponseExceptionMessage)

Response Exception Message returned from unsuccessful request operation. When an exception(or validation error) occurred, a response exception message is created with exception details. Response exception message consists of response message header(ResponseMessageHeader) and response exception properties.

    import { ResponseExceptionMessage } from 'fisappmessagejs/types/appmessagetype'
    or
    import { ResponseExceptionMessage } from 'fisappmessagejs/message/request/appresponsemessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|responseException|&lt;string&gt;ResponseException|||Response exception. Response exception types.|

### Response Exception Message Parameter(ResponseExceptionMessageParameter)

Response exception message parameter consists of response message parameters and response exception parameters.

    import { ResponseExceptionMessageParameter } from 'fisappmessagejs/message/request/appresponsemessagetype'
    or 
    import { ResponseExceptionMessageParameter } from 'fisappmessagejs/message/request/responsemessageparameter'

|Property|Type|Description|
|---|---|---|
responseException|&lt;string&gt;ResponseException|Response exception. Response exception types.|

### Response Status Message(ResponseStatusMessage)

Response Status Message with status returned from successful request operation.
Response Status message consists of response message header(ResponseMessageHeader) and response Status properties.

    import { ResponseStatusMessage } from 'fisappmessagejs/types/appmessagetype'
    or
    import { ResponseStatusMessage } from 'fisappmessagejs/message/request/appresponsemessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|responseStatus|&lt;string&gt;ResponseStatus|||Respopnse status. Response on status of request performance.|

### Response Status Message Parameter(ResponseStatusMessageParameter)

Response status message parameter consists of response message parameters and response status parameters.

    import { ResponseStatusMessageParameter } from 'fisappmessagejs/message/request/appresponsemessagetype'
    or 
    import { ResponseStatusMessageParameter } from 'fisappmessagejs/message/request/responsemessageparameter'

|Property|Type|Description|
|---|---|---|
|responseStatus|&lt;string&gt;ResponseStatus|Respopnse status. Response on status of request performance(ResponseStatus).|

### Notification Message(NotificationMessage)

Notification message. Notification is at time named as event.
Notification message consists of common message header(MessageHeader) and notification properties.

    import { NotificationMessage } from 'fisappmessagejs/types/appmessagetype'
    or
    import { NotificationMessage } from 'fisappmessagejs/message/request/appnotificationmessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|notificationType|&lt;string&gt;NotificationType|||Notification type For UI Events, MS Events, NestJS Events, FIS Events.|
|notificationNature|&lt;string&gt;NotificationNature|||Notification nature.|

### Notification Message Parameter(NotificationMessageParameter)

Notification message parameter consists of common message parameters and notification parameters.

    import { MessageParameter } from 'fisappmessagejs/message/request/appnotificationmessagetype'
    or
    import { NotificationMessageParameter } from 'fisappmessagejs/message/request/appnotificationmessagetype'
    or 
    import { NotificationMessageParameter } from 'fisappmessagejs/message/request/notificationmessageparameter'

|Property|Type|Description|
|---|---|---|
|notificationType|&lt;string&gt;NotificationType|Notification type For UI Events, MS Events, NestJS Events, FIS Events.|
|notificationNature|&lt;string&gt;NotificationNature|Notification nature.|

### Microservice Notification Message(NotificationMessage)

Microservice Notification message. All messages sent over microservice is in fisapp context considered as notification messages.
Microservice notification message consists of notification message header(NotificationMessageHeader) and microservice notification properties.

    import { NotificationMessage } from 'fisappmessagejs/types/appmessagetype'
    or
    import { NotificationMessage } from 'fisappmessagejs/message/request/appnotificationmessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|microserviceTopic|MicroserviceTopic|||Microservice topic. Similar in usage to Kafka topic. This literal object is used in NestJS microservice client proxy header.|

### Microservice Topic(MicroserviceTopic)

Microservice topic. Similar in usage to Kafka topic. This literal object is used in NestJS microservice client proxy header.

    import { MicroserviceTopic } from 'fisappmessagejs/types/appmessagetype'
    or
    import { MicroserviceTopic } from 'fisappmessagejs/message/request/appnotificationmessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|topicId|string|||Topic Id.|
|topicCode|string|||Topic Code.|
|topicName|string|||Topic Name.|

### Microservice Notification Message Parameter(NotificationMessageParameter)

Microservice notification message parameter consists of notification message parameters and microservice notification parameters.

    import { MessageParameter } from 'fisappmessagejs/message/request/appnotificationmessagetype'
    or
    import { NotificationMessageParameter } from 'fisappmessagejs/message/request/appnotificationmessagetype'
    or 
    import { NotificationMessageParameter } from 'fisappmessagejs/message/request/notificationmessageparameter'

|Property|Type|Description|
|---|---|---|
|topicParameter|TopicParameters|Topic parameter. Similar in usage to Kafka topic. This literal object is used in NestJS microservice client proxy header.|

### Topic Parameters(TopicParameters)

Topic parameter.

    import { TopicParameters } from 'fisappmessagejs/topic/apptopictype'

|Property|Type|Description|
|---|---|---|
|code|string|Topic Code.|
|name|string|Topic Name.|

## Fis Message

Fis Message is a communication between software components and Fis back office application. Message contains information 
that can be used by the controller to direct message to an appropriate handler(or service).
Fis Message library provides functions to create two main types of message, 
namely Request and Response. Fis Request message sent by the client to trigger an 
action on the Fis back office application. Response message is an answer(resull/error/exception) from the Fis back office application.
<br>Fis messages share similar structure and are composed of:

### Fis Message Type(FisMessageType)

Fis message type:

    FisMessageType is Enum
    import { FisMessageType } from 'fisappmessagejs/types/appmessagetype'
    or
    import { FisMessageType } from 'fisappmessagejs/fis/fismessagetype'

|Type Name|Type|Description|
|---|---|---|
|FisCommand|FisCommandMessage|Fis Command message.|
|FisQuery|FisQueryMessage|Fis Query message.|
|FisResponse|FisResponseMessage|Fis Response message.|

<mark>Note. If AppMessageType is import from 'fisappmessagejs/fis/fismessagetype', consists of both standard and Fis message type</mark>

### Fis Message Header(FisMessageHeader)

Common message header for all Fis messages. Information required for message integration with FIS back office for Request message. 
Define as composition and hence do not extend from any message header definition.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|instanceId|string|||A Fis application generated reference ID to an instantiated service in Fis Back office server. Can be null if not applicable.|
|userId|string|||Fis user id.|
|serviceId|string|||FIS service to invoke(mandatory).|
|dataSourceTiming|string|||<mark>Optional</mark>. Data source timing. i.e. EDIT(get data from editing cache).|

### Fis Message Parameter(FisMessageParameter)

Information required for message integration with Fis back office. FIs common message parameters:

|Property|Type|Description|
|---|---|---|
|instanceId|string|Fis service instance id. A Fis application generated reference ID to an instantiated service in Fis Back office server. Can be null if not applicable.|
|serviceId|string|Fis service id. Fis service to invoke(mandatory).|
|userId|string|Fis user id.|
|dataSourceTiming|string|<mark>Optional</mark>. Data source timing. i.e. EDIT(get data from editing cache).|

### Fis Request Message

Fis request can be a Fis command or a Query. Abstract definition and can not existing by itself. Name of Fis request only appear at concrete type.
FIs request message header consists of request message header(RequestMessageHeader) and Fis Message Header(FisMessageHeader).

### Fis Command Message(FisCommandMessage)

A Fis request can be a Fis command. Fis Command message consists of Fis request message header(FisRequestMessageHeader) and Fis command properties.

    import { FisCommandMessage } from 'fisappmessagejs/fis/fismessagetype'
    or
    import { FisCommandMessage } from 'fisappmessagejs/fis/request/fisrequestmessagetype'

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|command|&lt;string&gt;FisCommand|||Fis Command to trigger an action on the Fis back office application.|

### Fis Command Message Parameter(FisCommandMessageParameter)

Fis command message parameter consists of Fis request message parameters and Fis command parameters.

    import { FIsCommandMessageParameter } from 'fisappmessagejs/fis/fisrequestmessagetype'
    or
    import { FIsCommandMessageParameter } from 'fisappmessagejs/fis/fisrequestmessageparameter'

|Property|Type|Description|
|---|---|---|
|command|&lt;string&gt;FisCommand|Fis command to perform. Command to trigger an action on the Fis back office application.|

### FIs Query Message(FisQueryMessage)

A Fis request can be a query. Fis Query message consists of FIs request message header(FIsRequestMessageHeader) and Fis query properties.

|Property|Type|Format|Default|Description|
|---|---|---|---|---|
|query|&lt;string&gt;FisQuery|||Fis query request.|

### Fis Query Message Parameter(FisQueryMessageParameter)

Fis query message parameter consists of Fis request message parameters and Fis query parameters.

    import { FisQueryMessageParameter } from 'fisappmessagejs/fis/fisrequestmessagetype'
    or
    import { FisQueryMessageParameter } from 'fisappmessagejs/fis/fisrequestmessageparameter'

|Property|Type|Description|
|---|---|---|
|query|&lt;string&gt;FisQuery|Fis query to perform.|

### Fis Response Message(FisResponseMessage)

Fis response Message returned from successful Fis request operation.
Fis response message consists of response message header(ResponseMessageHeader) and Fis Message Header(FisMessageHeader).

    import { FisResponseMessage } from 'fisappmessagejs/fis/fismessagetype'
    or
    import { FisResponseMessage } from 'fisappmessagejs/fis/fisresponsemessagetype'

### Fis Response Message Parameter(FisResponseMessageParameter)

Response message parameter consists of reponse message parameters and Fis message parameters.

    import { FisResponseMessageParameter } from 'fisappmessagejs/fis/fisresponsemessagetype'
    or 
    import { FisResponseMessageParameter } from 'fisappmessagejs/fis/fisresponsemessageparameter'
