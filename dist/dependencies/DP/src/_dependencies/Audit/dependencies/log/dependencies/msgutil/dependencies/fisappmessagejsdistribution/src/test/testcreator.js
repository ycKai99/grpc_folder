"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagetype_1 = require("../types/appmessagetype");
const appmessagecreator_1 = require("../message/appmessagecreator");
const test = require("./testmodule.json");
console.log(JSON.stringify(test, null, 2));
function loadModule(modulesFile) {
    let moduleProifle;
    let modules;
    moduleProifle = require(modulesFile);
    console.log(JSON.stringify(moduleProifle, null, 2));
    for (let i = 0; i < moduleProifle.module.length; i++) {
        modules = Object.assign(Object.assign({}, modules), require(moduleProifle.module[i]));
    }
    console.log(JSON.stringify(Object.keys(modules), null, 2));
    console.log(Object.values(modules).toString());
    return modules;
}
appmessagecreator_1.AppMessageCreator.messages = Object.assign(Object.assign({}, appmessagecreator_1.AppMessageCreator.messages), loadModule('./testmodule.json'));
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