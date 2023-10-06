"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new_employee_profile_notification_class = void 0;
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const add_employee_profile_notification_handler_1 = require("./add_employee_profile_notification_handler");
class new_employee_profile_notification_class extends add_employee_profile_notification_handler_1.add_employee_profile_notification_class {
    constructor() {
        super(...arguments);
        this.trackingPerson = [];
    }
    async initialise(UserAppId, remoteDP, notificationManager) {
        return super.initialise(UserAppId, remoteDP, notificationManager).then((UCP_ID) => {
            // // User sessions message queue 
            // this.subscribeRemoteMessageToMessageQueue(UCP_ID,this.channels.UserSessions,
            //     (queue:MessageInQueueInterface)=>
            //     {
            //         if( queue.state == MessageQueueState.Start){
            //             if( 
            //                 queue.data['UserSessionsData'] 
            //             )
            //             { 
            //                 queue.state = MessageQueueState.Completed;
            //             }
            //             else{
            //                 queue.state = MessageQueueState.Ignored; 
            //             }
            //         }
            //     }
            // ); 
            // // Service provider message queue
            // this.subscribeRemoteMessageToMessageQueue(UCP_ID,this.channels.ServiceProvider,
            //     (queue:MessageInQueueInterface)=>
            //     {
            //         if( queue.state == MessageQueueState.Start){
            //             if( 
            //                 queue.data['ServiceProvidersData'] 
            //             )
            //             {
            //                 queue.state = MessageQueueState.QueueForProcess;
            //                 const dataObject = queue.data['ServiceProvidersData'] as ServiceProvidersData;
            //                 this.setLocalServiceProvidersList(dataObject.providers);
            //                 queue.state = MessageQueueState.Completed;
            //             }
            //             else{
            //                 queue.state = MessageQueueState.Ignored; 
            //             }
            //         }
            //     }
            // );
            return UCP_ID;
        });
    }
    async perform_handler(handler_id) {
        let status = -1;
        let task_ID = this.get_taskID(handler_id);
        this.set_handler_id(handler_id);
        this.LogMessage("Logined for Task ID '" + this.get_taskID(handler_id) + "'.");
        // Current database is Target database
        // Store target UCP_ID
        this.target_UCP_id = this.UCP_Id; // Should be no longer needed
        this.source_database = DP_config_1.URLs.NESTWS_DEFAULT_SERVER; // Might be need interpret from message
        this.target_database = DP_config_1.URLs.TargetDatabase;
        // Prevent locking
        let promise_handling = 
        // Access source database
        // this.switchServer(this.source_database)
        // .then( ()=>{
        //     // Login source database
        //     return this.perform_send_login_messages()  // TEMP
        // })
        this.perform_send_login_messages() // TEMP
            .then((UCPID) => {
            // Store source UCP_ID
            this.source_UCP_id = UCPID;
            // Set to source UCP_ID
            this.UCP_Id = this.source_UCP_id;
            // Restore task ID
            handler_id = this.find_handler_id(task_ID);
            this.set_handler_id(handler_id);
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
            .then((operation) => {
            // Avoid new employee profile > trigger new employee profile loop 
            let pers_name = this.source_raw["pers_name"];
            if (this.trackingPerson.find((val) => { return val == pers_name; })) {
                console.log("Notification for last operation has been received. Employee " + pers_name + ".");
                // Update process status
                this.set_process_status(handler_id, "Done");
                this.updateMessagesLocalStorage();
                return handler_id;
            }
            else {
                this.trackingPerson.push(pers_name);
                // Add a new employee 
                return super.perform_handler(handler_id);
            }
        });
        return promise_handling;
    }
}
exports.new_employee_profile_notification_class = new_employee_profile_notification_class;
//# sourceMappingURL=new_employee_profile_notification_handler.js.map