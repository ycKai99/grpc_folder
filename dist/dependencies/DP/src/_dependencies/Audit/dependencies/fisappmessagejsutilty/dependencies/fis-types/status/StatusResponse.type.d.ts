import { ExceptionData } from '../exception/ExceptionData';
export type StatusResponse = {
    status: string;
    message?: string;
};
export type StatusException = StatusResponse & ExceptionData;
