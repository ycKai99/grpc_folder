"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosMethod = void 0;
const handlestatusmessage_1 = require("../utility/handlestatusmessage");
const axios = require('axios');
async function getAxiosMethod(url) {
    let fptemplate = axios.get(url)
        .then(res => {
        (0, handlestatusmessage_1.handleMessage)("Success get method");
        return res.data;
    })
        .catch(err => {
        (0, handlestatusmessage_1.handleMessage)("Failed to get method", err);
        return false;
    });
    return fptemplate;
}
exports.getAxiosMethod = getAxiosMethod;
//# sourceMappingURL=getmethod.js.map