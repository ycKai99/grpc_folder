"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writetofilepath = void 0;
/* eslint-disable @typescript-eslint/no-inferrable-types */
const fs = require("graceful-fs"); //const fs = require('fs');
const debug_1 = require("./debug");
const getObjDirectory_1 = require("./getObjDirectory");
const utility_settings_1 = require("./utility.settings");
async function writetofilepath(selectedpath, name, variable, handler) {
    let path;
    path = getObjDirectory_1.getObjDirectory() + "\\";
    if (selectedpath > "") {
        path = path + selectedpath + "\\";
    }
    let appName = "";
    if (utility_settings_1.utility_settings && utility_settings_1.utility_settings.AppName > "") {
        appName = utility_settings_1.utility_settings.AppName + ": ";
    }
    try {
        const str = JSON.stringify(variable, null, 1);
        fs.writeFileSync(path + "obj_" + name + '.json', str);
        debug_1.LogSaveMessage(appName + "Saved internal object " + name + ".");
        if (handler) {
            handler("success");
        }
    }
    catch (e) {
        debug_1.LogSaveMessage(path + "Error write object " + name + "." + e.message);
        if (handler) {
            handler("error");
        }
    }
}
exports.writetofilepath = writetofilepath;
//# sourceMappingURL=writetofilepath.js.map