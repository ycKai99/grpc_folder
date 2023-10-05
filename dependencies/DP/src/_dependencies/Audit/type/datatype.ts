import { Observable } from "rxjs";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
import { LogSetting } from "../dependencies/log/type/datatype";

type IncomingMessageSetting = LogSetting & {
    incomingObservable: Observable<BaseMessage>
}

// Incoming message Service Class
export interface IncomingMessageServiceInterface {
    // Set default setting
    init(settings: IncomingMessageSetting): void;
}

//  It can have an incoming and a target logging server. The tags are used to search for specific sets of messages from the logging server. 

export interface MessageSynchronisationServiceSetting {
    incomingSource: LogSettingwTags,
    target: LogSettingwTags
}

// Renew Structure To fix undefined issue at test3a.ts init()
type LogSettingwTags = LogSetting & Tags & Filters
interface Tags {
    tags: string[]
}
interface Filters {
    filters?: string[]
}
// Acknowledgement Service Class
export interface MessageAuditorServiceInterface {
    // Set default setting
    init(settings: MessageSynchronisationServiceSetting, filters?: any): void;
    // Subscribe to trigger
    subscribe(obs: Observable<ErrorTrigger>): Observable<any>;
}

export interface ErrorTrigger {
    status: 0 | 1,
    message: any | string
}