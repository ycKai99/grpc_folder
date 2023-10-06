import { Observable } from "rxjs";
import { LogSetting } from "../dependencies/log/type/datatype";
import { BaseMessage } from "../dependencies/log/dependencies/msgutil/interface/export";
declare type IncomingMessageSetting = LogSetting & {
    incomingObservable: Observable<BaseMessage>;
};
export interface IncomingMessageServiceInterface {
    init(settings: IncomingMessageSetting): void;
}
export interface MessageSynchronisationServiceSetting {
    incomingSource: LogSettingwTags;
    target: LogSettingwTags;
    filters?: any;
}
declare type LogSettingwTags = LogSetting & Tags & Filters;
interface Tags {
    tags: string[];
}
interface Filters {
    filters?: string[];
}
export interface MessageAuditorServiceInterface {
    init(settings: MessageSynchronisationServiceSetting): void;
    subscribe(obs: Observable<ErrorTrigger>): Observable<any>;
}
export interface ErrorTrigger {
    status: 0 | 1;
    message: any | string;
}
export {};
