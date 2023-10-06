"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleted_leave_application_notification_class = void 0;
const base_notification_handler_1 = require("../base/base_notification_handler");
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const node_fetch_1 = require("node-fetch"); // For N8N Webhook call
const axios_1 = require("@nestjs/axios");
const https_1 = require("https");
const export_1 = require("../_dependencies/DP/src/interface/export");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
class deleted_leave_application_notification_class extends base_notification_handler_1.base_notification_handler_class {
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
                    //console.log(">> deleted eventype start started")
                    let DP_LeaveNotification = this.getDomainProxy();
                    let currentUCPId = "";
                    let appname = this.app;
                    const msg = DP_LeaveNotification.getMessageService().getLoginMessage();
                    let newSub = DP_LeaveNotification.send(appname, msg).subscribe({
                        next: (response_msg) => {
                            if (response_msg.data &&
                                response_msg.data['ServerUCP'] &&
                                response_msg.data['ServerUCP']['ucpId']) {
                                currentUCPId = response_msg.data['ServerUCP']['ucpId'];
                                this.UCP_Id = currentUCPId;
                                console.log("Current UCP id in Delete: " + currentUCPId);
                            }
                            if (currentUCPId) {
                                let msg = DP_LeaveNotification.getMessageService().getSubscribeNotifMessage(currentUCPId, 'notification');
                                // console.log("[Deleted Notification_OBSERVER] Receiving incoming responses...")
                                let newSub = DP_LeaveNotification.subscribe(appname, msg).subscribe({
                                    next: (msg) => {
                                        this.maintainConnection();
                                        let serviceId = "";
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
                                            // console.log("delete Leave Application Detected.")
                                            let message = {
                                                requestId: new export_1.Uuid().generateId(),
                                                eventType: handlers_manager_1.eventTypes.CheckLeaveDeleted,
                                                message: msg
                                            };
                                            this.add_handler(message.requestId, msg.data, "", "Default");
                                            // this.handler_id = this.handlers.length - 1
                                            //this.handlers[this.handler_id] = {};
                                            //this.handlers[this.handler_id].steps = [];
                                            newOutputObservable.next(message);
                                        }
                                        //if(JSON.stringify(msg)){} // Filtering
                                        //if serviceid = 09 leave notification
                                        //console.log(JSON.stringify(msg.data,null,4));
                                        //newOutputObservable.next(msg)
                                    },
                                    error: (err) => {
                                        let message = err.message || err;
                                        console.error('[Deleted Notification_OBSERVER]Something wrong occurred: ' + message);
                                        // Start the server's subscription
                                        let connectionError = {
                                            requestId: "Start_" + new export_1.Uuid().generateId(),
                                            eventType: handlers_manager_1.eventTypes.ConnectionError,
                                            message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                                        };
                                        //console.log("Deleted Notification 2 Connection Error!")
                                        this.errorSinkObservable.next(connectionError);
                                    },
                                    complete() {
                                        //console.log('Error');
                                        console.log('[Deleted Notification_OBSERVER]Done observable 2.');
                                    }
                                });
                                this.liveSubsription.push(newSub);
                            }
                        },
                        error: (err) => {
                            console.error('[Deleted Notification_OBSERVER]Something wrong occurred: ' + err.message);
                            // Start the server's subscription
                            let connectionError = {
                                requestId: "Start_" + new export_1.Uuid().generateId(),
                                eventType: handlers_manager_1.eventTypes.ConnectionError,
                                message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                            };
                            //console.log("Deleted Notification 1 Connection Error!")
                            this.errorSinkObservable.next(connectionError);
                        },
                        complete() {
                            // console.log('[Deleted Notification_OBSERVER]Done observable 1.');
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
    subscribeForCheckLeaveDeleted(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.CheckLeaveDeleted) {
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
                    if (operation_data > "" && operation_data.toLowerCase() == "delete") {
                        console.log("Deletion Detected..");
                        let message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.UpdateDeletedCalenderLeave,
                            message: process.message
                        };
                        newOutputObservable.next(message);
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForUpdateDeletedCalenderLeave(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.UpdateDeletedCalenderLeave) {
                    console.log("Subscribe for Updating Calendar...");
                    //console.log("Process message data:"+JSON.stringify(process.message.data, null, 4))
                    let httprequestparam = "";
                    httprequestparam = encodeURIComponent(JSON.stringify(process.message.data));
                    let webhooklink = this.n8n_url + "/webhook/deleted-leave";
                    if (httprequestparam > "") {
                        //http://192.168.100.100:5678/webhook/leaveapplication?eid=da2vakscg5qvd2cg256r9djuks&docrefno=LA/2022/0002740&status=approve
                        webhooklink = webhooklink + "?data=" + httprequestparam;
                    }
                    sendhttprequest(webhooklink);
                    async function sendhttprequest(params) {
                        const response = await node_fetch_1.default(params);
                        const data = await response.json().then((result) => {
                            process.message.data = result;
                            let message = {
                                requestId: process.requestId,
                                eventType: handlers_manager_1.eventTypes.CheckDeletedCalenderLeave,
                                message: process.message
                            };
                            newOutputObservable.next(message);
                        });
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForCheckDeletedCalenderLeave(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.CheckDeletedCalenderLeave) {
                    //console.log("Comparing Calendar and Leave Details")
                    let fisleavedetails = JSON.stringify(process.message["data"]["leaveDetails"]);
                    let calendar_event_delete_status = JSON.stringify(process.message["data"]["deletionSucceed"]);
                    if (calendar_event_delete_status == "true") {
                        console.log("Checked Calender Event and Successfully deleted");
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
                    console.log("Deletion notification - Process completed here");
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
exports.deleted_leave_application_notification_class = deleted_leave_application_notification_class;
//# sourceMappingURL=deleted_leave_application_notification_handler.js.map