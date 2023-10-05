"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagecreator_1 = require("../message/appmessagecreator");
const appmessagetype_1 = require("../types/appmessagetype");
let messageParameter = {};
messageParameter.messageType = appmessagetype_1.AppMessageType.Command;
messageParameter.messageName = "Start(Login) FIS App";
messageParameter.isAggregate = false;
messageParameter.security = { ucpId: "ucp123", applicationLogInID: "FIS", applicationUserName: "FIS" };
messageParameter.producer = { type: appmessagetype_1.ProducerType.AppServer,
    origin: {
        userApplication: {
            userAppId: "FIS",
            userAppName: "FIS"
        }
    }
};
messageParameter.command = appmessagetype_1.Command.Start;
messageParameter.userId = "FIS";
messageParameter.serviceId = "FIS App";
messageParameter.data = { userId: "FIS", userPass: "FIS" };
let app_message = appmessagecreator_1.AppMessageCreator.create(messageParameter);
console.log("Standard app message JSON.");
console.log(JSON.stringify(app_message.header, null, 2));
//# sourceMappingURL=testcreator_login_local.js.map