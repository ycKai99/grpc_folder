"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDirectory = void 0;
const fs = require("graceful-fs"); //const fs = require('fs');
// Make directory is not automated. Need explicit make directory. This is for security purpose.
function makeDirectory(dir) {
    if (fs.existsSync(dir)) {
    }
    else {
        fs.mkdirSync(dir);
    }
}
exports.makeDirectory = makeDirectory;
//# sourceMappingURL=makeDirectory.js.map