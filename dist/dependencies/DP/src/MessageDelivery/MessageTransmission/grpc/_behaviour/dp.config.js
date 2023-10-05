"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLs = exports.FisNet = void 0;
const UCPSERVER = 'swopt.com';
const APPSERVER = "swopt.com";
const RPCSERVER = "swopt.com";
var FisNet;
(function (FisNet) {
    FisNet.DEV_SRV = `https://${APPSERVER}:4205`;
    FisNet.DEV_SRV_FBACK = `http://${APPSERVER}:4204`;
    FisNet.DEV_UCP = `http://${UCPSERVER}:3301`;
    let UCP;
    (function (UCP) {
        function getUri() { return `http://${UCPSERVER}:3011`; }
        UCP.getUri = getUri;
        ;
        UCP.FILE_UPLOAD = FisNet.DEV_UCP + "/cdn/upload";
        UCP.LABELS = FisNet.DEV_SRV + "/data/lbl";
    })(UCP = FisNet.UCP || (FisNet.UCP = {}));
    FisNet.GRPC = `https://${RPCSERVER}:8081`;
})(FisNet = exports.FisNet || (exports.FisNet = {}));
class URLs {
}
exports.URLs = URLs;
URLs.SERVER = `http://${APPSERVER}:4202`;
URLs.SOCKET = `http://${APPSERVER}:4203`;
URLs.GRPC = FisNet.GRPC;
URLs.GRPC2 = `http://${RPCSERVER}:8081`;
URLs.UCP = FisNet.UCP.getUri();
URLs.NEST = `https://${APPSERVER}:4205`;
URLs.NEST_FBACK = `http://${APPSERVER}:4204`;
URLs.NESTAUTH = URLs.NEST + "/auth/login";
URLs.NESTAUTH_GOOGLE = URLs.NEST + "/auth/google/callback";
URLs.NESTMETA = URLs.NEST + "/data/metadata";
URLs.NESTDATA = URLs.NEST + "/data/bizdata";
URLs.NESTLABELS = URLs.NEST + "/data/labels";
URLs.FILE_UPLOAD = URLs.UCP + "/cdn/upload";
URLs.META = URLs.SERVER + "/api/metas";
URLs.SAMPLE_DAT = URLs.SERVER + "/data";
URLs.LOGIN_GOOGLE = URLs.SERVER + "/auth/google";
URLs.LABELS = URLs.NEST + "/data/labels2";
URLs.LABELS_UPDATE = URLs.NEST + "/data/labels/update";
//# sourceMappingURL=dp.config.js.map