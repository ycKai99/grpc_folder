"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagecreator_1 = require("../message/appmessagecreator");
const fisappmessageschema_1 = require("../types/fisappmessageschema");
const appmessagetype_1 = require("../types/appmessagetype");
let messageParameterReq = {};
messageParameterReq.messageType = fisappmessageschema_1.AppMessageType.Command;
messageParameterReq.messageName = "Start(Login) FIS App";
messageParameterReq.isAggregate = false;
messageParameterReq.security = { ucpId: "ucp123", applicationLogInID: "FIS", applicationUserName: "FIS" };
messageParameterReq.producer = { type: appmessagetype_1.ProducerType.AppServer,
    origin: {
        userApplication: {
            userAppId: "FIS",
            userAppName: "FIS"
        }
    }
};
messageParameterReq.command = fisappmessageschema_1.Command.Start;
messageParameterReq.userId = "FIS";
messageParameterReq.serviceId = "FIS App";
messageParameterReq.data = { userId: "FIS", userPass: "FIS" };
let app_messageReq = appmessagecreator_1.AppMessageCreator.create(messageParameterReq);
let messageParameter = {};
messageParameter.messageType = fisappmessageschema_1.AppMessageType.Response;
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
messageParameter.data = { userId: "FIS", userPass: "FIS" };
messageParameter.requestMessageRespondTo = app_messageReq;
let app_message = appmessagecreator_1.AppMessageCreator.create(messageParameter);
console.log("Response message JSON.");
console.log(JSON.stringify(app_message.header, null, 2));
let messageParameter2 = {};
messageParameter.messageType = fisappmessageschema_1.AppMessageType.ResponseData;
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
messageParameter.data = { userId: "FIS", userPass: "FIS" };
messageParameter.requestMessageRespondTo = app_messageReq;
let app_message2 = appmessagecreator_1.AppMessageCreator.create(messageParameter);
console.log("Response status message JSON.");
console.log(JSON.stringify(app_message2.header, null, 2));
//# sourceMappingURL=testcreator_responses.js.map