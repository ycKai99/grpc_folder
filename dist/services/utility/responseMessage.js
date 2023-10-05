"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = exports.successMessage = void 0;
function successMessage(message, data) {
    let payload = {
        status: 1,
        message: message,
        data: data
    };
    return payload;
}
exports.successMessage = successMessage;
function errorMessage(message) {
    let payload = {
        status: -1,
        message: message
    };
    return payload;
}
exports.errorMessage = errorMessage;
//# sourceMappingURL=responseMessage.js.map