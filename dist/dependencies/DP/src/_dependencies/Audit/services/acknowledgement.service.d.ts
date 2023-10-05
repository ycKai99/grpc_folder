import { Observable } from "rxjs";
import { Acknowledgemeent, AcknowledgementLogSetting } from "../type/acknowledgement.interface";
import { BaseMessage, ResponseMessage } from "../dependencies/msgutil/interface/export";
import { LoggingService } from "../dependencies/log/interface/export";
export declare class AcknowledgementService implements Acknowledgemeent {
    private logService?;
    private messageUtil;
    private settings;
    constructor(logService?: LoggingService);
    init(settings: AcknowledgementLogSetting): Promise<void>;
    subscribe(obs: Observable<BaseMessage>): Observable<ResponseMessage>;
}
