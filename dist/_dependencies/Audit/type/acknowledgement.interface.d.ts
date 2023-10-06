import { Observable } from "rxjs";
import { LogSetting } from "../dependencies/log/type/datatype";
import { BaseMessage, ResponseMessage } from "../dependencies/log/dependencies/msgutil/interface/export";
/**
 * @deprecated The acknowledgement will be covered by MessageAuditorService.
 */
export interface Acknowledgemeent {
    init(settings: LogSetting): void;
    subscribe(obs: Observable<BaseMessage>): Observable<ResponseMessage>;
}
export declare type AcknowledgementLogSetting = {
    storage: string;
    setting?: {
        appId?: string;
        appName: string;
    };
    customSetting?: {
        srv?: boolean;
        user?: string;
        password?: string;
        server?: string;
        collection?: string;
        url?: string;
    };
};
