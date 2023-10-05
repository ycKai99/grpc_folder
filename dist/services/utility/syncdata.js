"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncData = void 0;
const constsetting_1 = require("../../interfaces/constsetting");
const writedata_1 = require("./writedata");
const fs = require("graceful-fs");
const postmethod_1 = require("../axios/postmethod");
function syncData(res, fpTemplateData, uuidArray) {
    if (res.syncData.length !== 0) {
        console.log('syncData length is ', res.syncData.length);
        res.syncData.forEach(element => {
            fpTemplateData.push(element);
            (0, writedata_1.writeExec)(constsetting_1.ENTITYNAME.FP_TEMPLATE_MSG, element);
            uuidArray.push(element['uuid']);
        });
    }
    if (res.requestData.length !== 0) {
        console.log('request length is ', res.requestData.length);
        let obj = [];
        let syncImageData = [];
        let syncRemoteData = fpTemplateData.filter(x => { return res.requestData.includes(x['uuid']); });
        syncRemoteData.forEach(element => {
            syncImageData.push(((fs.readFileSync(element['imageName'])).toString('base64')));
        });
        obj.push(syncRemoteData, syncImageData);
        let countRequest = 0;
        do {
            let arrData = [];
            arrData.push([obj[0][countRequest]], [obj[1][countRequest]]);
            (0, postmethod_1.postAxiosMethod)(constsetting_1.URL_SYNC_REMOTE_DATA, arrData);
            countRequest++;
            console.log('countRequest is ', countRequest);
        } while (countRequest < res.requestData.length);
        console.log('finish sync');
    }
}
exports.syncData = syncData;
//# sourceMappingURL=syncdata.js.map