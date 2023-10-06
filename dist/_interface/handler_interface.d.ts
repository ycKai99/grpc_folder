import { ResponseMessage } from "../_dependencies/DP/src/interface/export";
export interface handler_interface {
    handlers: any;
    send_message(handler_id: number, steps_id: number): Promise<ResponseMessage>;
    perform_handler(handler_id: number): Promise<number>;
}
