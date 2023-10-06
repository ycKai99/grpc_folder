import { Request } from './grpc/messages_pb';
import { Observer, Subscriber } from 'rxjs';
export declare type FisMsgResponse = {
    type: 'GenericData';
} | {
    type: 'Metadata';
};
export declare class Init {
    payload: any;
    static readonly type = "[DP] Init";
    constructor(payload: any);
}
export declare class Login {
    payload: {
        user: any;
        observer?: Observer<any>;
        authType?: string;
    };
    static readonly type = "[DP] Login";
    constructor(payload: {
        user: any;
        observer?: Observer<any>;
        authType?: string;
    });
}
export declare class Logout {
    static readonly type = "[DP] Logout";
}
export declare class ClientCommand {
    command: any;
    static readonly type = "[DP] ClientCommand";
    constructor(command: any);
}
export declare class ClientQuery {
    query: any;
    static readonly type = "[DP] ClientQuery";
    constructor(query: any);
}
export declare class MakeProfobufCall {
    request: Request;
    stateContext?: any;
    static readonly type = "[DP] MakeProtobufCall";
    constructor(request: Request, stateContext?: any);
}
export declare class MakeDPCall {
    reqMsg: any;
    reqId?: string;
    observer?: Subscriber<any>;
    completeOnSuccess?: boolean;
    static readonly type = "[DP] MakeDPCall";
    constructor(reqMsg: any, reqId?: string, observer?: Subscriber<any>, completeOnSuccess?: boolean);
}
export declare class CallUacp {
    message: any;
    reqId?: string;
    observer?: Subscriber<any>;
    static readonly type = "[DP] CallUacp";
    constructor(message: any, reqId?: string, observer?: Subscriber<any>);
}
