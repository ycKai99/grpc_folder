import { RESPONSE_MESSAGE } from '../../interfaces/constsetting';
import { handleResponseInterface } from '../../interfaces/message.interface';
export declare function handleMessage(message: RESPONSE_MESSAGE, err?: any, res?: any, uuid?: any): void;
export declare function handleResponse(payload: handleResponseInterface): handleResponseInterface;
