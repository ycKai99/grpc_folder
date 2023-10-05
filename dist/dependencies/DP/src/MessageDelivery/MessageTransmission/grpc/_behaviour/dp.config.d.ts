export declare namespace FisNet {
    const DEV_SRV: string;
    const DEV_SRV_FBACK: string;
    const DEV_UCP: string;
    namespace UCP {
        function getUri(): string;
        const FILE_UPLOAD: string;
        const LABELS: string;
    }
    const GRPC: string;
}
export declare class URLs {
    static readonly SERVER: string;
    static readonly SOCKET: string;
    static readonly GRPC: string;
    static readonly GRPC2: string;
    static readonly UCP: string;
    static readonly NEST: string;
    static readonly NEST_FBACK: string;
    static readonly NESTAUTH: string;
    static readonly NESTAUTH_GOOGLE: string;
    static readonly NESTMETA: string;
    static readonly NESTDATA: string;
    static readonly NESTLABELS: string;
    static readonly FILE_UPLOAD: string;
    static readonly META: string;
    static readonly SAMPLE_DAT: string;
    static readonly LOGIN_GOOGLE: string;
    static readonly LABELS: string;
    static readonly LABELS_UPDATE: string;
}
