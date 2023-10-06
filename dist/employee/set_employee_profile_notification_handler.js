"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_employee_profile_notification_class = void 0;
const common_employee_profile_notification_handler_1 = require("./common_employee_profile_notification_handler");
class set_employee_profile_notification_class extends common_employee_profile_notification_handler_1.common_employee_profile_notification_class {
    async perform_handler(handler_id) {
        let status = -1;
        this.set_handler_id(handler_id);
        this.LogMessage("Logined for Task ID '" + this.get_taskID(handler_id) + "'.");
        // Prevent locking
        let promise_handling = this.data_transfer_cancelchanges()
            .then((operation) => {
            // retrieve from source database
            return this.data_transfer_retrieve();
        })
            .then((operation) => {
            // Target database login
            return this.perform_send_login_messages();
        })
            .then((operation) => {
            // retrieve from target database
            return this.data_transfer_retrieve();
        })
            .then((operation) => {
            // Done
            this.set_process_status(handler_id, "Done");
            this.updateMessagesLocalStorage();
        })
            .then((operation) => {
            // Complete
            this.LogMessage("Performed set employee handler Task ID '" + this.get_taskID(handler_id) + "'.");
            return handler_id;
        });
        return promise_handling;
    }
}
exports.set_employee_profile_notification_class = set_employee_profile_notification_class;
//# sourceMappingURL=set_employee_profile_notification_handler.js.map