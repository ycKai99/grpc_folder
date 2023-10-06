"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.synchronize_leave_application_class = void 0;
const base_notification_handler_1 = require("../base/base_notification_handler");
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const axios_1 = require("@nestjs/axios");
const https_1 = require("https");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const export_1 = require("../_dependencies/DP/src/interface/export");
class synchronize_leave_application_class extends base_notification_handler_1.base_notification_handler_class {
    constructor() {
        super();
        this.app = "Synchronize leave application";
        this.requestIDs = [];
        this.requestMessages = {};
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
                        //console.log("New Notification Connection Error!")
                        this.errorSinkObservable.next(connectionError);
                    }
                });
            });
        }
        return promise;
    }
    publishForLoginSynchronizationLeave(inputObservable) {
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
                    //console.log(">> new eventype start started")
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
                                //console.log("New Notification Login Exception Error!")
                                this.errorSinkObservable.next(connectionError);
                            }
                            if (response_msg.data &&
                                response_msg.data['ServerUCP'] &&
                                response_msg.data['ServerUCP']['ucpId']) {
                                currentUCPId = response_msg.data['ServerUCP']['ucpId'];
                                this.UCP_Id = currentUCPId;
                                console.log("Current UCP id in sync: " + currentUCPId);
                            }
                            if (currentUCPId) {
                                let msg = DP_LeaveNotification.getMessageService().getSubscribeNotifMessage(currentUCPId, 'notification');
                                //console.log("[New Notification_OBSERVER] Receiving incoming responses...")
                                let newSub = DP_LeaveNotification.subscribe(appname, msg).subscribe({
                                    next: (msg) => {
                                        let serviceId = "";
                                        this.maintainConnection();
                                        //No next message published  
                                        //newOutputObservable.next(message ) 
                                    },
                                    error: (err) => {
                                        let message = err.message || err;
                                        console.error('[New Notification_OBSERVER]Something wrong occurred: ' + message);
                                        // Start the server's subscription
                                        let connectionError = {
                                            requestId: "Start_" + new export_1.Uuid().generateId(),
                                            eventType: handlers_manager_1.eventTypes.ConnectionError,
                                            message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                                        };
                                        //console.log("New Notification 2 Connection Error!")
                                        this.errorSinkObservable.next(connectionError);
                                    },
                                    complete() {
                                        //console.log('Error');
                                        console.log('[New Notification_OBSERVER]Done observable 2.');
                                    }
                                });
                                this.liveSubsription.push(newSub);
                            }
                        },
                        error: (err) => {
                            console.error('[New Notification_OBSERVER]Something wrong occurred: ' + err.message);
                            // Start the server's subscription
                            let connectionError = {
                                requestId: "Start_" + new export_1.Uuid().generateId(),
                                eventType: handlers_manager_1.eventTypes.ConnectionError,
                                message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." + err.message || "")
                            };
                            //console.log("New Notification 1 Connection Error!")
                            this.errorSinkObservable.next(connectionError);
                        },
                        complete() {
                            //console.log('[New Notification_OBSERVER]Done observable 1.');
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
    publishForSynchronizationLeaveRequested(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        // Awaiting
        console.log("Starting synchronize_leave_application_class.");
        let newSub = inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.SynchronizationLeaveRequested) {
                    const currentEvents = process.message;
                    const newMessage = {
                        eventsToProcess: [],
                        processRowId: 0
                    };
                    // Loop and convert the missing FIS event to events for processing observable
                    for (let ind = 0; ind < currentEvents.MissingFisEvents.length; ind++) {
                        if (!currentEvents.MissingFisEvents[ind].json.column) {
                            console.log("Detected invalid Fis Event format");
                        }
                        else {
                            // [Default operation]
                            // Create new event
                            let newEvent = {
                                ID: String(currentEvents.MissingFisEvents[ind].json.column.ps_doc_id),
                                Code: currentEvents.MissingFisEvents[ind].json.column.ps_doc_header_ps_doc_ref_no,
                                Operation: currentEvents.MissingFisEvents[ind].json.operation
                            };
                            // Add to events list
                            newMessage.eventsToProcess.push(newEvent);
                            // // [Additional operation for approved FIS leave] 
                            // if(currentEvents.MissingFisEvents[ind].json.column.ps_doc_header_ps_doc_status=="Approved")
                            // { 
                            //     // Create new event
                            //     let newEventApproved:eventToProcess = {
                            //         ID: String(currentEvents.MissingFisEvents[ind].json.column.ps_doc_id),
                            //         Code: currentEvents.MissingFisEvents[ind].json.column.ps_doc_header_ps_doc_ref_no,
                            //         Operation:"Post"
                            //     };
                            //     // Add to events list
                            //     newMessage.eventsToProcess.push(newEventApproved)
                            // }
                        }
                    }
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.SynchronizationNextLeaveStarted,
                        message: newMessage
                    };
                    newOutputObservable.next(message);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForSynchronizationNextLeaveStarted(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.SynchronizationNextLeaveStarted) {
                    // Incoming message
                    let currentMsg = process.message;
                    // Checking
                    if (!currentMsg.eventsToProcess || !currentMsg.eventsToProcess[currentMsg.processRowId]) {
                        console.error("Error as no event to process is requested.");
                    }
                    else {
                        // Next message
                        let nextMessage;
                        // Data
                        let data = {
                            "message": "Database notification data.",
                            "ReceivedDate": new Date(),
                            "InstanceID": this.getUUID(),
                            "EntityTypeID": "09 - Leave Application",
                            "EntityTypeName": "09 - Leave Application",
                            "ID": currentMsg.eventsToProcess[currentMsg.processRowId].ID,
                            "Code": currentMsg.eventsToProcess[currentMsg.processRowId].Code,
                            "Operation": currentMsg.eventsToProcess[currentMsg.processRowId].Operation
                        };
                        let payloadData = {
                            "data": {
                                "NotificationMicroserviceData": {
                                    "uiMessage": {
                                        "uiMessage": {
                                            "data": {
                                                "NotificationData": data
                                            }
                                        }
                                    }
                                }
                            }
                        };
                        // New notification
                        let msg = this.getDomainProxy().getMessageService().getNotificationMessage(this.UCP_Id, payloadData);
                        // Check operation and create next message
                        if (msg) {
                            console.log("OPERATION : ", data.Operation);
                            let eventType;
                            if (data.Operation == "New") {
                                eventType = handlers_manager_1.eventTypes.CheckLeaveCreation;
                            }
                            if (data.Operation == "Post") {
                                eventType = handlers_manager_1.eventTypes.CheckLeaveApprobation;
                            }
                            if (data.Operation == "Cancel") {
                                eventType = handlers_manager_1.eventTypes.CheckLeaveCancellation;
                            }
                            if (data.Operation == "Modify") {
                                eventType = handlers_manager_1.eventTypes.CheckLeaveModification;
                            }
                            nextMessage = {
                                requestId: process.requestId,
                                eventType: eventType,
                                message: msg
                            };
                            this.add_handler(process.requestId, msg.data, "", "Default");
                            this.addToAwaitingMessageIDs(process.requestId, currentMsg);
                            // console.log(JSON.stringify(nextMessage));
                            newOutputObservable.next(nextMessage);
                        }
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForSynchronizationNextLeaveEnded(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (this.isTaskCompleted(process)) {
                    console.log("Synchronised leave.");
                    // Incoming message
                    let currentMsg = process.message;
                    // Next message
                    let nextMessage;
                    // Still more rows to process?
                    if (this.isAwaitingMessageIDs(process.requestId)) {
                        let readMessage = this.readAwaitingMessages(process.requestId);
                        if (readMessage) {
                            currentMsg = readMessage;
                            // Increment here
                            currentMsg.processRowId = currentMsg.processRowId + 1;
                            if (currentMsg.eventsToProcess.length > currentMsg.processRowId) {
                                // Check current record
                                let currentFisEvent = currentMsg.eventsToProcess[currentMsg.processRowId];
                                // Next message
                                nextMessage = {
                                    requestId: process.requestId,
                                    eventType: handlers_manager_1.eventTypes.SynchronizationNextLeaveStarted,
                                    message: readMessage
                                };
                            }
                            else {
                                // Next message
                                nextMessage = {
                                    requestId: process.requestId,
                                    eventType: handlers_manager_1.eventTypes.SynchronizationLeaveComplete,
                                    message: currentMsg
                                };
                            }
                            newOutputObservable.next(nextMessage);
                        }
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForSynchronizationLeaveComplete(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.SynchronizationLeaveComplete) {
                    console.log("synchronize completed.");
                    // Complete
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.ProcessingCompleted,
                        message: process.message
                    };
                    newOutputObservable.next(message);
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
                    console.log("synchronize Process completed here");
                    // Complete
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.SynchronizationLeaveCompleteNotification,
                        message: process.message
                    };
                    newOutputObservable.next(message);
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
    addToAwaitingMessageIDs(ID, message) {
        this.requestIDs.push(ID);
        this.requestMessages[ID] = message;
    }
    isAwaitingMessageIDs(ID) {
        let idIndex = this.requestIDs.indexOf(ID);
        let wasInList = false;
        if (idIndex >= 0) {
            wasInList = true;
            this.requestIDs.splice(idIndex, 0);
        }
        return wasInList;
    }
    readAwaitingMessages(ID) {
        let message = this.requestMessages[ID];
        delete this.requestMessages[ID];
        return message;
    }
    isTaskCompleted(process) {
        let status = false;
        if (process.eventType == handlers_manager_1.eventTypes.ProcessingCompleted) {
            status = true;
        }
        return status;
    }
}
exports.synchronize_leave_application_class = synchronize_leave_application_class;
;
;
//# sourceMappingURL=synchronize_leave_application_handler.js.map