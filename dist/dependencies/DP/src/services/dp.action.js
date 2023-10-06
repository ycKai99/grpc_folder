"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallUacp = exports.MakeDPCall = exports.MakeProfobufCall = exports.ClientQuery = exports.ClientCommand = exports.Logout = exports.Login = exports.Init = void 0;
class Init {
    constructor(payload) {
        this.payload = payload;
    }
}
exports.Init = Init;
Init.type = '[DP] Init';
class Login {
    constructor(payload) {
        this.payload = payload;
    }
    ;
}
exports.Login = Login;
Login.type = "[DP] Login";
class Logout {
}
exports.Logout = Logout;
Logout.type = "[DP] Logout";
class ClientCommand {
    constructor(command) {
        this.command = command;
    }
}
exports.ClientCommand = ClientCommand;
ClientCommand.type = "[DP] ClientCommand";
class ClientQuery {
    constructor(query) {
        this.query = query;
    }
}
exports.ClientQuery = ClientQuery;
ClientQuery.type = "[DP] ClientQuery";
class MakeProfobufCall {
    constructor(request, stateContext) {
        this.request = request;
        this.stateContext = stateContext;
    }
}
exports.MakeProfobufCall = MakeProfobufCall;
MakeProfobufCall.type = "[DP] MakeProtobufCall";
class MakeDPCall {
    constructor(reqMsg, reqId, observer, completeOnSuccess) {
        this.reqMsg = reqMsg;
        this.reqId = reqId;
        this.observer = observer;
        this.completeOnSuccess = completeOnSuccess;
    }
}
exports.MakeDPCall = MakeDPCall;
MakeDPCall.type = "[DP] MakeDPCall";
class CallUacp {
    constructor(message, reqId, observer) {
        this.message = message;
        this.reqId = reqId;
        this.observer = observer;
    }
}
exports.CallUacp = CallUacp;
CallUacp.type = "[DP] CallUacp";
//# sourceMappingURL=dp.action.js.map