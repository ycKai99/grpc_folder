"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDate = exports.locationRelationMessage = exports.locationTagMessage_ext = exports.locationTagMessage = exports.handleResponseMessage = exports.zktecoFpMessage = void 0;
const uuid_1 = require("uuid");
function zktecoFpMessage(fpUuid, fingerprintData, status) {
    const messageDetails = {
        uuid: generateUUID(),
        fpUuid: fingerprintData['fpUuid'],
        fpTemplate: fingerprintData['fptemplate'],
        registeredDate: new Date(),
        status: fingerprintData['status'],
        location: process.env.LOCATION,
        personCode: fingerprintData['personCode'],
        position: fingerprintData['position'] ? fingerprintData['position'] : "unknown",
        masterfp: fingerprintData['masterfp'] ? true : false
    };
    return messageDetails;
}
exports.zktecoFpMessage = zktecoFpMessage;
function handleResponseMessage(fpUuid, data) {
    const messageDetails = {
        uuid: generateUUID(),
        fpUuid: fpUuid,
        registeredDate: new Date(),
        message: data,
        messageType: "FPEevent",
        deviceNo: "ZKteco"
    };
    return messageDetails;
}
exports.handleResponseMessage = handleResponseMessage;
function locationTagMessage(fpUuid) {
    return locationTagMessage_ext(fpUuid, process.env.LOCATION);
}
exports.locationTagMessage = locationTagMessage;
function locationTagMessage_ext(fpUuid, tagString) {
    const messageDetails = {
        uuid: generateUUID(),
        fpUuid: fpUuid,
        location: tagString
    };
    return messageDetails;
}
exports.locationTagMessage_ext = locationTagMessage_ext;
function locationRelationMessage(child, parent) {
    const messageDetails = {
        uuid: generateUUID(),
        child: child,
        parent: parent
    };
    return messageDetails;
}
exports.locationRelationMessage = locationRelationMessage;
function generateUUID() {
    const uuid = (0, uuid_1.v4)();
    return uuid;
}
function generateDate() {
    const date = new Date();
    const timezone = "Asia/Singapore";
    const formattedDate = new Intl.DateTimeFormat("en-US", { timeZone: timezone, month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, }).format(date);
    return formattedDate;
}
exports.generateDate = generateDate;
//# sourceMappingURL=generatemessage.js.map