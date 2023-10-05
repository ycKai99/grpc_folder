import { CallHandler, ConsoleLogger, ExecutionContext, LoggerService, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggingServiceInterface, LogSetting, LogType } from '../../_interfaces/Logging.interface';
import { BaseMessage, Uuid } from '../../_dependencies/FISAppMessageJSUtility/interface/export';
export declare class LoggingService extends ConsoleLogger implements LoggerService, NestInterceptor, LoggingServiceInterface {
    protected isLogAllMessages: boolean;
    protected uuidgenerator: Uuid;
    protected buffer: LogType[];
    protected defaultDataTags: string[];
    protected settings: LogSetting;
    constructor(context: string);
    setLogAll(logAll: boolean): void;
    overrideDefaultTags(tags: string[]): void;
    appendDefaultTags(tags: string[]): void;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    subscribeToLog(newObservable: Observable<any>, dataTags?: string[]): void;
    addToLog(message: string | BaseMessage, dataTags?: string[]): string;
    checkExisted(key: string): boolean;
    getLogs(): LogType[];
    init(settings: LogSetting): void;
    findLogs(search: {
        id: string;
    } | {
        date: string;
    } | {
        tag: string;
    }): LogType[];
    log(message: string | BaseMessage, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
}
