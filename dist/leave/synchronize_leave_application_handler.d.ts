import { base_notification_handler_class, handler_interface } from "../base/base_notification_handler";
import { Subject } from 'rxjs';
import { processingObservableInterface } from "../handlers_manager";
import { AxiosRequestConfig } from "axios";
import { ResponseMessage } from "../_dependencies/DP/src/interface/export";
export declare class synchronize_leave_application_class extends base_notification_handler_class implements handler_interface {
    app: string;
    UCP_Id: string;
    n8n_url: string;
    previous_UCP_Id: string;
    private requestIDs;
    private requestMessages;
    constructor();
    send_message(handler_id: number, steps_id: number): Promise<ResponseMessage>;
    http_config: AxiosRequestConfig;
    handler_id: number;
    publishForLoginSynchronizationLeave(inputObservable: Subject<any>): Subject<unknown>;
    publishForSynchronizationLeaveRequested(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForSynchronizationNextLeaveStarted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForSynchronizationNextLeaveEnded(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForSynchronizationLeaveComplete(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingCompleted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingError(inputObservable: Subject<any>): Subject<unknown>;
    addToAwaitingMessageIDs(ID: string, message: any): void;
    isAwaitingMessageIDs(ID: string): boolean;
    readAwaitingMessages(ID: string): any;
    isTaskCompleted(process: processingObservableInterface): boolean;
}
export interface MissingFisEventsInterface {
    "MissingFisEvents": MissingFisEventInterface[];
}
export interface MissingFisEventInterface {
    json: {
        operation?: string;
        rowId: number;
        rowNumber: number;
        column: leaveColumns;
    };
}
export interface leaveColumns {
    ps_doc_id: number;
    ps_doc_leave_emp_role_id: number;
    emp_lv_mas_open: string;
    ps_doc_leave_ps_leave_mas_id: number;
    emp_lv_mas_year: number;
    ps_emp_leave_master_ps_leave_id: number;
    ps_doc_header_ps_doc_ref_no: string;
    ps_leave_profile_ps_leave_desc: string;
    ps_doc_header_ps_doc_status: string;
    ps_doc_leave_ps_dt_applied: Date;
    ps_doc_leave_ps_dt_from: Date;
    ps_doc_leave_ps_dt_to: Date;
    ps_doc_leave_ps_days: number;
}
export declare type runtimeSynchronizeEventsInterface = {
    eventsToProcess: eventToProcess[];
    processRowId: number;
};
export interface eventToProcess {
    "ID": string;
    "Code": string;
    "Operation": "New" | "Post" | "Cancel" | string;
}
