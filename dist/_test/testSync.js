"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* -----------------------------   SYNCRHONIZATION TRIGGERTEST -----------------------------  */
const http = require('http');
const rxjs_1 = require("rxjs");
const export_1 = require("../_dependencies/DP/src/interface/export");
const messageUtil = new export_1.FisCreateMessageUtility('FisAppID/Name');
const dataUtil = new export_1.FisReadDataUtility();
const messageType = new export_1.MessageTypeProfile();
const dataType = new export_1.DataTypeProfile();
const url = 'http://localhost:5050/message';
const method = 'POST';
// Example trigger message. As long sa it has the two properties
let triggerMessage = {
    status: 1,
    message: "Perform sync now!"
};
// Test data to be used for plucking it into the generated message to be sent over to the client. 
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
        personIdentifier: "w002",
        position: "1",
        masterfp: false
    })
};
// Create an subject that takes in generated messages to be broadcast so to speak to corresponding servers.
// This is not necessary by the way but merely a way to avoid boiletplate code
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
// This functions is responsible for sending/posting http request to the designated server site.
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
        // Handle response here if needed
        // For this example, we don't expect a response
    });
    req.on('error', (error) => {
        callback(error);
    });
    req.write(jsonData);
    req.end();
    // Indicate success without a response
    callback(null);
}
/* ----------- MESSAGE GENERATION SECTION ----------- */
// Client create login message
console.log('Client create login message');
const newLoginRequestMessage = messageUtil.getLoginMessage();
// Server create response message
console.log('Server create login response message');
const newLoginResponseMessage = messageUtil.getResponseMessage('DummyUCPID', { ucpId: 'DummyUCPID' }, newLoginRequestMessage, 'Response to login');
// Get current UCP ID
console.log('Get current UCP ID');
const newUCPId = messageUtil.getUCPId(newLoginResponseMessage);
console.log('CurrentUCPID = ' + newUCPId);
// Client create command message
console.log('Client create command message');
const newCommandMessage = messageUtil.getCommandMessage(newUCPId, export_1.Command.New, dataCommand);
// messages.next(newCommandMessage)
// Client create query message
console.log('Client create query message');
``;
const newQueryMessage = messageUtil.getQueryMessage(newUCPId, export_1.Query.GetData, dataCommand, 'Retrieve service ID.');
messages.next(newQueryMessage);
// Client create write message
console.log(`Create Write Command Message`);
const newSaveCommandMessage = messageUtil.getCommandMessage(newUCPId, export_1.Command.Save, dataCommand);
messages.next(newSaveCommandMessage);
// Client create update message
console.log(`Create Update Command Message`);
const newUpdateCommandMessage = messageUtil.getCommandMessage(newUCPId, export_1.Command.Update, dataCommand);
// messages.next(newUpdateCommandMessage)
// Client create delete message
console.log(`Create Delete Command Message`);
const newDeleteCommandMessage = messageUtil.getCommandMessage(newUCPId, export_1.Command.Delete, dataCommand);
// messages.next(newDeleteCommandMessage)
/* Kick start the syncrhonization engine */
// Declare all the settings.
let primary_storage = {
    cacheMessageLimit: 0,
    storage: process.env.STORAGE_OPTION_PRIMARY,
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: process.env.MONGODB_SERVER
    }
};
// Remote target to by synchronized
let secondary_storage = {
    cacheMessageLimit: 0,
    storage: process.env.STORAGE_OPTION_SECONDARY,
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        url: process.env.REOMTE_MONGODB_SERVER
    }
};
// Settings to be structured in such manner to be passed as a argument for initialization for AuditMessage service
// Need to combine both the primary and secondary
let configurations = {
    incomingSource: Object.assign(Object.assign({}, primary_storage), { tags: ['default'] }),
    target: Object.assign(Object.assign({}, secondary_storage), { tags: ['default'] }) //LogSetting & {tags:string[] } 
};
// Send a http post request to trigger the sync
function triggerSync(url, method, data, callback) {
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
        // Handle response here if needed
        // For this example, we don't expect a response
    });
    req.on('error', (error) => {
        callback(error);
    });
    req.write(jsonData);
    req.end();
    // Indicate success without a response
    callback(null);
}
setTimeout(() => {
    triggerSync(`http://localhost:4888/performSync`, 'POST', triggerMessage, (error) => {
        if (error) {
            console.error('Error:', error);
        }
        else {
            console.log('Trigger Request Initiated');
        }
    });
}, 7000);
//# sourceMappingURL=testSync.js.map