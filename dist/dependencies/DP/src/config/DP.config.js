"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLs = void 0;
require('dotenv').config();
const UCP_url = process.env.UCP_Url;
class URLs {
}
exports.URLs = URLs;
URLs.SERVER = 'http://swopt.com:4202';
URLs.SOCKET = 'http://192.168.100.59:4203';
//static readonly GRPC = "http://rpc.swopt.com:8080";
URLs.GRPC = 'http://rpc.swopt.com:8081';
//static readonly GRPC = "http://192.168.100.72:8081";
//static readonly GRPC = "swopt.com:50151";
URLs.NEST = 'http://swopt.com:4204';
//static readonly NEST = "http://192.168.100.59:4204";
URLs.NESTAUTH = URLs.NEST + '/auth/login';
URLs.NESTAUTH_GOOGLE = URLs.NEST + '/auth/google';
URLs.NESTMETA = URLs.NEST + '/data/metadata';
URLs.NESTDATA = URLs.NEST + '/data/bizdata';
URLs.NESTLABELS = URLs.NEST + '/data/labels';
URLs.NESTWS = UCP_url || 'https://swopt.com:3011'; //"http://localhost:7722";
//static readonly NESTWS_SITE = 'http://localhost:9722';
URLs.EventEmitterTarget = {
    target1: URLs.NESTWS,
    //"target2":URLs.NESTWS_SITE
};
URLs.NESTWS_DEFAULT_SERVER = 'FISGST@SOFTWAREOPTIMAC\\SQL2008';
URLs.TargetDatabase = 'FISGST_DEMO@SOFTWAREOPTIMAC\\SQL2008';
URLs.NESTWS_ALL = {
    'FISGST@SOFTWAREOPTIMAC\\SQL2008': URLs.NESTWS,
    //'FISGST_DEMO@SOFTWAREOPTIMAC\\SQL2008': URLs.NESTWS_SITE,
};
/*
  static readonly NESTWS = "http://swopt.com:3011";
  static readonly EventEmitterTarget = {
      "target1": URLs.NESTWS
  };
  static readonly NESTWS_DEFAULT_SERVER = "FISGST@SOFTWAREOPTIMAC\\SQL2008";
  static readonly NESTWS_ALL = {
      "FISGST@SOFTWAREOPTIMAC\\SQL2008": URLs.NESTWS,
  };
  */
//static readonly GRPC = "http://swopt.com:4204/message";
URLs.META = URLs.SERVER + '/api/metas';
URLs.SAMPLE_DAT = URLs.SERVER + '/data';
URLs.LOGIN_GOOGLE = URLs.SERVER + '/auth/google';
//# sourceMappingURL=DP.config.js.map