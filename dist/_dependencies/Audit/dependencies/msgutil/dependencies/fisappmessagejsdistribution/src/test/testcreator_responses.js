"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagecreator_1 = require("../message/appmessagecreator");
const fisappmessageschema_1 = require("../types/fisappmessageschema");
const appmessagetype_1 = require("../types/appmessagetype");
// Dummy request
let messageParameterReq = {};
messageParameterReq.messageType = fisappmessageschema_1.AppMessageType.Command; // Message type is FisCommand
messageParameterReq.messageName = "Start(Login) FIS App"; // Short description of this message.
messageParameterReq.isAggregate = false; // Whether the message data is an aggregate of messages.
messageParameterReq.security = { ucpId: "ucp123", applicationLogInID: "FIS", applicationUserName: "FIS" }; // Authentication and authorization information.
messageParameterReq.producer = { type: appmessagetype_1.ProducerType.AppServer,
    origin: {
        userApplication: {
            userAppId: "FIS",
            userAppName: "FIS"
        }
    }
}; //Origin location(as in app architecture components) where this message is created.
messageParameterReq.command = fisappmessageschema_1.Command.Start; // Start
messageParameterReq.userId = "FIS";
messageParameterReq.serviceId = "FIS App";
messageParameterReq.data = { userId: "FIS", userPass: "FIS" }; //Message payload data.
let app_messageReq = appmessagecreator_1.AppMessageCreator.create(messageParameterReq); // Create new message 
// Status response
let messageParameter = {};
messageParameter.messageType = fisappmessageschema_1.AppMessageType.Response; // Message type is FisCommand
messageParameter.messageName = "Start(Login) FIS App"; // Short description of this message.
messageParameter.isAggregate = false; // Whether the message data is an aggregate of messages.
messageParameter.security = { ucpId: "ucp123", applicationLogInID: "FIS", applicationUserName: "FIS" }; // Authentication and authorization information.
messageParameter.producer = { type: appmessagetype_1.ProducerType.AppServer,
    origin: {
        userApplication: {
            userAppId: "FIS",
            userAppName: "FIS"
        }
    }
}; //Origin location(as in app architecture components) where this message is created.
messageParameter.data = { userId: "FIS", userPass: "FIS" }; //Message payload data.
messageParameter.requestMessageRespondTo = app_messageReq;
let app_message = appmessagecreator_1.AppMessageCreator.create(messageParameter); // Create new message 
// OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
//let message: FisCommandMessage = createMessage(messageParameter);   // Create new message
console.log("Response message JSON.");
console.log(JSON.stringify(app_message.header, null, 2));
// Status response
let messageParameter2 = {};
messageParameter.messageType = fisappmessageschema_1.AppMessageType.ResponseData; // Message type is FisCommand
messageParameter.messageName = "Start(Login) FIS App"; // Short description of this message.
messageParameter.isAggregate = false; // Whether the message data is an aggregate of messages.
messageParameter.security = { ucpId: "ucp123", applicationLogInID: "FIS", applicationUserName: "FIS" }; // Authentication and authorization information.
messageParameter.producer = { type: appmessagetype_1.ProducerType.AppServer,
    origin: {
        userApplication: {
            userAppId: "FIS",
            userAppName: "FIS"
        }
    }
}; //Origin location(as in app architecture components) where this message is created.
messageParameter.data = { userId: "FIS", userPass: "FIS" }; //Message payload data.
messageParameter.requestMessageRespondTo = app_messageReq;
let app_message2 = appmessagecreator_1.AppMessageCreator.create(messageParameter); // Create new message 
// OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
//let message: FisCommandMessage = createMessage(messageParameter);   // Create new message
console.log("Response status message JSON.");
console.log(JSON.stringify(app_message2.header, null, 2));
//# sourceMappingURL=testcreator_responses.js.map