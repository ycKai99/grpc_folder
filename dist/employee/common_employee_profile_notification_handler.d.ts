import { base_notification_handler_class, handler_interface, process_status_type } from "../base/base_notification_handler";
import { staff_profile_type } from "../_model/staff_profile";
import { ResponseMessage } from "../_dependencies/DP/src/interface/export";
declare type common_data_transfer_process_status_type = "Retrieved" | "AppendRow" | "SetColumns" | "Saved";
declare type data_transfer_process_status_type = process_status_type | common_data_transfer_process_status_type;
export declare class common_employee_profile_notification_class extends base_notification_handler_class implements handler_interface {
    employee_profile_service_id: string;
    employee_profile_ds_service_id: string;
    payload: any;
    handler_id: number;
    source_database: string;
    source_pers_id: string;
    source_pers_name: string;
    source_emp_id: number;
    source_emp_number: string;
    source_staff_info: staff_profile_type;
    source_raw: any;
    source_UCP_id: string;
    source_role_id: number;
    target_database: string;
    target_pers_id: number;
    target_staff_info: staff_profile_type;
    target_UCP_id: string;
    protected process_status: data_transfer_process_status_type;
    set_handler_id(handler_id: number): void;
    get_handler_id(): number;
    data_transfer_retrieve(): Promise<ResponseMessage>;
    data_transfer_new(payload?: Record<string, any>): Promise<ResponseMessage>;
    data_transfer_sync_row(payload?: Record<string, any>): Promise<void>;
    data_transfer_setColumns(payload?: Record<string, any>): Promise<void>;
    data_transfer_save(payload?: Record<string, any>): Promise<void>;
    data_transfer_cancelchanges(payload?: Record<string, any>): Promise<void>;
    set_process_status(handler_ind: any, process_status: data_transfer_process_status_type): import("../_interface/process_parameters").HandlerParametersInterface;
    send_message(handler_id: number, steps_id: number): Promise<ResponseMessage>;
}
export {};
