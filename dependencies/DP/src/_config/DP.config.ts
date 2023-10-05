import { process } from "../_environment/environment";
const UCP_url = process.env.UCP_Url; 

export class URLs {
  static readonly SERVER = 'http://swopt.com:4202';
  static readonly SOCKET = 'http://192.168.100.59:4203';
  //static readonly GRPC = "http://rpc.swopt.com:8080";
  static readonly GRPC = 'http://rpc.swopt.com:8081';
  //static readonly GRPC = "http://192.168.100.72:8081";
  //static readonly GRPC = "swopt.com:50151";
  static readonly NEST = 'http://swopt.com:4204';
  //static readonly NEST = "http://192.168.100.59:4204";
  static readonly NESTAUTH = URLs.NEST + '/auth/login';
  static readonly NESTAUTH_GOOGLE = URLs.NEST + '/auth/google';
  static readonly NESTMETA = URLs.NEST + '/data/metadata';
  static readonly NESTDATA = URLs.NEST + '/data/bizdata';
  static readonly NESTLABELS = URLs.NEST + '/data/labels';

  static readonly NESTWS = UCP_url || 'https://swopt.com:3011'; //"http://localhost:7722";
  static readonly UCP_GRPC = 'http://192.168.100.59:50151'
  //static readonly NESTWS_SITE = 'http://localhost:9722';
  static readonly EventEmitterTarget = {
    target1: URLs.NESTWS,
    //"target2":URLs.NESTWS_SITE
  };
  static readonly NESTWS_DEFAULT_SERVER = 'FISGST@SOFTWAREOPTIMAC\\SQL2008';
  static readonly TargetDatabase = 'FISGST_DEMO@SOFTWAREOPTIMAC\\SQL2008';
  static readonly NESTWS_ALL = {
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
  static readonly META = URLs.SERVER + '/api/metas';
  static readonly SAMPLE_DAT = URLs.SERVER + '/data';
  static readonly LOGIN_GOOGLE = URLs.SERVER + '/auth/google';
}
