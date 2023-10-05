"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAxiosMethod = void 0;
const handlestatusmessage_1 = require("../utility/handlestatusmessage");
const axios = require('axios');
async function postAxiosMethod(url, data) {
    let newVerififedFingerPrints = await axios.post(url, data)
        .then(res => {
        (0, handlestatusmessage_1.handleMessage)("Success post method");
        return res.data;
    })
        .catch(err => {
        (0, handlestatusmessage_1.handleMessage)("Failed to post method", err);
        return false;
    });
    return newVerififedFingerPrints;
}
exports.postAxiosMethod = postAxiosMethod;
//# sourceMappingURL=postmethod.js.map