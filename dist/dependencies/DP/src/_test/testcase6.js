"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_BROWSER = exports.IS_NODE = void 0;
const export_1 = require("../_interfaces/export");
const environment_1 = require("../_environment/environment");
exports.IS_NODE = typeof global === 'object' && '[object global]' === global.toString.call(global);
exports.IS_BROWSER = typeof window === 'object' && '[object Window]' === window.toString.call(window);
console.log(`IS_NODE: ${exports.IS_NODE}`);
console.log(`IS_BROWSER: ${exports.IS_BROWSER}`);
console.log(environment_1.process.env.UCP_Url);
const messageUtil = new export_1.FisCreateMessageUtility("FisAppID/Name");
const newLoginRequestMessage = messageUtil.getLoginMessage();
console.log(newLoginRequestMessage);
//# sourceMappingURL=testcase6.js.map