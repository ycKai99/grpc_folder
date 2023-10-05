"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = exports.handleMessage = void 0;
const uuid_1 = require("uuid");
function handleMessage(message, err, res, uuid) {
    let localUUID = (0, uuid_1.v4)();
    if (uuid)
        localUUID = uuid;
    console.log('MESSAGE : ', message);
    if (res)
        console.log('RESPONSE IS : ', res);
}
exports.handleMessage = handleMessage;
function handleResponse(payload) {
    if (payload.status === -1) {
        if (payload.message.isAxiosError) {
            if (payload.message.response) {
                payload.message = {
                    code: payload.message.response.data.statusCode,
                    message: payload.message.response.data.message,
                    error: payload.message.response.data.error
                };
            }
            else if (payload.message.request) {
                payload.message = payload.message.request;
            }
            else {
                payload.message = payload.message;
            }
        }
    }
    if (payload.status === 1) {
    }
    if (payload.status === 0) {
    }
    return payload;
}
exports.handleResponse = handleResponse;
//# sourceMappingURL=handlestatusmessage.js.map