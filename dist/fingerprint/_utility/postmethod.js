"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAxiosMethod = void 0;
const axios = require('axios');
const https = require("https");
async function postAxiosMethod(url, data) {
    // let returnData = await axios.post(url, data)
    //   .then(res => {
    //     handleMessage(RESPONSE_MESSAGE.AXIOS_SUCCESS_POST);
    //     return handleResponse(1,RESPONSE_MESSAGE.AXIOS_SUCCESS_POST,res.data)
    //     return res.data;
    //   })
    //   .catch(err => {
    //     handleMessage(RESPONSE_MESSAGE.AXIOS_FAILED_POST, err.code);
    //     return handleResponse(-1,err)
    //     return false;
    //   });
    // return returnData;
    try {
        axios.defaults.timeout = 30000;
        axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });
        let returnData = await axios.post(url, data);
        // console.log("RETURN DATA : ", returnData)
        if (returnData) {
            if (returnData.data.status === -1 /* ERROR */) {
                throw returnData.data.message;
            }
            if (returnData.data.status === 1 /* SUCCESS */) {
                return returnData.data;
            }
            return returnData.data;
        }
    }
    catch (err) {
        // console.log("ERROR : ",err);
        throw err;
    }
}
exports.postAxiosMethod = postAxiosMethod;
//# sourceMappingURL=postmethod.js.map