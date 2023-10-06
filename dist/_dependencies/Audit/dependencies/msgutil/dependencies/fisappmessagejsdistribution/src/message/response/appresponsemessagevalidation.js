"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRespondToMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessagevalidation_1 = require("../common/appmessagevalidation");
/**
 * App response message validations.
 *
 */
/**
 * Validate respond to request message.
 *
 * @method validateRespondToMessage
 * @param message {RequestMessage} - Request message.
 * @param permissibleMessageType {object} - Permissible message types.
 * @return {boolean} - True = success, false = error.
 */
function validateRespondToMessage(message, permissibleMessageType, respondToMessageType) {
    try {
        appmessagevalidation_1.validateMessage(message);
        appmessagevalidation_1.validateMessageHeader(message.header, permissibleMessageType);
        let reponseTo = (Array.isArray(respondToMessageType) ?
            respondToMessageType : Object.values(respondToMessageType || appresponsemessagetype_1.RespondToMessageType));
        if (!reponseTo.includes(message.header.messageType)) {
            throw "Invalid message type '" + message.header.messageType + "'." +
                "\nMessage type must be " +
                (reponseTo.length > 1 ?
                    "either " + reponseTo.toString().replace(/\s*([^,]+)$/, ' or $1') :
                    reponseTo[0]);
        }
    }
    catch (e) {
        throw "Respond To Request Message: " + e;
    }
    return true;
}
exports.validateRespondToMessage = validateRespondToMessage;
//# sourceMappingURL=appresponsemessagevalidation.js.map