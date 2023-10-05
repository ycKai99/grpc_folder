import { Observable } from "rxjs";
import { BaseMessage, ResponseMessage } from "../dependencies/msgutil/interface/export";
import { LogSetting } from "../dependencies/log/type/datatype";

/**
 * @deprecated The acknowledgement will be covered by MessageAuditorService.
 */
export interface Acknowledgemeent {
    init(settings: LogSetting): void;

    subscribe(obs: Observable<BaseMessage>): Observable<ResponseMessage>
}

export type AcknowledgementLogSetting = {
    storage: string;
    setting?: {
        appId?: string,
        appName: string
    }

    customSetting?: {
        srv?: boolean,
        user?: string,
        password?: string,
        server?: string,
        collection?: string
        url?: string // Full link if possible. Doesnt matter cloud or remote server
    }
}