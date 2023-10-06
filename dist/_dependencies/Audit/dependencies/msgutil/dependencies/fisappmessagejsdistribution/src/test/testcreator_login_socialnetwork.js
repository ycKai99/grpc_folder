"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagecreator_1 = require("../message/appmessagecreator");
const fisappmessageschema_1 = require("../types/fisappmessageschema");
const appmessagetype_1 = require("../types/appmessagetype");
let messageParameter = {};
messageParameter.messageType = fisappmessageschema_1.AppMessageType.Command; // Message type is FisCommand
messageParameter.messageName = "Start(Login) FIS App"; // Short description of this message.
messageParameter.isAggregate = false; // Whether the message data is an aggregate of messages.
messageParameter.requesterId = "XXXXXX";
messageParameter.security = {
    ucpId: "ucp123", applicationLogInID: "unknown", applicationUserName: "unknown",
    socialNetworkLoginID: "TEST@softwareoptima.com",
}; // Authentication and authorization information.
messageParameter.producer = { type: appmessagetype_1.ProducerType.AppServer,
    origin: {
        userApplication: {
            userAppId: "unknown",
            userAppName: "FIS"
        }
    }
}; //Origin location(as in app architecture components) where this message is created.
messageParameter.command = fisappmessageschema_1.Command.Start; // Start
messageParameter.userId = "unknown"; // Dont know FIS user name yet
messageParameter.serviceId = "FIS App";
messageParameter.data = {}; //Message payload data.
let app_message = appmessagecreator_1.AppMessageCreator.create(messageParameter); // Create new message 
// OR call createMessage function, by  import { createMessage } from 'fisappmessagejs/message/appmessagecreator';
//let message: FisCommandMessage = createMessage(messageParameter);   // Create new message
console.log("Standard app message JSON.");
console.log(JSON.stringify(app_message.header, null, 2));
//# sourceMappingURL=testcreator_login_socialnetwork.js.map