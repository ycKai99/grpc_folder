"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeExec = void 0;
const fs = require("graceful-fs");
const constsetting_1 = require("../../interfaces/constsetting");
const handlestatusmessage_1 = require("./handlestatusmessage");
function writeExec(filePath, data) {
    let readFileName = "./" + constsetting_1.DIRECTORY + "/" + filePath + "." + "json";
    fs.appendFile(readFileName, JSON.stringify(data, null, 4) + "\r\n", (err) => {
        if (err) {
            (0, handlestatusmessage_1.handleMessage)("failed append data", err);
        }
        else {
            (0, handlestatusmessage_1.handleMessage)("Success append data");
        }
    });
}
exports.writeExec = writeExec;
//# sourceMappingURL=writedata.js.map