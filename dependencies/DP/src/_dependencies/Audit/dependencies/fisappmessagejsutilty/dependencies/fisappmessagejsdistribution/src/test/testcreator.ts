import { AppMessageType, ProducerType, DataFormat } from '../types/appmessagetype';
import { AppMessageCreator } from '../message/appmessagecreator';
// import { appsubscriptionmessage as Subscription } from '../message/request/appsubscriptionmessage';
// import { AppMicroserviceNotificationMessage as MicroserviceNotification } from '../message/notification/appmicroservicenotificationmessage';
// import * as fs from 'fs';
// import * as path from 'path';
import * as test from './testmodule.json';

interface ModuleProfile {
    module: string[]
}

console.log(JSON.stringify(test, null, 2));

//loadModule( path.join(__dirname, '/testmodule.json'));
function loadModule(modulesFile: string): object {
    let moduleProifle: ModuleProfile;
    let modules: object;

    // moduleProifle = JSON.parse(fs.readFileSync(modulesFile, 'utf8'));
    moduleProifle = require(modulesFile);
    console.log(JSON.stringify(moduleProifle, null, 2));
    // console.log(JSON.stringify(moduleProifle.module, null, 2));
    for (let i = 0; i < moduleProifle.module.length; i++) {
        // console.log(JSON.stringify(require(moduleProifle.module[i]).toString(), null, 2));
        modules = { ...modules, ...require(moduleProifle.module[i]) };
    }
    console.log(JSON.stringify(Object.keys(modules), null, 2));
    console.log(Object.values(modules).toString());
    return modules;
}

// AppMessageCreator.messages = { ...{}, 
//     ...AppMessageCreator.messages,
//     ...{ Subscription: Subscription, MicroserviceNotification: MicroserviceNotification }
// };
AppMessageCreator.messages = { ...AppMessageCreator.messages, ...loadModule('./testmodule.json') };//...loadModule( path.join(__dirname, '/testmodule.json'))};
console.log(JSON.stringify(
    AppMessageCreator.create({
        messageType: AppMessageType.Command,    //AppMessageType.Subscription
        messageName: "Test Command",
        isAggregate: false,
        security: {},
        dataLocation: {isEmbaded: true},
        dataFormat: {dataFormat:DataFormat.Json},
        producer: {
            type: ProducerType.AppServer,
            origin: { userApplication: { userAppId: "FIS", userAppName: "FIS" } }
        },
        data: {}
    }), null, 2));
