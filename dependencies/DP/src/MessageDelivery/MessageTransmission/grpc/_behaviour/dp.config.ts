const UCPSERVER = 'swopt.com';
const APPSERVER = "swopt.com";
const RPCSERVER = "swopt.com";
export namespace FisNet {
    export const DEV_SRV = `https://${APPSERVER}:4205`;
    export const DEV_SRV_FBACK = `http://${APPSERVER}:4204`;
    export const DEV_UCP = `http://${UCPSERVER}:3301`;
    export namespace UCP  {
        export function getUri() {return `http://${UCPSERVER}:3011`};
        export const FILE_UPLOAD = DEV_UCP+"/cdn/upload";
        export const LABELS = DEV_SRV+"/data/lbl";
    }
    export const GRPC = `https://${RPCSERVER}:8081`; //dev server address
    //export const GRPC = `http://${RPCSERVER}:8081`; //test server address
}

export class URLs {
    static readonly SERVER = `http://${APPSERVER}:4202`;
    static readonly SOCKET = `http://${APPSERVER}:4203`;
    static readonly GRPC = FisNet.GRPC;
    static readonly GRPC2 = `http://${RPCSERVER}:8081`;
    static readonly UCP = FisNet.UCP.getUri();

    /**
     * 
     */
    //static readonly GRPC = "swopt.com:50151";
    static readonly NEST = `https://${APPSERVER}:4205`;
    static readonly NEST_FBACK = `http://${APPSERVER}:4204`;
    static readonly NESTAUTH = URLs.NEST+"/auth/login";
    static readonly NESTAUTH_GOOGLE = URLs.NEST+"/auth/google/callback";
    static readonly NESTMETA = URLs.NEST+"/data/metadata";
    static readonly NESTDATA = URLs.NEST+"/data/bizdata";
    static readonly NESTLABELS = URLs.NEST+"/data/labels";

    static readonly FILE_UPLOAD= URLs.UCP+"/cdn/upload";

    //static readonly GRPC = "http://swopt.com:4204/message";
    static readonly META = URLs.SERVER+"/api/metas";
    static readonly SAMPLE_DAT = URLs.SERVER+"/data";
    static readonly LOGIN_GOOGLE = URLs.SERVER+"/auth/google";
    static readonly LABELS = URLs.NEST+"/data/labels2";
    static readonly LABELS_UPDATE = URLs.NEST+"/data/labels/update";
    
}
