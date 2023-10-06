"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modified_leave_application_notification_class = void 0;
const base_notification_handler_1 = require("../base/base_notification_handler");
//import { staff_profile_type } from "../model/staff_profile";
//import { common_employee_profile_notification_class } from "./common_employee_profile_notification_handler";
//import { add_employee_profile_notification_class } from "./add_employee_profile_notification_handler";
//import { set_employee_profile_notification_class } from "./set_employee_profile_notification_handler";
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const node_fetch_1 = require("node-fetch"); // For N8N Webhook call
const axios_1 = require("@nestjs/axios");
const https_1 = require("https");
const export_1 = require("../_dependencies/DP/src/interface/export");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
class modified_leave_application_notification_class extends base_notification_handler_1.base_notification_handler_class {
    constructor() {
        super();
        this.app = "Test Application";
        this.http_config = {
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        };
        const n8n_URL = process.env['n8n_URL'];
        this.n8n_url = n8n_URL;
    }
    // Override for fixing socket connection issue
    async send_message(handler_id, steps_id) {
        let promise; //:Promise<ResponseMessage|FisResponseMessage>;
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
                        //console.log("Modified Notification Connection Error!")
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
                    //console.log(">> modified eventype start started")
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
                                //console.log("Modified Notification Login Exception Error!")
                                this.errorSinkObservable.next(connectionError);
                            }
                            if (response_msg.data &&
                                response_msg.data['ServerUCP'] &&
                                response_msg.data['ServerUCP']['ucpId']) {
                                currentUCPId = response_msg.data['ServerUCP']['ucpId'];
                                this.UCP_Id = currentUCPId;
                                console.log("Current UCP id in modify: " + currentUCPId);
                            }
                            if (currentUCPId) {
                                let msg = DP_LeaveNotification.getMessageService().getSubscribeNotifMessage(currentUCPId, 'notification');
                                //console.log("[Modified Notification_OBSERVER] Receiving incoming responses...")
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
                                            console.log("Leave Application Detected.");
                                            let message = {
                                                requestId: new export_1.Uuid().generateId(),
                                                eventType: handlers_manager_1.eventTypes.CheckLeaveModification,
                                                message: msg
                                            };
                                            this.add_handler(message.requestId, msg.data, "", "Default");
                                            // this.handler_id = this.handlers.length - 1
                                            //this.handlers[this.handler_id] = {};
                                            //this.handlers[this.handler_id].steps = [];
                                            newOutputObservable.next(message);
                                        }
                                    },
                                    error: (err) => {
                                        let message = err.message || err;
                                        console.error('[Modified Notification_OBSERVER]Something wrong occurred: ' + message);
                                        // Start the server's subscription
                                        let connectionError = {
                                            requestId: "Start_" + new export_1.Uuid().generateId(),
                                            eventType: handlers_manager_1.eventTypes.ConnectionError,
                                            message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                                        };
                                        //console.log("Modified Notification 2 Connection Error!")
                                        this.errorSinkObservable.next(connectionError);
                                    },
                                    complete() {
                                        //console.log('Error');
                                        console.log('[Modified Notification_OBSERVER]Done observable 2.');
                                    }
                                });
                                this.liveSubsription.push(newSub);
                            }
                        },
                        error: (err) => {
                            console.error('[Modified Notification_OBSERVER]Something wrong occurred: ' + err.message);
                            // Start the server's subscription
                            let connectionError = {
                                requestId: "Start_" + new export_1.Uuid().generateId(),
                                eventType: handlers_manager_1.eventTypes.ConnectionError,
                                message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                            };
                            //console.log("Modified Notification 1 Connection Error!")
                            this.errorSinkObservable.next(connectionError);
                        },
                        complete() {
                            //console.log('[Modified Notification_OBSERVER]Done observable 1.');
                        },
                    });
                    // Subscribe to notification using Domain Proxy
                    // .. 
                    this.liveSubsription.push(newSub);
                    // if it is leave notification
                    // do the following ..
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForCheckLeaveModification(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.CheckLeaveModification) {
                    //console.log("Received new message:"+JSON.stringify(process.message.data, null, 4))
                    let process_data = process["message"]["data"];
                    let operation_data;
                    if (process_data["data"] &&
                        process_data["data"]["NotificationMicroserviceData"] &&
                        process_data["data"]["NotificationMicroserviceData"]["uiMessage"] &&
                        process_data["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"] &&
                        process_data["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"] &&
                        process_data["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"] &&
                        process_data["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"]["Operation"]) {
                        operation_data = process_data["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"]["Operation"];
                    }
                    if (operation_data > "" && operation_data.toLowerCase() == "modify") {
                        console.log("Modified Leave Detected..");
                        let message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.RetrieveLeave,
                            message: process.message
                        };
                        newOutputObservable.next(message);
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRetrieveLeave(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        let inProcess = false;
        let inputSubject = new rxjs_1.Subject();
        inputObservable.subscribe(inputSubject);
        inputSubject.subscribe({
            next: (process) => {
                //eventQueueAwaitingToProcess.push(processInqueue);
                //let process = eventQueueAwaitingToProcess.pop();
                // Check to start
                if (process.eventType == handlers_manager_1.eventTypes.RetrieveLeave) {
                    // Start and check queue/in process first
                    if (inProcess) {
                        setTimeout(() => {
                            inputSubject.next(process);
                        }, 2 * 1000);
                    }
                    else {
                        inProcess = true;
                        //try{
                        let new_message = {};
                        console.log("Retrieving Modified Leave and other details...");
                        let current_ucpId = process["message"]["header"]["security"]["ucpId"]; //process["message"]["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["header"]["security"]["ucpId"]
                        let doc_ref_no = process["message"]["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"]["Code"];
                        let payload_firstretrieve = {
                            "UCP_Id": current_ucpId,
                            "ServiceID": "Leave Application Data"
                        };
                        let new_step_ind = this.create_message(process.requestId, export_1.Command.Retrieve, payload_firstretrieve);
                        //console.log("This is first Retrieve:"+JSON.stringify(new_step_ind,null,4))
                        //console.log("This is handler_id:"+JSON.stringify(this.handler_id,null,4))
                        this.send_message(process.requestId, new_step_ind).then((response) => {
                            let payload_firstretrieve = {
                                "UCP_Id": current_ucpId,
                                "ServiceID": "Leave Application Data",
                                "parameter": "code=" + doc_ref_no,
                                "setCache": false
                            };
                            let new_step_ind = this.create_message(process.requestId, export_1.Command.Retrieve, payload_firstretrieve);
                            //console.log("This is first Retrieve:"+JSON.stringify(new_step_ind,null,4))
                            //console.log("This is handler_id:"+JSON.stringify(this.handler_id,null,4))
                            this.send_message(process.requestId, new_step_ind).then((response) => {
                                let status = 1;
                                if (status == 1) {
                                    status = checkstatus(response);
                                }
                                //REQUIRED 1 - DOCUMENT DETAILS
                                if (status == 1) {
                                    new_message["documentDetails"] = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"];
                                    let emp_role_id = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"]["ps_doc_leave_emp_role_id"];
                                    let payload_second = {
                                        "UCP_Id": current_ucpId,
                                        "ServiceID": "Employee Role Data",
                                        "parameter": "TEST@column=ps_emp_role.emp_role_id,TEST@operator==,TEST@value=" + emp_role_id
                                    };
                                    let new_step_ind_2 = this.create_message(process.requestId, export_1.Command.Retrieve, payload_second);
                                    this.send_message(process.requestId, new_step_ind_2).then((response) => {
                                        //checkstatus(response)
                                        this.set_process_status(process.requestId, "Retrieved");
                                        this.updateMessagesLocalStorage();
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
                                                new_message["applicantDetails"] = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"]["0"]["column"];
                                                this.set_process_status(process.requestId, "Retrieved");
                                                this.updateMessagesLocalStorage();
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
                                                        this.set_process_status(process.requestId, "Retrieved");
                                                        this.updateMessagesLocalStorage();
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
                                                                //checkstatus(response)
                                                                this.set_process_status(process.requestId, "Retrieved");
                                                                this.updateMessagesLocalStorage();
                                                                if (status == 1) {
                                                                    status = checkstatus(response);
                                                                    let payload_sixth = {
                                                                        "UCP_Id": current_ucpId,
                                                                        "ServiceID": "09 - Leave Application"
                                                                    };
                                                                    let new_step_ind_6 = this.create_message(process.requestId, export_1.Command.Retrieve, payload_sixth);
                                                                    this.send_message(process.requestId, new_step_ind_6).then((response) => {
                                                                        //REQUIRED 3 - ADDITIONAL LEAVE(DOCUMENT) DETAILS (REMARKS)
                                                                        //console.log("Retrieve Leave - Completed.")
                                                                        new_message["additionalLeaveDetails"] = response["data"]["GenericFisData"]["data"]["header"]["rows"]["row"]["0"]["column"];
                                                                        process.message.data = {};
                                                                        process.message.data = new_message;
                                                                        let message = {
                                                                            requestId: process.requestId,
                                                                            eventType: handlers_manager_1.eventTypes.UpdateCalendarLeave,
                                                                            message: process.message //Continue to 
                                                                        };
                                                                        newOutputObservable.next(message);
                                                                        // Process completed
                                                                        inProcess = false;
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
                                //console.log("response is:" +JSON.stringify(response,null,4))
                                // Update process status
                                this.set_process_status(process.requestId, "Retrieved");
                                this.updateMessagesLocalStorage();
                                //return response;
                            });
                            // Retrieve the full leave record from FIS
                            // Domainproxy 
                        });
                        /* }
                        catch(e){
                            console.log("RETRIEVE LEAVE ERROR: "+e)
                        
                        } */
                    }
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
    subscribeForUpdateCalenderLeave(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.UpdateCalendarLeave) {
                    console.log("Subscribe for Updating Calendar...");
                    //console.log("Process message data:"+JSON.stringify(process.message.data, null, 4))
                    let httprequestparam = "";
                    httprequestparam = encodeURIComponent(JSON.stringify(process.message.data));
                    let webhooklink = this.n8n_url + "/webhook/modified-leave";
                    if (httprequestparam > "") {
                        //http://192.168.100.100:5678/webhook/leaveapplication?eid=da2vakscg5qvd2cg256r9djuks&docrefno=LA/2022/0002740&status=approve
                        webhooklink = webhooklink + "?data=" + httprequestparam;
                    }
                    sendhttprequest(webhooklink).then(() => {
                    });
                    async function sendhttprequest(params) {
                        const response = await node_fetch_1.default(params);
                        const data = await response.json().then((result) => {
                            process.message.data = result;
                            let message = {
                                requestId: process.requestId,
                                eventType: handlers_manager_1.eventTypes.CheckCalendarLeave,
                                message: process.message
                            };
                            newOutputObservable.next(message);
                            //console.log(result)
                        });
                        //const body = await response.text();
                        //console.log("return result from" +JSON.stringify(data, null, 4));
                        //const googledata = data
                        //process.message.data = googledata
                        //process.message.data.googleleavedata = googledata
                        //console.log(JSON.stringify(process.message))
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForCheckCalenderLeave(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.CheckCalendarLeave) {
                    //console.log("Check Calendar:"+JSON.stringify(process.message,null,4))
                    let fisleavedetails = JSON.stringify(process.message["data"]["leaveDetails"]);
                    let googleleavedetails = JSON.stringify(process.message["data"]["googleLeaveData"]);
                    if (fisleavedetails == googleleavedetails) {
                        console.log("Checked Leave Details");
                        let message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.ProcessingCompleted,
                            message: process.message
                        };
                        newOutputObservable.next(message);
                    }
                    else {
                        let message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.ProcessingError,
                            message: process.message
                        };
                        newOutputObservable.next(message);
                    }
                }
            }
        });
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
exports.modified_leave_application_notification_class = modified_leave_application_notification_class;
//# sourceMappingURL=modified_leave_application_notification_handler.js.map