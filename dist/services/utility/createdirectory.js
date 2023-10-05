"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDirectory = void 0;
const fs = require("graceful-fs");
const handlestatusmessage_1 = require("./handlestatusmessage");
function makeDirectory(dir) {
    if (fs.existsSync(dir)) {
        (0, handlestatusmessage_1.handleMessage)("Folder exists.");
    }
    else {
        fs.mkdirSync(dir);
        (0, handlestatusmessage_1.handleMessage)("Folder created.");
    }
}
exports.makeDirectory = makeDirectory;
//# sourceMappingURL=createdirectory.js.map