import { Request, Response } from './messages_pb';
export declare class DpRequest extends Request {
    constructor(requestId?: string);
    getId(): string;
    setDpMessage(messageObj: string): void;
}
export declare class DpResponse extends Response {
}
