"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileTotal = void 0;
const fs = require("graceful-fs");
const createdirectory_1 = require("./createdirectory");
function readFileTotal(folder) {
    let num = 0;
    try {
        const files = fs.readdirSync(folder);
        num = files.length;
    }
    catch (err) {
        console.log('err is ', err);
        if (err.code === "ENOENT" || err.code === undefined) {
            console.log('err code');
            (0, createdirectory_1.makeDirectory)(folder.substring(0, folder.length - 1));
        }
    }
    return num;
}
exports.readFileTotal = readFileTotal;
//# sourceMappingURL=read_file_total.js.map