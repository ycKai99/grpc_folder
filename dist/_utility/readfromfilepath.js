"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readfromfilepath = void 0;
/* eslint-disable @typescript-eslint/no-inferrable-types */
const fs = require("graceful-fs"); //const fs = require('fs');
const getObjDirectory_1 = require("./getObjDirectory");
const utility_settings_1 = require("./utility.settings");
async function readfromfilepath(selectedpath, name, variable) {
    let returnvariable;
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
        const read = await fs.readFileSync(path + "obj_" + name + '.json');
        variable = JSON.parse(read.toString());
        returnvariable = variable;
    }
    catch (e) {
        console.info(appName + "Error read object " + name + "." + e.message);
    }
    return returnvariable;
}
exports.readfromfilepath = readfromfilepath;
//# sourceMappingURL=readfromfilepath.js.map