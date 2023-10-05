"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
function postMessage(url, method, data, callback) {
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
let triggerMessage = {
    status: 1,
    message: "Perform sync now!"
};
postMessage(`http://localhost:5050/sync`, 'POST', triggerMessage, (error) => {
    if (error) {
        console.error('Error:', error);
    }
    else {
        console.log('Trigger Request Initiated');
    }
});
//# sourceMappingURL=sync.js.map