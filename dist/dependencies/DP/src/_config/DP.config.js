"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLs = void 0;
const environment_1 = require("../_environment/environment");
const UCP_url = environment_1.process.env.UCP_Url;
class URLs {
}
exports.URLs = URLs;
URLs.SERVER = 'http://swopt.com:4202';
URLs.SOCKET = 'http://192.168.100.59:4203';
URLs.GRPC = 'http://rpc.swopt.com:8081';
URLs.NEST = 'http://swopt.com:4204';
URLs.NESTAUTH = URLs.NEST + '/auth/login';
URLs.NESTAUTH_GOOGLE = URLs.NEST + '/auth/google';
URLs.NESTMETA = URLs.NEST + '/data/metadata';
URLs.NESTDATA = URLs.NEST + '/data/bizdata';
URLs.NESTLABELS = URLs.NEST + '/data/labels';
URLs.NESTWS = UCP_url || 'https://swopt.com:3011';
URLs.UCP_GRPC = 'http://192.168.100.59:50151';
URLs.EventEmitterTarget = {
    target1: URLs.NESTWS,
};
URLs.NESTWS_DEFAULT_SERVER = 'FISGST@SOFTWAREOPTIMAC\\SQL2008';
URLs.TargetDatabase = 'FISGST_DEMO@SOFTWAREOPTIMAC\\SQL2008';
URLs.NESTWS_ALL = {
    'FISGST@SOFTWAREOPTIMAC\\SQL2008': URLs.NESTWS,
};
URLs.META = URLs.SERVER + '/api/metas';
URLs.SAMPLE_DAT = URLs.SERVER + '/data';
URLs.LOGIN_GOOGLE = URLs.SERVER + '/auth/google';
//# sourceMappingURL=DP.config.js.map