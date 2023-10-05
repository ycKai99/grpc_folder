import { Observable } from "rxjs";
import { BaseMessage, ResponseMessage } from "../dependencies/msgutil/interface/export";
import { LogSetting } from "../dependencies/log/type/datatype";
export interface Acknowledgemeent {
    init(settings: LogSetting): void;
    subscribe(obs: Observable<BaseMessage>): Observable<ResponseMessage>;
}
export type AcknowledgementLogSetting = {
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
