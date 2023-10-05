import { ErrorTrigger, MessageSynchronisationServiceSetting } from "src/dependencies/DP/src/_dependencies/Audit/type/datatype";
import { MessageLog } from "src/dependencies/DP/src/_dependencies/Audit/dependencies/log/type/datatype";
import { Observable } from "rxjs";
export declare class SynchronisationService {
    private messageAuditorService;
    private SyncTrigger;
    private returnMissingMessages;
    synchronize(args: ErrorTrigger | any): Observable<MessageLog>;
    initSync(configurations: MessageSynchronisationServiceSetting): Promise<string>;
}
