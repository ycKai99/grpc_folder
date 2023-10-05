
import { AppMessageCreator } from '../message/appmessagecreator';
import { AppCommandMessage } from '../message/request/appcommandmessage'; 
import { AppMessageType, 
    Command, ProducerType, Message} from '../types/appmessagetype';
import { AppMessageCreator as AppMessage, } from '../message/appmessagecreator';  
import { CommandMessageParameter } from '../message/request/requestmessageparameter';


let messageParameter: CommandMessageParameter = {} as CommandMessageParameter;
messageParameter.messageType = AppMessageType.Command; // Message type is FisCommand
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

let app_message: Message = AppMessageCreator.create(messageParameter);   // Create new message 

// OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
//let message: FisCommandMessage = createMessage(messageParameter);   // Create new message
 
console.log("Standard app message JSON.")
console.log(JSON.stringify(app_message.header,null,2))
 