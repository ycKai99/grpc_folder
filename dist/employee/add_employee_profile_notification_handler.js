"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_employee_profile_notification_class = void 0;
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const common_employee_profile_notification_handler_1 = require("./common_employee_profile_notification_handler");
class add_employee_profile_notification_class extends common_employee_profile_notification_handler_1.common_employee_profile_notification_class {
    async perform_handler(handler_id) {
        let status = 1;
        this.set_handler_id(handler_id);
        this.LogMessage("Logined for Task ID '" + this.get_taskID(handler_id) + "'.");
        // Current database is Target database
        // Store target UCP_ID
        this.target_UCP_id = this.UCP_Id;
        this.source_database = DP_config_1.URLs.NESTWS_DEFAULT_SERVER; // Might be need interpret from message
        this.target_database = DP_config_1.URLs.TargetDatabase;
        let sourceServiceProvider = this.getLocalServiceProvidersList().find((provider) => {
            return provider.databaseSourceName == this.source_database;
        });
        let targetServiceProvider = this.getLocalServiceProvidersList().find((provider) => {
            return provider.databaseSourceName == this.target_database;
        });
        // Setup target
        let payload = {
            setSource: sourceServiceProvider.instanceId,
            setTarget: targetServiceProvider.instanceId
        };
        let appName = this.DefaultDomainProxyService.applicationName;
        // Prevent locking
        let promise_handling = 
        // Access source database
        // this.switchServer(this.source_database)
        // .then( ()=>{
        //     // Login source database
        //     return this.perform_send_login_messages()   
        // }) 
        this.perform_send_login_messages(appName) // TEMP
            .then((UCPID) => {
            // Store source UCP_ID
            this.source_UCP_id = UCPID;
            // Set to source UCP_ID
            this.UCP_Id = this.source_UCP_id;
            return UCPID;
        })
            .then((operation) => {
            // reset source database
            return this.data_transfer_cancelchanges();
        })
            .then((operation) => {
            // retrieve from source database
            return this.data_transfer_retrieve();
        })
            // .then( ()=>{
            //     // Logout source database
            //     return this.perform_send_logout_messages(this.source_UCP_id);   
            // }) 
            // .then( ()=>{
            //     return this.switchServer(this.target_database)
            // })
            .then(() => {
            // Login target database
            return this.perform_send_login_messages(appName);
        })
            .then((UCPID) => {
            // Store target UCP_ID
            this.target_UCP_id = UCPID;
            return this.target_UCP_id;
        })
            .then((operation) => {
            // reset target database
            return this.data_transfer_cancelchanges(payload);
        })
            .then((operation) => {
            // new (at target database)
            return this.data_transfer_new(payload);
        })
            .then((operation) => {
            // append new row
            return this.data_transfer_sync_row(payload);
        })
            .then((operation) => {
            // set item or details
            return this.data_transfer_setColumns(payload);
        })
            .then((operation) => {
            // save
            return this.data_transfer_save(payload);
        })
            .then((operation) => {
            // Done
            this.set_process_status(handler_id, "Done");
            this.updateMessagesLocalStorage();
        })
            .then((operation) => {
            // Complete
            this.LogMessage("Performed add employee handler Task ID '" + this.get_taskID(handler_id) + "'.");
            return handler_id;
        })
            .then(() => {
            // Logout target database
            return this.perform_send_logout_messages(appName, this.target_UCP_id);
        })
            .then(() => {
            return status;
        });
        return promise_handling;
    }
}
exports.add_employee_profile_notification_class = add_employee_profile_notification_class;
//# sourceMappingURL=add_employee_profile_notification_handler.js.map