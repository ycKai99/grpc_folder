"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagetype_1 = require("../types/appmessagetype");
const appmessagecreator_1 = require("../message/appmessagecreator");
// import { appsubscriptionmessage as Subscription } from '../message/request/appsubscriptionmessage';
// import { AppMicroserviceNotificationMessage as MicroserviceNotification } from '../message/notification/appmicroservicenotificationmessage';
// import * as fs from 'fs';
// import * as path from 'path';
const test = require("./testmodule.json");
console.log(JSON.stringify(test, null, 2));
//loadModule( path.join(__dirname, '/testmodule.json'));
function loadModule(modulesFile) {
    let moduleProifle;
    let modules;
    // moduleProifle = JSON.parse(fs.readFileSync(modulesFile, 'utf8'));
    moduleProifle = require(modulesFile);
    console.log(JSON.stringify(moduleProifle, null, 2));
    // console.log(JSON.stringify(moduleProifle.module, null, 2));
    for (let i = 0; i < moduleProifle.module.length; i++) {
        // console.log(JSON.stringify(require(moduleProifle.module[i]).toString(), null, 2));
        modules = Object.assign(Object.assign({}, modules), require(moduleProifle.module[i]));
    }
    console.log(JSON.stringify(Object.keys(modules), null, 2));
    console.log(Object.values(modules).toString());
    return modules;
}
// AppMessageCreator.messages = { ...{}, 
//     ...AppMessageCreator.messages,
//     ...{ Subscription: Subscription, MicroserviceNotification: MicroserviceNotification }
// };
appmessagecreator_1.AppMessageCreator.messages = Object.assign(Object.assign({}, appmessagecreator_1.AppMessageCreator.messages), loadModule('./testmodule.json')); //...loadModule( path.join(__dirname, '/testmodule.json'))};
console.log(JSON.stringify(appmessagecreator_1.AppMessageCreator.create({
    messageType: appmessagetype_1.AppMessageType.Command,
    messageName: "Test Command",
    isAggregate: false,
    security: {},
    dataLocation: { isEmbaded: true },
    dataFormat: { dataFormat: appmessagetype_1.DataFormat.Json },
    producer: {
        type: appmessagetype_1.ProducerType.AppServer,
        origin: { userApplication: { userAppId: "FIS", userAppName: "FIS" } }
    },
    data: {}
}), null, 2));
//# sourceMappingURL=testcreator.js.map