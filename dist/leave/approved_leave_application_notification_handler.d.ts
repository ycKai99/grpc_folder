import { base_notification_handler_class, handler_interface } from "../base/base_notification_handler";
import { Observable, Subject } from 'rxjs';
import { ResponseMessage } from "../_dependencies/DP/src/interface/export";
import { AxiosRequestConfig } from "axios";
export declare class approved_leave_application_notification_class extends base_notification_handler_class implements handler_interface {
    app: string;
    UCP_Id: string;
    n8n_url: string;
    previous_UCP_Id: string;
    constructor();
    send_message(handler_id: number | string, steps_id: number): Promise<ResponseMessage>;
    http_config: AxiosRequestConfig;
    handler_id: number;
    publishForReceiveLeaveNotification(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForCheckLeaveApprobation(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForRetrieveLeave(inputObservable: Observable<any>): Subject<unknown>;
    subscribeForUpdateCalenderLeave(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForCheckCalenderLeave(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingCompleted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingError(inputObservable: Subject<any>): Subject<unknown>;
}
