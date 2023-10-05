"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const export_1 = require("../dependencies/DP/src/_interfaces/export");
const messageUtil = new export_1.FisCreateMessageUtility('FisAppID/Name');
const dataUtil = new export_1.FisReadDataUtility();
const messageType = new export_1.MessageTypeProfile();
const dataType = new export_1.DataTypeProfile();
const http = require('http');
const url = 'http://localhost:5050/message';
const method = 'POST';
let dataCommand = {
    entityName: "genericFileData",
    uuid: "584873b6-014e-4acc-bace-5ca4d6711927",
    data: JSON.stringify({
        uuid: "584873b6-014e-4acc-bace-5ca4d6711927",
        fpUuid: "59baba4d-fc06-456e-8236-696ebcbf118c",
        fpTemplate: "fptemplate",
        registeredDate: new Date(),
        status: "new fingerprint",
        location: "satok",
        personCode: "w002",
        position: "1",
        masterfp: false
    })
};
let dataCommandUpdate = {
    entityName: "genericFileData",
    operation: "update",
    uuid: "584873b6-014e-4acc-bace-5ca4d6711927",
    data: JSON.stringify({
        uuid: "584873b6-014e-4acc-bace-5ca4d6711927",
        fpUuid: "59baba4d-fc06-456e-8236-696ebcbf118c",
        fpTemplate: "fptemplate",
        registeredDate: new Date(),
        status: "new fingerprint",
        location: "satok",
        personCode: "w002",
        position: "1",
        masterfp: false
    })
};
let messages = new rxjs_1.Subject();
messages.subscribe(element => {
    sendHttpRequest(url, method, element, function (error) {
        if (error) {
            console.error('Error:', error);
        }
        else {
            console.log('Request sent successfully.');
        }
    });
});
function sendHttpRequest(url, method, data, callback) {
    console.log(data);
    const jsonData = JSON.stringify(data);
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(jsonData)
        }
    };
    const req = http.request(url, options, (res) => {
    });
    req.on('error', (error) => {
        callback(error);
    });
    req.write(jsonData);
    req.end();
    callback(null);
}
console.log('Client create login message');
const newLoginRequestMessage = messageUtil.getLoginMessage();
console.log('Server create login response message');
const newLoginResponseMessage = messageUtil.getResponseMessage('DummyUCPID', { ucpId: 'DummyUCPID' }, newLoginRequestMessage, 'Response to login');
console.log('Get current UCP ID');
const newUCPId = messageUtil.getUCPId(newLoginResponseMessage);
console.log('CurrentUCPID = ' + newUCPId);
console.log('Client create command message');
const newCommandMessage = messageUtil.getCommandMessage(newUCPId, export_1.Command.New, dataCommand);
console.log('Client create query message');
``;
const newQueryMessage = messageUtil.getQueryMessage(newUCPId, export_1.Query.GetData, dataCommand, 'Retrieve service ID.');
messages.next(newQueryMessage);
console.log(`Create Write Command Message`);
const newSaveCommandMessage = messageUtil.getCommandMessage(newUCPId, export_1.Command.Save, dataCommand);
messages.next(newSaveCommandMessage);
console.log(`Create Update Command Message`);
const newUpdateCommandMessage = messageUtil.getCommandMessage(newUCPId, export_1.Command.Update, dataCommand);
console.log(`Create Delete Command Message`);
const newDeleteCommandMessage = messageUtil.getCommandMessage(newUCPId, export_1.Command.Delete, dataCommand);
let primary_storage = {
    cacheMessageLimit: 0,
    storage: 'MongoDB',
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: "mongodb://192.168.100.59:27017/test1"
    }
};
let secondary_storage = {
    cacheMessageLimit: 0,
    storage: 'MongoDB',
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: "mongodb://192.168.100.59:27017/test2"
    }
};
let configurations = {
    incomingSource: Object.assign(Object.assign({}, primary_storage), { tags: ['default'] }),
    target: Object.assign(Object.assign({}, secondary_storage), { tags: ['default'] }),
};
sendHttpRequest('http://localhost:5050/startSynchronization', 'POST', configurations, (err) => {
    if (err)
        console.error(err.message);
    else
        console.log(`Start engine request sent.`);
});
//# sourceMappingURL=sendMsg.js.map