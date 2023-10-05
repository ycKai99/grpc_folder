import { load, loadFromJson, loadModuleProfile, loadModuleProfileFromJson } from '../utils/moduleloader';

let modules: unknown = load([
    '../message/request/appsubscriptionmessage',
    '../message/notification/appmicroservicenotificationmessage'
]);

console.log('\nTest module loader load(modules: string[]): unknown');
console.log(JSON.stringify(Object.keys(modules), null, 2));
console.log(Object.values(modules).toString());

modules = loadFromJson('../test/testloadmodule.json');
console.log('\nTest module loader loadFromJson(modules: string): unknown');
console.log(JSON.stringify(Object.keys(modules), null, 2));
console.log(Object.values(modules).toString());

modules = load(['../message/messages']);
console.log(`\nLoad messages '../message/messages'.
Test module loader load(modules: string[]): unknown`);
console.log(JSON.stringify(Object.keys(modules), null, 2));
console.log(Object.values(modules).toString());

modules = loadModuleProfileFromJson('../test/testloadmoduleprofile.json');
console.log('\nTest module loader loadModuleProfileFromJson(modules: string): unknown');
console.log(JSON.stringify(Object.keys(modules), null, 2));
console.log(Object.values(modules).toString());


