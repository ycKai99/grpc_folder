import { Observable } from "rxjs";
import { ErrorTrigger, MessageAuditorServiceInterface, MessageSynchronisationServiceSetting } from "../type/datatype";
import { MessageLog } from "../dependencies/log/type/datatype";
export declare class MessageAuditorService implements MessageAuditorServiceInterface {
    private settings;
    private sourceSrc;
    private targetSrc;
    private missingMessageSubject;
    private filter;
    init(settings: MessageSynchronisationServiceSetting, filters?: any): void;
    subscribe(obsTrigger: Observable<ErrorTrigger>): Observable<MessageLog>;
    private filterData;
    private synchronize;
    private acquireData;
    private checkArrayDifferences;
}
