"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieve_updated_leave_application_class = void 0;
const base_notification_handler_1 = require("../base/base_notification_handler");
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const axios_1 = require("@nestjs/axios");
const https_1 = require("https");
const export_1 = require("../_dependencies/DP/src/interface/export");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
class retrieve_updated_leave_application_class extends base_notification_handler_1.base_notification_handler_class {
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
        let newOutputObservable = new rxjs_1.Subject();
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
                        console.log("Hits an Error here");
                        // Start ConnectionError Subscription
                        let connectionError = {
                            requestId: new export_1.Uuid().generateId(),
                            eventType: handlers_manager_1.eventTypes.RetrievingError,
                            message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                        };
                        //console.log("Approbation Notification Connection Error!")
                        //this.errorSinkObservable.next(connectionError) 
                        return newOutputObservable.next(connectionError);
                    }
                });
            });
        }
        return promise;
    }
    publishForReceiveLeaveRetrievalRequest(inputObservable) {
        //console.log("UCPID on Approbation"+this.UCP_Id)
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: async (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RequestLeaveDetails) {
                    console.log("Received Request to Retrieve Updated Leave");
                    //console.log(this.handlers.length - 1)
                    // process.requestId = this.handlers.length - 1
                    let message = {
                        requestId: "Start_" + new export_1.Uuid().generateId(),
                        eventType: handlers_manager_1.eventTypes.RetrieveUpdatedLeave,
                        message: process.message
                    };
                    this.add_handler(message.requestId, message.message, "", "Default");
                    newOutputObservable.next(message);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRetrieveLeave(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RetrieveUpdatedLeave) {
                    let new_message = {};
                    //new_message["operation"] = process["message"]["data"]["data"]["NotificationMicroserviceData"]["uiMessage"]["uiMessage"]["data"]["NotificationData"]["Operation"]
                    console.log("Retrieving Approbation Leave and other details...");
                    let current_ucpId = process.message.ucpid;
                    let doc_ref_no = process.message.docrefno;
                    let payload_firstretrieve = {
                        "UCP_Id": current_ucpId,
                        "ServiceID": "Leave Application Data"
                    };
                    let new_step_ind = this.create_message(process.requestId, export_1.Command.Retrieve, payload_firstretrieve);
                    //console.log("This is first Retrieve:"+JSON.stringify(new_step_ind,null,4))
                    //console.log("This is handler_id:"+JSON.stringify(process.requestId,null,4))
                    this.send_message(process.requestId, new_step_ind).then((response) => {
                        let status = 1;
                        status = checkstatus(response);
                        if (status == 1) {
                            let payload_firstretrieve = {
                                "UCP_Id": current_ucpId,
                                "ServiceID": "Leave Application Data",
                                "parameter": "code=" + doc_ref_no,
                                "setCache": false
                            };
                            let new_step_ind = this.create_message(process.requestId, export_1.Command.Retrieve, payload_firstretrieve);
                            //console.log("This is first Retrieve:"+JSON.stringify(new_step_ind,null,4))
                            //console.log("This is handler_id:"+JSON.stringify(process.requestId,null,4))
                            this.send_message(process.requestId, new_step_ind).then((response) => {
                                status = checkstatus(response);
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
                                        status = checkstatus(response);
                                        if (status == 1) {
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
                                                status = checkstatus(response);
                                                //console.log("3. response is:" +JSON.stringify(response,null,4))
                                                if (status == 1) {
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
                                                        status = checkstatus(response);
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
                                                                //status = checkstatus(response)
                                                                if (status == 1) {
                                                                    let payload_sixth = {
                                                                        "UCP_Id": current_ucpId,
                                                                        "ServiceID": "09 - Leave Application"
                                                                    };
                                                                    let new_step_ind_6 = this.create_message(process.requestId, export_1.Command.Retrieve, payload_sixth);
                                                                    this.send_message(process.requestId, new_step_ind_6).then((response) => {
                                                                        this.set_process_status(process.requestId, "Retrieved");
                                                                        this.updateMessagesLocalStorage();
                                                                        status = checkstatus(response);
                                                                        //REQUIRED 3 - ADDITIONAL LEAVE(DOCUMENT) DETAILS (REMARKS)
                                                                        //console.log("Retrieve Leave - Completed.")
                                                                        if (status == 1) {
                                                                            new_message["additionalLeaveDetails"] = response["data"]["GenericFisData"]["data"]["header"]["rows"]["row"]["0"]["column"];
                                                                            process.message.data = {};
                                                                            process.message.data = new_message;
                                                                            let message = {
                                                                                requestId: process.requestId,
                                                                                eventType: handlers_manager_1.eventTypes.RetrievedLeaveDetails,
                                                                                message: process.message //Continue to 
                                                                            };
                                                                            newOutputObservable.next(message);
                                                                        }
                                                                        else {
                                                                            newOutputObservable.next(returnerror(response));
                                                                        }
                                                                    });
                                                                }
                                                                else {
                                                                    newOutputObservable.next(returnerror(response));
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            newOutputObservable.next(returnerror(response));
                                                        }
                                                    });
                                                }
                                                else {
                                                    newOutputObservable.next(returnerror(response));
                                                }
                                            });
                                        }
                                        else {
                                            newOutputObservable.next(returnerror(response));
                                        }
                                    });
                                }
                                else {
                                    newOutputObservable.next(returnerror(response));
                                }
                                //console.log("response is:" +JSON.stringify(response,null,4))
                                // Update process status
                                this.set_process_status(process.requestId, "Retrieved");
                                this.updateMessagesLocalStorage();
                                //return response;
                            });
                            // Retrieve the full leave record from FIS
                            // Domainproxy 
                        }
                        else {
                            newOutputObservable.next(returnerror(response));
                        }
                    });
                }
            }
        });
        function returnerror(response) {
            let message = {
                requestId: new export_1.Uuid().generateId(),
                eventType: handlers_manager_1.eventTypes.RetrievingError,
                message: response.message
            };
            console.log("Retrieve Data Error: " + JSON.stringify(message));
            return message;
        }
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
            if (response["data"]["StatusException"]) {
                if (response["data"]["StatusException"]["status"]) {
                    if (response["data"]["StatusException"]["status"] == "-1") {
                        status = 0;
                    }
                }
                if (response["data"]["StatusException"]["message"]) {
                    if (response["data"]["StatusException"]["message"] == "Access Denied: You are not authorized to access FIS Application.") {
                        status = 0;
                    }
                }
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
exports.retrieve_updated_leave_application_class = retrieve_updated_leave_application_class;
//# sourceMappingURL=retrieve_updated_leave_application_handler.js.map