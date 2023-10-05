import { Observable } from "rxjs";
import { IncomingMessageServiceInterface } from "../type/datatype";
import { LoggingService } from "../dependencies/log/interface/export";
import { LogSetting } from "../dependencies/log/type/datatype";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
export declare class IncomingMessageService implements IncomingMessageServiceInterface {
    private logService?;
    constructor(logService?: LoggingService);
    private settings;
    init(settings: LogSetting & {
        incomingObservable: Observable<BaseMessage>;
    }): void;
}
