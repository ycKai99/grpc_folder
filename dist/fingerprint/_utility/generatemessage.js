"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDate = exports.personProfileMessage = exports.deviceTagMessage = exports.locationRelationMessage = exports.locationTagMessage_ext = exports.locationTagMessage = exports.fpEventMessage = exports.zktecoFpMessage = void 0;
const export_1 = require("../../_dependencies/DP/src/interface/export");
function zktecoFpMessage(fingerprintData, status) {
    let messageDetails = {
        uuid: new export_1.Uuid().generateId(),
        fpUuid: fingerprintData['fpUuid'],
        fpTemplate: fingerprintData['fpTemplate'],
        registeredDate: new Date(),
        status: status,
        location: process.env.LOCATION,
        personIdentifier: fingerprintData['personIdentifier'] ? fingerprintData['personIdentifier'] : "",
        position: fingerprintData['position'] ? fingerprintData['position'] : "",
        masterfp: fingerprintData['masterfp'] ? true : false
    };
    return messageDetails;
}
exports.zktecoFpMessage = zktecoFpMessage;
function fpEventMessage(fpUuid, data, deviceNo) {
    let messageDetails = {
        uuid: new export_1.Uuid().generateId(),
        fpUuid: fpUuid,
        registeredDate: new Date(),
        message: data,
        messageType: "FPEevent",
        deviceNo: deviceNo
    };
    return messageDetails;
}
exports.fpEventMessage = fpEventMessage;
function locationTagMessage(fpUuid) {
    return locationTagMessage_ext(fpUuid, process.env.LOCATION);
}
exports.locationTagMessage = locationTagMessage;
function locationTagMessage_ext(fpUuid, tagString) {
    let messageDetails = {
        uuid: new export_1.Uuid().generateId(),
        fpUuid: fpUuid,
        location: tagString
    };
    return messageDetails;
}
exports.locationTagMessage_ext = locationTagMessage_ext;
function locationRelationMessage(child, parent) {
    let messageDetails = {
        uuid: new export_1.Uuid().generateId(),
        child: child,
        parent: parent
    };
    return messageDetails;
}
exports.locationRelationMessage = locationRelationMessage;
function deviceTagMessage(deviceNo) {
    let messageDetails = {
        uuid: new export_1.Uuid().generateId(),
        deviceNo: deviceNo,
        location: process.env.LOCATION
    };
    return messageDetails;
}
exports.deviceTagMessage = deviceTagMessage;
function personProfileMessage(personIdentifier, personName) {
    let messageDetails = {
        uuid: new export_1.Uuid().generateId(),
        pers_name: personName,
        pers_new_ic: '',
        pers_sex: '',
        pers_code: '',
        pers_dob: '',
        pers_race: '',
        pers_religion: '',
        pers_marital: '',
        pers_nationality: '',
        orgn_code: '',
        orgn_full_name: '',
        emp_employ_type: ''
    };
    return messageDetails;
}
exports.personProfileMessage = personProfileMessage;
function generateDate() {
    let date = new Date();
    let timezone = "Asia/Singapore";
    let formattedDate = new Intl.DateTimeFormat("en-US", { timeZone: timezone, month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, }).format(date);
    return formattedDate;
}
exports.generateDate = generateDate;
//# sourceMappingURL=generatemessage.js.map