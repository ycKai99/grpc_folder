/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, RequestMessage, ResponseStatus, ExceptionType } from '../../types/appmessagetype';
/**
 * Response message parameter.
 * Consists of:
 *  Base message parameter.
 *  Respond to message(RequestMessage type).
 *
 * @interface ResponseMessageParameter
 */
export interface ResponseMessageParameter extends MessageParameter {
    /**
     * Respond to message(RequestMessage type).
     *
     * @interface ResponseMessageParameter
     * @property requestMessageRespondTo
     * @type {RequestMessage}
     */
    requestMessageRespondTo: RequestMessage;
}
/**
 * Response status message parameter.
 * Consists of:
 *  Response message parameter.
 *  Response on status of request performance(ResponseStatus).
 *
 * @interface ResponseStatusMessageParameter
 */
export interface ResponseStatusMessageParameter extends ResponseMessageParameter {
    /**
     * Response on status of request performance(ResponseStatus).
     *
     * @interface ResponseStatusMessageParameter
     * @property responseStatus
     * @type {ResponseStatus}
     */
    responseStatus: ResponseStatus;
}
/**
 * Response exception message parameter.
 * Consists of:
 *  Response message parameter.
 *  Response exception types(ResponseException).
 *
 * @interface ResponseExceptionMessageParameter
 */
export interface ResponseExceptionMessageParameter extends ResponseStatusMessageParameter {
    /**
     * Response exception types(ResponseException).
     *
     * @interface ResponseExceptionMessageParameter
     * @property responseException
     * @type {ResponseException}
     */
    responseException: ExceptionType;
}
/**
 * Response on summary of request performance(ResponseStatus).
 *
 * @interface ResponseSummaryMessageParameter
 */
export interface ResponseSummaryMessageParameter extends ResponseMessageParameter {
}
