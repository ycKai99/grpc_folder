/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { RequestMessage } from './appresponsemessagetype';
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
export declare function validateRespondToMessage(message: RequestMessage, permissibleMessageType?: object, respondToMessageType?: object): boolean;
