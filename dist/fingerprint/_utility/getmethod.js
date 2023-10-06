"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosMethod = void 0;
const axios_1 = require("axios");
const https = require("https");
async function getAxiosMethod(url) {
    // let data: Promise<string> = axios.get(url)
    //     .then(res => { 
    //         handleMessage(RESPONSE_MESSAGE.AXIOS_SUCCESS_GET);
    //         return res.data;
    //     })
    //     .catch(err => { 
    //         handleMessage(RESPONSE_MESSAGE.AXIOS_FAILED_GET, err.code);
    //         return false;
    //     })
    // return data;
    try {
        let httpsAgent = new https.Agent({ rejectUnauthorized: false, });
        return await axios_1.default.get(url, { httpsAgent }).then((res) => {
            if (res) {
                // let payload: handleResponseInterface = {
                //   status: RESPONSE_STATUS.SUCCESS,
                //   message: RESPONSE_MESSAGE.AXIOS_SUCCESS_POST,
                //   body: res.data
                // }
                return res;
            }
        })
            .catch(function (error) {
            console.log('connection error');
            throw error;
        });
    }
    catch (err) {
        if (err.code === 'ETIMEDOUT') {
            return err.code;
        }
    }
}
exports.getAxiosMethod = getAxiosMethod;
//# sourceMappingURL=getmethod.js.map