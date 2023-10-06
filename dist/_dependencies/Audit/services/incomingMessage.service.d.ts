import { Observable } from "rxjs";
import { IncomingMessageServiceInterface } from "../type/datatype";
import { LogSetting } from "../dependencies/log/type/datatype";
import { BaseMessage } from "../dependencies/log/dependencies/msgutil/interface/export";
import { LoggingService } from "../dependencies/log/interface/export";
/**
 * @deprecated The logging is now supported by the Fis-Logging library.
 */
export declare class IncomingMessageService implements IncomingMessageServiceInterface {
    private logService?;
    constructor(logService?: LoggingService);
    private settings;
    init(settings: LogSetting & {
        incomingObservable: Observable<BaseMessage>;
    }): void;
}
