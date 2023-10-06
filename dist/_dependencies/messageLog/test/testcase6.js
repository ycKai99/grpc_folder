"use strict";
/* Testing the new functions for the convertion for message log into CDMS fingerprint data */
Object.defineProperty(exports, "__esModule", { value: true });
const export_1 = require("../interface/export");
const service = new export_1.LoggingService();
let fingerprintObj = {
    _id: {
        $oid: "643d57828dc77945a2438f71"
    },
    uuid: "30979b36-a44f-4984-8497-f1db8d1d3e45",
    filename: "cat.jpg",
    filetype: "image/jpeg",
    filesize: "2706",
    lastModified: "1681709825589",
    filedata: "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",
    __v: 0
};
service.convertCDMStoMessageLog(fingerprintObj).then((res) => {
    console.log(res);
    service.convertMessageLogtoCDMS(res).then((res) => {
        console.log(res);
    });
});
//# sourceMappingURL=testcase6.js.map