"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refrechConnection = void 0;
const axios_1 = require("axios");
const constsetting_1 = require("../../interfaces/constsetting");
async function refrechConnection() {
    let data;
    await axios_1.default.get(process.env.REMOTE_SERVER)
        .then((res) => { console.log('REMOTE SERVER LIVE'); data = constsetting_1.STAT.ONLINE; })
        .catch((err) => { console.log('REMOTE SERVER DEAD'); data = constsetting_1.STAT.OFFLINE; });
    return data;
}
exports.refrechConnection = refrechConnection;
//# sourceMappingURL=checkconnectionstatus.js.map