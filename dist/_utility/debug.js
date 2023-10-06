"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSaveMessage = exports.LogGeneralMesssage = exports.Log = exports.debug_option = void 0;
const option = require("./debug.option.json");
exports.debug_option = option;
function Log(info) {
    if (exports.debug_option.debug.enabled) {
        console.log(info);
    }
}
exports.Log = Log;
function LogGeneralMesssage(info) {
    if (exports.debug_option.debug.log.GeneralMessage) {
        Log(info);
    }
}
exports.LogGeneralMesssage = LogGeneralMesssage;
function LogSaveMessage(info) {
    if (exports.debug_option.debug.log.SaveMessage) {
        Log(info);
    }
}
exports.LogSaveMessage = LogSaveMessage;
//# sourceMappingURL=debug.js.map