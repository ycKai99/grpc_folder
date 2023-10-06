import { CallHandler, ConsoleLogger, ExecutionContext, LoggerService, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggingServiceInterface, LogSetting, LogType } from '../interface/Logging.interface';
import { BaseMessage, Uuid } from '../dependencies/FISAppMessageJSUtility/interface/export';
export declare class LoggingService extends ConsoleLogger implements LoggerService, NestInterceptor, LoggingServiceInterface {
    protected isLogAllMessages: boolean;
    protected uuidgenerator: Uuid;
    protected buffer: LogType[];
    protected defaultDataTags: string[];
    protected settings: LogSetting;
    constructor(context: string);
    /**
     * Set if want to log all messages
     *
     * @param {boolean} logAll set to true to log all messages. Default is true.
     */
    setLogAll(logAll: boolean): void;
    /**
     * Set to change default process tag
     *
     * @param {string[]} tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    overrideDefaultTags(tags: string[]): void;
    /**
     * Append to default process tag
     *
     * @param {string[]} tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    appendDefaultTags(tags: string[]): void;
    /**
     * Intercept execution contect to add to log
     *
     * @param {ExecutionContext} context Execution context.
     * @param {CallHandler} next Next function called.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    /**
     * Subscribe and add to Log
     *
     * @param {Observable<any>} newObservable to subscribe and add to log
     */
    subscribeToLog(newObservable: Observable<any>, dataTags?: string[]): void;
    /**
     * Add a message to log at key.
     *
     * @param {string|BaseMessage} message Message format compliants to FisApp
     * @param {string[]} dataTags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    addToLog(message: string | BaseMessage, dataTags?: string[]): string;
    /**
     * Check if  a key existed
     *
     * @param {string} key Key that you want to check
     */
    checkExisted(key: string): boolean;
    /**
     * Find all log records
     *
     */
    getLogs(): LogType[];
    /**
     * Setup.
     *
     * @param {LogSetting} settings Settings for storage and buffer.
     */
    init(settings: LogSetting): void;
    /**
     * Find log records with id, date or tag
     *
     * @param {{id:string}|{date:string}|{tag:string}} search Set search.id to find id/key. Set search.date to find a specific date. Set search.tag to find a specific tag.
     */
    findLogs(search: {
        id: string;
    } | {
        date: string;
    } | {
        tag: string;
    }): LogType[];
    /**
     * Write a 'log' level log.
     * @param {string|BaseMessage} message Message format compliants to FisApp
     * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    log(message: string | BaseMessage, ...optionalParams: any[]): void;
    /**
     * Write an 'error' level log.
     * @param {string|BaseMessage} message Message format compliants to FisApp
     * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    error(message: any, ...optionalParams: any[]): void;
    /**
     * Write a 'warn' level log.
     * @param {string|BaseMessage} message Message format compliants to FisApp
     * @param {string[]} optionalParams.tags Tags that you want to use for example ["tag123","tagXYZ"].
     */
    warn(message: any, ...optionalParams: any[]): void;
}
