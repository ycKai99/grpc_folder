import { ExceptionData } from '../exception/ExceptionData';
export declare type StatusResponse = {
    status: string;
    message?: string;
};
export declare type StatusException = StatusResponse & ExceptionData;
