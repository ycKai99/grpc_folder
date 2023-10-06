import { Observable } from "rxjs";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
export interface AppProfile {
    appId: string;
    appName: string;
}
export interface AppLocation {
    appId: string;
    appLocId: string;
    appLocName: string;
}
export interface LogLocation {
    logLocId: string;
    logLocName: string;
}
export interface AppLogLoc {
    appLogLocId: string;
    appLocId: string;
    logLocId: string;
}
export interface MessageLog {
    _id?: string;
    appLogLocId: string;
    appData: {
        msgId: number | string;
        msgLogDateTime: Date | any;
        msgDateTime: Date | any;
        msgTag: string | string[];
        msgPayload: string | BaseMessage;
    };
}
export interface LogSetting {
    storage: string;
    cacheMessageLimit?: number;
    setting?: {
        appId?: string;
        appName: string;
        logLocName: string;
        logLocId?: string;
        appLogLocId?: string;
        appLocName: string;
        appLogId?: string;
    };
    customSetting?: {
        srv?: boolean;
        user?: string;
        password?: string;
        server?: string;
        database?: string;
        url?: string;
    };
}
export interface LoggingServiceInterface {
    init(settings: LogSetting): void;
    subscribe(MessageLog: Observable<MessageLog | BaseMessage>, AppLocation?: AppLocation, LogLocation?: LogLocation, AppLogLoc?: AppLogLoc, AppProfile?: AppProfile): Promise<string | number>;
    filter(search: {
        msgId: string;
    } | {
        msgDateTime: MsgDateTime;
    } | {
        msgTag: string;
    } | {
        msgPayload: string;
    }): Promise<MessageLog[]>;
    convertCDMStoMessageLog(args: any, tag?: string | string[]): Promise<MessageLog>;
    convertMessageLogtoCDMS(args: MessageLog): Promise<any>;
}
export interface MsgDateTime {
    from: DateStructure;
    to: DateStructure;
}
interface DateStructure {
    date: Date | string;
    hour?: string | number;
    minute?: string | number;
    second?: string | number;
}
export {};
