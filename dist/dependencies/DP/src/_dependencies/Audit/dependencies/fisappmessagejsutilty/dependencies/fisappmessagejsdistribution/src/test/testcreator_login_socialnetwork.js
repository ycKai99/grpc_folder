"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagecreator_1 = require("../message/appmessagecreator");
const fisappmessageschema_1 = require("../types/fisappmessageschema");
const appmessagetype_1 = require("../types/appmessagetype");
let messageParameter = {};
messageParameter.messageType = fisappmessageschema_1.AppMessageType.Command;
messageParameter.messageName = "Start(Login) FIS App";
messageParameter.isAggregate = false;
messageParameter.requesterId = "XXXXXX";
messageParameter.security = {
    ucpId: "ucp123", applicationLogInID: "unknown", applicationUserName: "unknown",
    socialNetworkLoginID: "TEST@softwareoptima.com",
};
messageParameter.producer = { type: appmessagetype_1.ProducerType.AppServer,
    origin: {
        userApplication: {
            userAppId: "unknown",
            userAppName: "FIS"
        }
    }
};
messageParameter.command = fisappmessageschema_1.Command.Start;
messageParameter.userId = "unknown";
messageParameter.serviceId = "FIS App";
messageParameter.data = {};
let app_message = appmessagecreator_1.AppMessageCreator.create(messageParameter);
console.log("Standard app message JSON.");
console.log(JSON.stringify(app_message.header, null, 2));
//# sourceMappingURL=testcreator_login_socialnetwork.js.map