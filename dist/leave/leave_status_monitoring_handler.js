"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leave_status_monitoring_class = void 0;
const axios_1 = require("@nestjs/axios");
const https_1 = require("https");
const rxjs_1 = require("rxjs");
const readfromfilepath_1 = require(".././_utility/readfromfilepath");
const writetofilepath_1 = require(".././_utility/writetofilepath");
const base_notification_handler_1 = require("../base/base_notification_handler");
const handlers_manager_1 = require("../handlers_manager");
const export_1 = require("../_dependencies/DP/src/interface/export");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
class leave_status_monitoring_class extends base_notification_handler_1.base_notification_handler_class {
    constructor() {
        super();
        this.app = "Test Application";
        this.leavestatus_alldata = new Array();
        this.http_config = {
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        };
        const n8n_URL = process.env['n8n_URL'];
        this.n8n_url = n8n_URL;
        this.load_existing_leavestatus();
    }
    async load_existing_leavestatus() {
        await readfromfilepath_1.readfromfilepath("observer", "leavestatus_alldata", []).then((leavestatus_alldata) => {
            // Fix undefine case
            if (!leavestatus_alldata) {
                leavestatus_alldata = [];
            }
            this.leavestatus_alldata = leavestatus_alldata;
            return this.leavestatus_alldata.length;
        });
    }
    updateMessagesLocalStorage() {
        writetofilepath_1.writetofilepath("observer", "leavestatus_alldata", this.leavestatus_alldata, null);
    }
    //Overwrite for fixing socket connection issue
    async send_message(handler_id, steps_id) {
        let promise;
        for (let ind = 0; ind < this.handlers[handler_id].steps[steps_id].request.length; ind++) {
            promise = new Promise((resolve, reject) => {
                let sub = new axios_1.HttpService().post(DP_config_1.URLs.NESTWS + "/request", this.MessageService.getDPmessage(this.handlers[handler_id].steps[steps_id].request[ind]), this.http_config) // here is Observable<AxiosResponse>  
                    .pipe(rxjs_1.map(resp => {
                    return resp["data"][0];
                })).subscribe({
                    next: (msg) => {
                        resolve(msg);
                        sub.unsubscribe(); // stop
                        return;
                    },
                    error: (err) => {
                        // Start ConnectionError Subscription
                        let connectionError = {
                            requestId: "Start_" + new export_1.Uuid().generateId(),
                            eventType: handlers_manager_1.eventTypes.ConnectionError,
                            message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                        };
                        //console.log("Leave Notification Connection Error!")
                        this.errorSinkObservable.next(connectionError);
                    }
                });
            });
        }
        return promise;
    }
    publishForReceiveLeaveNotification(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        let newSub = inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.Start
                    && this.restart_count == 0
                    && this.checkIsCurrentObject(process.message)) {
                    // Reset
                    this.resetLiveSubscription();
                    this.attemptToLogout(this.previous_UCP_Id);
                    this.attemptToLogout(this.UCP_Id);
                    this.restart_count = this.restart_count + 1;
                    this.maintainConnection();
                    //console.log(">> Leave eventype start started")
                    let DP_LeaveNotification = this.getDomainProxy();
                    let currentUCPId = "";
                    let appname = this.app;
                    const msg = DP_LeaveNotification.getMessageService().getLoginMessage();
                    let newSub = DP_LeaveNotification.send(appname, msg).subscribe({
                        next: (response_msg) => {
                            if (response_msg.data &&
                                response_msg.data['StatusException'] &&
                                response_msg.data['StatusException']['status'] &&
                                response_msg.data['StatusException']['status'] == "-1") {
                                // Start the server's subscription
                                let connectionError = {
                                    requestId: "Start_" + new export_1.Uuid().generateId(),
                                    eventType: handlers_manager_1.eventTypes.ConnectionError,
                                    message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." || "")
                                };
                                //console.log("Leave Notification Login Exception Error!")
                                this.errorSinkObservable.next(connectionError);
                            }
                            if (response_msg.data &&
                                response_msg.data['ServerUCP'] &&
                                response_msg.data['ServerUCP']['ucpId']) {
                                currentUCPId = response_msg.data['ServerUCP']['ucpId'];
                                this.UCP_Id = currentUCPId;
                                console.log("Current UCP id in Leave Status: " + currentUCPId);
                            }
                            if (currentUCPId) {
                                let msg = DP_LeaveNotification.getMessageService().getSubscribeNotifMessage(currentUCPId, 'notification');
                                //console.log("[Leave Notification_OBSERVER] Receiving incoming responses...")
                                let newSub = DP_LeaveNotification.subscribe(appname, msg).subscribe({
                                    next: (msg) => {
                                        let serviceId = "";
                                        this.maintainConnection();
                                        if (msg["data"] &&
                                            msg["data"]["data"] &&
                                            msg["data"]["data"]["NotificationMicroserviceData"] &&
                                            msg["data"]["data"]["NotificationMicroserviceData"]["uiMessage"] &&
                                            msg["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"] &&
                                            msg["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"] &&
                                            msg["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"] &&
                                            msg["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"]["EntityTypeID"]) {
                                            serviceId = msg["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"]["EntityTypeID"];
                                        }
                                        if (serviceId > "" && serviceId == "09 - Leave Application") {
                                            console.log("Leave status Application Detected.");
                                            let message = {
                                                requestId: new export_1.Uuid().generateId(),
                                                eventType: handlers_manager_1.eventTypes.RetrieveLeave,
                                                message: msg
                                            };
                                            this.add_handler(message.requestId, msg.data, "", "Default");
                                            // process.requestId = this.handlers.length - 1
                                            newOutputObservable.next(message);
                                        }
                                    },
                                    error: (err) => {
                                        let message = err.message || err;
                                        console.error('[Leave Notification_OBSERVER]Something wrong occurred: ' + message);
                                        // Start the server's subscription
                                        let connectionError = {
                                            requestId: "Start_" + new export_1.Uuid().generateId(),
                                            eventType: handlers_manager_1.eventTypes.ConnectionError,
                                            message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                                        };
                                        //console.log("Leave Notification 2 Connection Error!")
                                        this.errorSinkObservable.next(connectionError);
                                    },
                                    complete() {
                                        //console.log('Error');
                                        console.log('[Leave Notification_OBSERVER]Done observable 2.');
                                    }
                                });
                                this.liveSubsription.push(newSub);
                            }
                        },
                        error: (err) => {
                            console.error('[Leave Notification_OBSERVER]Something wrong occurred: ' + err.message);
                            // Start the server's subscription
                            let connectionError = {
                                requestId: "Start_" + new export_1.Uuid().generateId(),
                                eventType: handlers_manager_1.eventTypes.ConnectionError,
                                message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                            };
                            this.errorSinkObservable.next(connectionError);
                        },
                        complete() {
                        },
                    });
                    this.liveSubsription.push(newSub);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRetrieveLeaveDetails(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RetrieveLeave) {
                    //console.log("initial input :"+JSON.stringify(process.message.data,null,4))
                    let current_ucpId = process["message"]["header"]["security"]["ucpId"];
                    let doc_ref_no = process["message"]["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"]["Code"];
                    let new_message = {};
                    let leavestatus_data = {};
                    let operation = process["message"]["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"]["Operation"];
                    leavestatus_data["doc_ref_no"] = doc_ref_no;
                    if (operation == "New") {
                        leavestatus_data["currentStatus"] = "New Leave Application";
                    }
                    if (operation == "Modify") {
                        leavestatus_data["currentStatus"] = "Modified Leave Application";
                    }
                    if (operation == "Cancel") {
                        leavestatus_data["currentStatus"] = "Cancelled Leave Application";
                    }
                    if (operation == "Post") {
                        leavestatus_data["currentStatus"] = "Approved Leave Application";
                    }
                    if (operation == "Delete") {
                        leavestatus_data["currentStatus"] = "Deleted Leave Application";
                        leavestatus_data["dateApplied"] = "<Record deleted>";
                        leavestatus_data["applicantName"] = "<Record deleted>";
                        leavestatus_data["lastUpdatedDate"] = "<Record deleted>";
                        leavestatus_data["additionalLeaveDetails"] = "<Record deleted>";
                        this.leavestatus_alldata.push(leavestatus_data);
                        let message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.ProcessingCompleted,
                            message: process.message //Continue to 
                        };
                        newOutputObservable.next(message);
                    }
                    if (operation !== "Delete") {
                        console.log("Retrieving Leave and other details...");
                        let payload_firstretrieve = {
                            "UCP_Id": current_ucpId,
                            "ServiceID": "Leave Application Data"
                        };
                        let new_step_ind = this.create_message(process.requestId, export_1.Command.Retrieve, payload_firstretrieve);
                        this.send_message(process.requestId, new_step_ind).then((response) => {
                            let payload_firstretrieve = {
                                "UCP_Id": current_ucpId,
                                "ServiceID": "Leave Application Data",
                                "parameter": "code=" + doc_ref_no,
                                "setCache": false
                            };
                            let new_step_ind = this.create_message(process.requestId, export_1.Command.Retrieve, payload_firstretrieve);
                            this.send_message(process.requestId, new_step_ind).then((response) => {
                                let status = 1;
                                if (status == 1) {
                                    status = checkstatus(response);
                                }
                                if (status == 1) {
                                    leavestatus_data["dateApplied"] = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"]["ps_doc_leave_ps_dt_applied"];
                                    new_message["documentDetails"] = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"];
                                    let emp_role_id = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"]["ps_doc_leave_emp_role_id"];
                                    let payload_second = {
                                        "UCP_Id": current_ucpId,
                                        "ServiceID": "Employee Role Data",
                                        "parameter": "TEST@column=ps_emp_role.emp_role_id,TEST@operator==,TEST@value=" + emp_role_id
                                    };
                                    let new_step_ind_2 = this.create_message(process.requestId, export_1.Command.Retrieve, payload_second);
                                    this.send_message(process.requestId, new_step_ind_2).then((response) => {
                                        this.set_process_status(process.requestId, "Retrieved");
                                        //this.updateMessagesLocalStorage();
                                        leavestatus_data["applicantName"] = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"]["pers_name"];
                                        //console.log("Applicant details :"+JSON.stringify(response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"],null,4)) 
                                        if (status == 1) {
                                            status = checkstatus(response);
                                            let emp_number = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"]["emp_number"];
                                            let payload_third = {
                                                "UCP_Id": current_ucpId,
                                                "ServiceID": "Employee Profile Data",
                                                "parameter": "employeenumber =" + emp_number
                                            };
                                            let new_step_ind_3 = this.create_message(process.requestId, export_1.Command.Retrieve, payload_third);
                                            this.send_message(process.requestId, new_step_ind_3).then((response) => {
                                                //REQUIRED 2 - Applicant Details
                                                //console.log("3 :"+JSON.stringify(response,null,4))
                                                new_message["applicantDetails"] = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"];
                                                this.set_process_status(process.requestId, "Retrieved");
                                                //this.updateMessagesLocalStorage(); 
                                                //console.log("3. response is:" +JSON.stringify(response,null,4))
                                                if (status == 1) {
                                                    status = checkstatus(response);
                                                    let payload_forth = {
                                                        "UCP_Id": current_ucpId,
                                                        "ServiceID": "09 - Leave Application",
                                                        "argument": "0,0,0," + emp_role_id,
                                                        "dataRow": null
                                                    };
                                                    let new_step_ind_4 = this.create_message(process.requestId, export_1.Command.Retrieve, payload_forth);
                                                    this.send_message(process.requestId, new_step_ind_4).then((response) => {
                                                        //console.log("4 :"+JSON.stringify(response,null,4))
                                                        this.set_process_status(process.requestId, "Retrieved");
                                                        //this.updateMessagesLocalStorage(); 
                                                        //Set list of leaves and get the leave corresponding to doc reference number
                                                        let listing = response["data"]["GenericFisData"]["data"]["listing"]["rows"]["row"];
                                                        let rowId;
                                                        let rowNumber;
                                                        let doc_status;
                                                        for (let i = 0; i < listing.length; i++) {
                                                            if (listing[i].column.ps_doc_header_ps_doc_ref_no == doc_ref_no) {
                                                                rowId = listing[i].rowId;
                                                                rowNumber = listing[i].rowNumber.toString();
                                                                doc_status = listing[i].column.ps_doc_header_ps_doc_status;
                                                            }
                                                        }
                                                        if (status == 1) {
                                                            status = checkstatus(response);
                                                            let payload_fifth = {
                                                                "UCP_Id": current_ucpId,
                                                                "ServiceID": "09 - Leave Application",
                                                                "parameter": "objecttype=TM,eventname=ue_trigger_listing_selection,row=" + rowNumber,
                                                                "dataRow": null
                                                            };
                                                            let new_step_ind_5 = this.create_message(process.requestId, export_1.Command.Execute, payload_fifth);
                                                            this.send_message(process.requestId, new_step_ind_5).then((response) => {
                                                                //console.log("5 :"+JSON.stringify(response,null,4))
                                                                //checkstatus(response)
                                                                this.set_process_status(process.requestId, "Retrieved");
                                                                //this.updateMessagesLocalStorage(); 
                                                                //console.log(JSON.stringify(response,null,4))
                                                                if (status == 1) {
                                                                    status = checkstatus(response);
                                                                    let payload_sixth = {
                                                                        "UCP_Id": current_ucpId,
                                                                        "ServiceID": "09 - Leave Application"
                                                                    };
                                                                    let new_step_ind_6 = this.create_message(process.requestId, export_1.Command.Retrieve, payload_sixth);
                                                                    this.send_message(process.requestId, new_step_ind_6).then((response) => {
                                                                        //console.log("6 :"+JSON.stringify(response,null,4))
                                                                        leavestatus_data["additionalLeaveDetails"] = response["data"]["GenericFisData"]["data"]["header"]["rows"]["row"]["0"]["column"];
                                                                        if (response["data"]["GenericFisData"]["data"]["security"]["rows"]["row"]["0"]["column"]["doc_dt_lastupdate"]) {
                                                                            leavestatus_data["lastUpdatedDate"] = response["data"]["GenericFisData"]["data"]["security"]["rows"]["row"]["0"]["column"]["doc_dt_lastupdate"];
                                                                        }
                                                                        else {
                                                                            leavestatus_data["lastUpdatedDate"] = response["data"]["GenericFisData"]["data"]["security"]["rows"]["row"]["0"]["column"]["doc_dt_prepared"];
                                                                        }
                                                                        this.leavestatus_alldata.push(leavestatus_data);
                                                                        this.updateMessagesLocalStorage();
                                                                        //REQUIRED 3 - ADDITIONAL LEAVE(DOCUMENT) DETAILS (REMARKS)
                                                                        //console.log("Retrieve Leave - Completed.")
                                                                        //console.log(JSON.stringify(response,null,4))
                                                                        new_message["additionalLeaveDetails"] = response["data"]["GenericFisData"]["data"]["header"]["rows"]["row"]["0"]["column"];
                                                                        process.message.data = {};
                                                                        process.message.data = new_message;
                                                                        //console.log("leavestatus all data:" +JSON.stringify(this.leavestatus_alldata, null, 4))
                                                                        let message = {
                                                                            requestId: process.requestId,
                                                                            eventType: handlers_manager_1.eventTypes.ProcessingCompleted,
                                                                            message: process.message //Continue to 
                                                                        };
                                                                        newOutputObservable.next(message);
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                // Update process status
                                this.set_process_status(process.requestId, "Retrieved");
                                this.updateMessagesLocalStorage();
                            });
                        });
                    }
                    ;
                }
            }
        });
        function checkstatus(response) {
            let status = 1;
            if (!response["data"] || response["data"] == 'token no longer valid') {
                //throw new Error("Invalid response.");
                status = 0;
            }
            else if (!response["data"]["GenericFisData"]) {
                //throw new Error("Invalid response."+JSON.stringify(response["data"]));
                status = 0;
            }
            return status;
        }
        return newOutputObservable;
    }
    subscribeForProcessingCompleted(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.ProcessingCompleted) {
                    console.log("Process completed here");
                    // Nothing happen.
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForProcessingError(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.ProcessingError) {
                    // Nothing happen.
                }
            }
        });
        return newOutputObservable;
    }
}
exports.leave_status_monitoring_class = leave_status_monitoring_class;
//# sourceMappingURL=leave_status_monitoring_handler.js.map