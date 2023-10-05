"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleloader_1 = require("../utils/moduleloader");
let modules = (0, moduleloader_1.load)([
    '../message/request/appsubscriptionmessage',
    '../message/notification/appmicroservicenotificationmessage'
]);
console.log('\nTest module loader load(modules: string[]): unknown');
console.log(JSON.stringify(Object.keys(modules), null, 2));
console.log(Object.values(modules).toString());
modules = (0, moduleloader_1.loadFromJson)('../test/testloadmodule.json');
console.log('\nTest module loader loadFromJson(modules: string): unknown');
console.log(JSON.stringify(Object.keys(modules), null, 2));
console.log(Object.values(modules).toString());
modules = (0, moduleloader_1.load)(['../message/messages']);
console.log(`\nLoad messages '../message/messages'.
Test module loader load(modules: string[]): unknown`);
console.log(JSON.stringify(Object.keys(modules), null, 2));
console.log(Object.values(modules).toString());
modules = (0, moduleloader_1.loadModuleProfileFromJson)('../test/testloadmoduleprofile.json');
console.log('\nTest module loader loadModuleProfileFromJson(modules: string): unknown');
console.log(JSON.stringify(Object.keys(modules), null, 2));
console.log(Object.values(modules).toString());
//# sourceMappingURL=testloadmodule.js.map