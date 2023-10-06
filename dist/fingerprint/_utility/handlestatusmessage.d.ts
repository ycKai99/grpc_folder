import { handleResponseInterface } from '../../_interface/fingerprintdata.interface';
import { RESPONSE_MESSAGE } from '../../_interface/fingerprint.constsetting';
/**
   * @param message choose from enum RESPONSE_MESSAGE
   * @param err optional, error message
   * @param res optional, response message
   */
export declare function handleMessage(message: RESPONSE_MESSAGE, err?: any, res?: any, uuid?: any): any;
export declare function successResponse(message: string, body?: any): handleResponseInterface;
export declare function failResponse(message: string): handleResponseInterface;
export declare function handleResponse(payload: handleResponseInterface): handleResponseInterface;
