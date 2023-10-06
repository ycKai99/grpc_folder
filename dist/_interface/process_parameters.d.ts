import { Command, FisCreateMessageUtility, NotificationMessage, Query, RequestMessage, ResponseMessage } from "../_dependencies/DP/src/interface/export";
import { DatabaseNotificationMessage } from "../_message/fis.DEE.interface";
export declare type process_status_type = "New" | "Converted" | "Done";
export interface HandlerParametersInterface {
    notification: DatabaseNotificationMessage;
    task_ID: string;
    service_Id: string;
    handler_type_name: string;
    steps: step_parameters_interface[];
    removed_steps: step_parameters_interface[];
    process_status: process_status_type | string;
    task_date: Date;
    tag: string;
}
export interface step_parameters_interface {
    processname: Command | Query;
    payload: any & {
        UCP_Id?: string;
    };
    request: RequestMessage[];
    response: null | ResponseMessage[];
}
export declare function generate_handler(notification: NotificationMessage, handler_type_name: string, tag: string): HandlerParametersInterface;
export declare function generate_parameters(messagehelper: FisCreateMessageUtility, processname: Command | Query, payload: any): step_parameters_interface;
export declare class new_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: any;
    request: any[];
    response: any[];
}
export declare class retrieve_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
export declare class insertrow_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
export declare class appendrow_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
export declare class save_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
export declare class post_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
export declare class distribute_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
export declare class cancelchanges_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
export declare class setcolumns_process_argument_class implements step_parameters_interface {
    processname: Command;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
export declare class rowcount_process_argument_class implements step_parameters_interface {
    processname: Query;
    payload: {
        id: string;
    };
    request: any[];
    response: any[];
}
