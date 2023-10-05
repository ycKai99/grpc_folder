import { Observable } from "rxjs";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
import { LogSetting } from "../dependencies/log/type/datatype";
type IncomingMessageSetting = LogSetting & {
    incomingObservable: Observable<BaseMessage>;
};
export interface IncomingMessageServiceInterface {
    init(settings: IncomingMessageSetting): void;
}
export interface MessageSynchronisationServiceSetting {
    incomingSource: LogSettingwTags;
    target: LogSettingwTags;
}
type LogSettingwTags = LogSetting & Tags & Filters;
interface Tags {
    tags: string[];
}
interface Filters {
    filters?: string[];
}
export interface MessageAuditorServiceInterface {
    init(settings: MessageSynchronisationServiceSetting, filters?: any): void;
    subscribe(obs: Observable<ErrorTrigger>): Observable<any>;
}
export interface ErrorTrigger {
    status: 0 | 1;
    message: any | string;
}
export {};
