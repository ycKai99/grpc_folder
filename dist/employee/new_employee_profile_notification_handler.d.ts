import { handler_interface } from "src/_interface/handler_interface";
import { DomainProxyController } from "../_dependencies/DP/src/services/DP.controller";
import { HandlersManager } from "src/handlers_manager";
import { add_employee_profile_notification_class } from "./add_employee_profile_notification_handler";
export declare class new_employee_profile_notification_class extends add_employee_profile_notification_class implements handler_interface {
    trackingPerson: string[];
    initialise(UserAppId: string, remoteDP: DomainProxyController, notificationManager: HandlersManager): Promise<string>;
    perform_handler(handler_id: number): Promise<number>;
}
