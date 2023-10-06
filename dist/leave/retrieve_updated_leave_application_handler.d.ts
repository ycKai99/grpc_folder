import { base_notification_handler_class, handler_interface } from "../base/base_notification_handler";
import { Observable, Subject } from 'rxjs';
import { AxiosRequestConfig } from "axios";
import { ResponseMessage } from "../_dependencies/DP/src/interface/export";
export declare class retrieve_updated_leave_application_class extends base_notification_handler_class implements handler_interface {
    app: string;
    UCP_Id: string;
    n8n_url: string;
    previous_UCP_Id: string;
    constructor();
    send_message(handler_id: number | string, steps_id: number): Promise<ResponseMessage>;
    http_config: AxiosRequestConfig;
    handler_id: number;
    publishForReceiveLeaveRetrievalRequest(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForRetrieveLeave(inputObservable: Observable<any>): Subject<unknown>;
    subscribeForProcessingCompleted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingError(inputObservable: Subject<any>): Subject<unknown>;
}
