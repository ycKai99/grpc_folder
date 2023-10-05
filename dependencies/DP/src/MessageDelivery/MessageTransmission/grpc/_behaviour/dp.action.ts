// import { CommandModel, QueryModel, User } from './dp.state';
import { Request, Response } from './utility/messages_pb';
// import { UacpRequest } from './message.interface';
// import { AbstractControl } from '@angular/forms';
import { Observer, Subscriber } from 'rxjs';
// import { FisAppRequestMessage } from '~/app/fisappmessagejs/src/fis/fismessagetype';

export type FisMsgResponse = {type: 'GenericData'} | {type: 'Metadata'}

export class Init {
    static readonly type = '[DP] Init';
    constructor(public payload: any){}
}

export class Login {
    static readonly type = "[DP] Login";
    constructor(public payload: {user:any, observer?:Observer<any>, authType?: string}) {};
}

export class Logout {
    static readonly type = "[DP] Logout";
}

export class ClientCommand {
    static readonly type = "[DP] ClientCommand";
    constructor(public command: any){}
}

export class ClientQuery {
    static readonly type = "[DP] ClientQuery";
    constructor(public query: any){}
}

export class MakeProfobufCall {
    static readonly type = "[DP] MakeProtobufCall";
    constructor(public request: Request, public stateContext?: any){}
}

export class MakeDPCall {
    static readonly type = "[DP] MakeDPCall";
    constructor(public reqMsg: any, public reqId?: string, 
        public observer?: Subscriber<any>, public completeOnSuccess?: boolean){}
}

export class CallUacp {
    static readonly type ="[DP] CallUacp";
    constructor (public message: any, public reqId?: string, public observer?: Subscriber<any>) {}
}