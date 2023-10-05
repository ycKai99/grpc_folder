"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DpResponse = exports.DpRequest = void 0;
const messages_pb_1 = require("./messages_pb");
class DpRequest extends messages_pb_1.Request {
    constructor(requestId) {
        super();
        this.setId(requestId ? requestId : '');
    }
    getId() {
        return super.getId() ? super.getId() : '';
    }
    setDpMessage(messageObj) {
        super.setMessage(messageObj);
    }
}
exports.DpRequest = DpRequest;
class DpResponse extends messages_pb_1.Response {
}
exports.DpResponse = DpResponse;
//# sourceMappingURL=request.response.js.map