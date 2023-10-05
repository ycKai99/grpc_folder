
import { AppMessageCreator } from '../message/appmessagecreator';
import { AppCommandMessage } from '../message/request/appcommandmessage';
//import { createFisCommandMessage } from '../fis/appfiscommandmessage';
//import { AppMessageType, FisCommandMessageParameter, 
//    Command, ProducerType, Message, RequestMessage} from '../fis/fisrequestmessagetype';
import { AppMessageCreator as AppMessage, } from '../message/appmessagecreator';  
import { ResponseStatusMessageParameter } from '../message/response/appresponsemessagetype';
import { CommandMessageParameter } from '../message/request/requestmessageparameter';
import { AppMessageType,Command,Message, RequestMessage } from '../types/fisappmessageschema';
import { ProducerType } from '../types/appmessagetype';

// Dummy request
let messageParameterReq: CommandMessageParameter = {} as CommandMessageParameter;
messageParameterReq.messageType = AppMessageType.Command; // Message type is FisCommand
messageParameterReq.messageName = "Start(Login) FIS App"; // Short description of this message.
messageParameterReq.isAggregate = false; // Whether the message data is an aggregate of messages.
messageParameterReq.security = {ucpId: "ucp123", applicationLogInID: "FIS",applicationUserName: "FIS"}; // Authentication and authorization information.
messageParameterReq.producer = { type: ProducerType.AppServer, 
   origin: {
       userApplication: {
           userAppId: "FIS",
           userAppName: "FIS"
       }
   }
}; //Origin location(as in app architecture components) where this message is created.
messageParameterReq.command = Command.Start; // Start
messageParameterReq.userId = "FIS";
messageParameterReq.serviceId = "FIS App";
messageParameterReq.data = {userId: "FIS", userPass: "FIS"};    //Message payload data.
 
let app_messageReq: RequestMessage = AppMessageCreator.create(messageParameterReq) as RequestMessage;   // Create new message 

// Status response
let messageParameter: ResponseStatusMessageParameter = {} as ResponseStatusMessageParameter;
messageParameter.messageType = AppMessageType.Response; // Message type is FisCommand
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
 
messageParameter.data = {userId: "FIS", userPass: "FIS"};    //Message payload data.
messageParameter.requestMessageRespondTo = app_messageReq;

let app_message: Message = AppMessageCreator.create(messageParameter);   // Create new message 

// OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
//let message: FisCommandMessage = createMessage(messageParameter);   // Create new message
 
console.log("Response message JSON.")
console.log(JSON.stringify(app_message.header,null,2))
 

// Status response
let messageParameter2: ResponseStatusMessageParameter = {} as ResponseStatusMessageParameter;
messageParameter.messageType = AppMessageType.ResponseData; // Message type is FisCommand
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
 
messageParameter.data = {userId: "FIS", userPass: "FIS"};    //Message payload data.
messageParameter.requestMessageRespondTo = app_messageReq;

let app_message2: Message = AppMessageCreator.create(messageParameter);   // Create new message 

// OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
//let message: FisCommandMessage = createMessage(messageParameter);   // Create new message
 
console.log("Response status message JSON.")
console.log(JSON.stringify(app_message2.header,null,2))