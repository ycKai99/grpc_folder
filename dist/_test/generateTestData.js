"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const export_1 = require("../_dependencies//DP/src/interface/export");
const app_storage_service_1 = require("../fingerprint/_utility/app.storage.service");
const app_zkt_fingerprint_service_1 = require("../fingerprint/_utility/app.zkt_fingerprint.service");
let fpTemplateData = [];
fpTemplateData.push({
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateData1",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "",
    position: "",
    masterfp: false
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateData2",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "",
    position: "",
    masterfp: false
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA1",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "1",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA2",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "2",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA3",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "3",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA4",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "4",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA5",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "5",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA6",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "6",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA7",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "7",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA8",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "8",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA9",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "9",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA10",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "10",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB1",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "1",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB2",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "2",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB3",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "3",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB4",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "4",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB5",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "5",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB6",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "6",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB7",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "7",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB8",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "8",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB9",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "9",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB10",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "10",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataAB11",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-12345",
    position: "10",
    masterfp: false
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataA11",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "F0002",
    position: "9",
    masterfp: false
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataC11",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-00001",
    position: "8",
    masterfp: true
}, {
    uuid: new export_1.Uuid().generateId(),
    fpUuid: new export_1.Uuid().generateId(),
    fpTemplate: "templateDataC12",
    registeredDate: new Date("2023-04-20"),
    status: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
    location: "Somewhere",
    personIdentifier: "UUID0-11234-12345-00001",
    position: "9",
    masterfp: true
});
let storage = new app_storage_service_1.StorageController();
let fp = new app_zkt_fingerprint_service_1.ZKTFingerprintService();
storage.readData("fingerprintTemplateData" /* FP_TEMPLATE_MSG */).then((data) => {
    let temp = JSON.parse(data);
    if (temp.length == 0) {
        fpTemplateData.forEach((val) => {
            fp.addData("fingerprintTemplateData" /* FP_TEMPLATE_MSG */, val);
        });
    }
});
//# sourceMappingURL=generateTestData.js.map