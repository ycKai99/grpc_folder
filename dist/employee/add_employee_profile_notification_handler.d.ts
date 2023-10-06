import { handler_interface } from "../base/base_notification_handler";
import { common_employee_profile_notification_class } from "./common_employee_profile_notification_handler";
export declare class add_employee_profile_notification_class extends common_employee_profile_notification_class implements handler_interface {
    perform_handler(handler_id: number): Promise<number>;
}
