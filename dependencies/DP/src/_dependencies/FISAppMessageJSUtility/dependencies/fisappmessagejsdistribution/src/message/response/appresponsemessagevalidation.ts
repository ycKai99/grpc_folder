/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { RequestMessage, RespondToMessageType } from './appresponsemessagetype';
import { validateMessage, validateMessageHeader } from '../common/appmessagevalidation';

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
export function validateRespondToMessage(message: RequestMessage,
    permissibleMessageType?: object, respondToMessageType?: object): boolean {
    try {
        validateMessage(message);
        validateMessageHeader(message.header, permissibleMessageType);

        let reponseTo: string[] =
            (Array.isArray(respondToMessageType) ?
                respondToMessageType : Object.values(respondToMessageType || RespondToMessageType));
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
