"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = exports.failResponse = exports.successResponse = exports.handleMessage = void 0;
const uuid_1 = require("uuid");
/**
   * @param message choose from enum RESPONSE_MESSAGE
   * @param err optional, error message
   * @param res optional, response message
   */
function handleMessage(message, err, res, uuid) {
    let localUUID = uuid_1.v4(); // create uuid v4
    // console.log('MESSAGE : ',message);
    if (uuid) {
        localUUID = uuid;
    }
    if (err) {
        console.error('ERROR IS : ', err);
        return err;
    }
    if (res) {
        console.log('RESPONSE IS : ', res);
    }
    // let responseMessage: responseMessageInterface = handleResponseMessage(message, localUUID);
}
exports.handleMessage = handleMessage;
function successResponse(message, body) {
    let payload = {
        status: 1 /* SUCCESS */,
        message: message,
        body: body !== null && body !== void 0 ? body : ""
    };
    return payload;
}
exports.successResponse = successResponse;
function failResponse(message) {
    let payload = {
        status: -1 /* ERROR */,
        message: message
    };
    return payload;
}
exports.failResponse = failResponse;
function handleResponse(payload) {
    if (payload.status === -1 /* ERROR */) {
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
    if (payload.status === 1 /* SUCCESS */) {
    }
    if (payload.status === 0 /* NOTHING */) {
    }
    return payload;
}
exports.handleResponse = handleResponse;
//# sourceMappingURL=handlestatusmessage.js.map