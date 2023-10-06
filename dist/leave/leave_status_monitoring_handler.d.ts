import { AxiosRequestConfig } from "axios";
import { Subject } from "rxjs";
import { base_notification_handler_class, handler_interface } from "../base/base_notification_handler";
import { ResponseMessage } from "../_dependencies/DP/src/interface/export";
export declare class leave_status_monitoring_class extends base_notification_handler_class implements handler_interface {
    app: string;
    UCP_ID: string;
    n8n_url: string;
    previous_UCP_Id: string;
    handler_id: number;
    leavestatus_alldata: any;
    constructor();
    load_existing_leavestatus(): Promise<void>;
    updateMessagesLocalStorage(): void;
    send_message(handler_id: number | string, steps_id: number): Promise<ResponseMessage>;
    http_config: AxiosRequestConfig;
    publishForReceiveLeaveNotification(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForRetrieveLeaveDetails(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingCompleted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingError(inputObservable: Subject<any>): Subject<unknown>;
}
