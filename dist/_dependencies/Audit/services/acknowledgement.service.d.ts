import { Observable } from "rxjs";
import { Acknowledgemeent, AcknowledgementLogSetting } from "../type/acknowledgement.interface";
import { LoggingService } from "../dependencies/log/interface/export";
import { BaseMessage, ResponseMessage } from "../dependencies/log/dependencies/msgutil/interface/export";
/**
 * @deprecated The acknowledgement will be covered by MessageAuditorService.
 */
export declare class AcknowledgementService implements Acknowledgemeent {
    private logService?;
    private messageUtil;
    private settings;
    constructor(logService?: LoggingService);
    init(settings: AcknowledgementLogSetting): Promise<void>;
    subscribe(obs: Observable<BaseMessage>): Observable<ResponseMessage>;
}
