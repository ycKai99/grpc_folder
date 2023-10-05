import { MessageParameter, RequestMessage, ResponseStatus, ExceptionType } from '../../types/appmessagetype';
export interface ResponseMessageParameter extends MessageParameter {
    requestMessageRespondTo: RequestMessage;
}
export interface ResponseStatusMessageParameter extends ResponseMessageParameter {
    responseStatus: ResponseStatus;
}
export interface ResponseExceptionMessageParameter extends ResponseStatusMessageParameter {
    responseException: ExceptionType;
}
export interface ResponseSummaryMessageParameter extends ResponseMessageParameter {
}
