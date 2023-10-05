"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExec = void 0;
const fs = require("graceful-fs");
const constsetting_1 = require("../../interfaces/constsetting");
const createdirectory_1 = require("./createdirectory");
const handlestatusmessage_1 = require("./handlestatusmessage");
function readExec(fileName, entityUUID) {
    let result;
    let readFileName = "./" + constsetting_1.DIRECTORY + "/" + fileName + "." + "json";
    try {
        let filestat = fs.statSync(readFileName);
        let filesize = filestat.size / (1024 * 1024);
        if (filesize <= 40) {
            let rawData = fs.readFileSync(readFileName, 'utf-8').toString();
            if (rawData.length > 0) {
                let arr = [];
                let data = rawData.split("\r\n");
                data.forEach(element => {
                    try {
                        if (element !== '') {
                            let json = JSON.parse(element);
                            arr.push(json);
                        }
                    }
                    catch (err) {
                        result = [];
                        (0, handlestatusmessage_1.handleMessage)("Read file failed", err);
                    }
                });
                result = arr;
            }
            else {
                result = [];
            }
        }
        else {
            result = [];
            (0, handlestatusmessage_1.handleMessage)("Exceed file size");
        }
    }
    catch (err) {
        if (err.code === "ENOENT" || err.code === undefined) {
            (0, createdirectory_1.makeDirectory)(constsetting_1.DIRECTORY);
            fs.writeFile(readFileName, '', (error) => {
                if (error) {
                    (0, handlestatusmessage_1.handleMessage)("Failed create file", error);
                }
                else {
                    (0, handlestatusmessage_1.handleMessage)("Success created file");
                    readExec(fileName, entityUUID);
                }
            });
        }
        else {
            (0, handlestatusmessage_1.handleMessage)("Unknown error", err);
        }
    }
    console.log('result is ', result);
    return result;
}
exports.readExec = readExec;
//# sourceMappingURL=readdata.js.map