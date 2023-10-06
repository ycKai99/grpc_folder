"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization_fingerprint_class = void 0;
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const axios_1 = require("@nestjs/axios");
const https_1 = require("https");
const fingerprint_handler_1 = require("./fingerprint_handler");
const handlestatusmessage_1 = require("./_utility/handlestatusmessage");
const app_zkt_fingerprint_service_1 = require("./_utility/app.zkt_fingerprint.service");
const dotenv = require("dotenv");
const handlestatusmessage_2 = require("./_utility/handlestatusmessage");
const authentication_paymentcollection_service_1 = require("./_utility/authentication.paymentcollection.service");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const export_1 = require("../_dependencies/DP/src/interface/export");
dotenv.config();
class authorization_fingerprint_class extends fingerprint_handler_1.fingerprint_class {
    constructor() {
        super();
        this.app = "Test Application";
        this.ZKTFpService = new app_zkt_fingerprint_service_1.ZKTFingerprintService();
        this.eventMessageData = [];
        this.messageData = "";
        this.fpTemplate = "";
        this.lowFingerQuality = {};
        this.edgeNumber = "";
        this.primaryFingerprintStatus = {};
        this.siteLocation = process.env.LOCATION;
        this.JAVA_SERVER = process.env.JAVA_SERVER;
        this.CSHARP_FINGERPRINT_VERIFICATION_MODULE = process.env.CSHARP_FINGERPRINT_VERIFICATION_MODULE;
        this.PRIMARY_SERVER = process.env.PRIMARY_SERVER;
        this.VERIFICATION_SETTING = process.env.VERIFICATION_SETTING;
        this.FINGER_EDGE_THRESHOLD = process.env.FINGER_EDGE_THRESHOLD;
        this.FINGER_SCORE_THRESHOLD = process.env.FINGER_SCORE_THRESHOLD;
        this.authentication = new authentication_paymentcollection_service_1.AuthenticationPaymentCollectionService();
        this.http_config = {
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        };
        const n8n_URL = process.env['n8n_URL'];
        this.n8n_url = n8n_URL;
        this.setZKTFingerprintService();
    }
    // set ZKT controller
    async setZKTFingerprintService() {
        this.ZKTFpService = await this.getZKTFingerprintService();
    }
    // get event message data through ZKT controller
    async getEventMessageData() {
        try {
            await this.ZKTFpService.readData("eventMessage" /* EVENT_MSG */).then((res) => {
                this.eventMessageData = res;
            });
        }
        catch (err) {
            let payload = {
                status: -1 /* ERROR */,
                message: err
            };
            console.error("FAILED TO READ EVENT MESSAGE DATA" /* FAILED_TO_READ_EVENT_MSG_DATA */ + handlestatusmessage_1.handleResponse(payload));
        }
    }
    // filter latest event message
    filteredLatestDateEventMessageData() {
        if (this.eventMessageData.length > 0 || this.eventMessageData !== undefined) {
            let latestDateData = this.eventMessageData.sort((a, b) => +new Date(b.registeredDate) - +new Date(a.registeredDate))[0];
            if (!latestDateData.fpUuid || latestDateData == undefined) {
                this.messageData = "";
            }
        }
        else {
            this.messageData = "";
        }
    }
    // Override for fixing socket connection issue
    async send_message(handler_id, steps_id) {
        let promise; //:Promise<ResponseMessage|FisResponseMessage>; 
        for (let ind = 0; ind < this.handlers[handler_id].steps[steps_id].request.length; ind++) {
            promise = new Promise((resolve, reject) => {
                let sub = new axios_1.HttpService().post(DP_config_1.URLs.NESTWS + "/request", this.MessageService.getDPmessage(this.handlers[handler_id].steps[steps_id].request[ind]), this.http_config).pipe(rxjs_1.map(resp => {
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
    publishForAuthorizationRequested(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        this.resetLiveSubscription();
        let newSub = inputObservable.subscribe({
            next: async (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.AuthorizationRequested) {
                    this.deviceNo = this.ZKTFpService.getScannerID();
                    let processMsg = JSON.parse(process.message);
                    try {
                        // Create new authorization event
                        let fileDataPayload = {
                            uuid: new export_1.Uuid().generateId(),
                            registeredDate: new Date(),
                            message: 'AUTHENTICATION : start...',
                            messageType: "FPEevent",
                            deviceNo: this.deviceNo
                        };
                        let newAuthorizationMsg = {
                            uuid: new export_1.Uuid().generateId(),
                            fileName: "eventMessage" /* EVENT_MSG */ + "-" + new export_1.Uuid().generateId(),
                            fileType: "json" /* JSON */,
                            entityName: "eventMessage" /* EVENT_MSG */,
                            fileData: fileDataPayload
                        };
                        processMsg['newAuthorizationMsg'] = newAuthorizationMsg;
                        await this.ZKTFpService.addData("eventMessage" /* EVENT_MSG */, newAuthorizationMsg).then(async (res) => {
                            await this.getEventMessageData();
                        }).then(async (res) => {
                            await this.filteredLatestDateEventMessageData();
                        }).catch((err) => {
                            throw err;
                        });
                    }
                    catch (err) {
                        console.log('Error: ', err);
                    }
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.Authorization,
                        message: JSON.stringify(processMsg)
                    };
                    newOutputObservable.next(message);
                }
            }
        });
        this.liveSubsription.push(newSub);
        return newOutputObservable;
    }
    subscribeForAuthorization(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: async (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.Authorization) {
                    this.deviceNo = this.ZKTFpService.getScannerID();
                    let status = 1; // status = 1 is success, status = 0 is nothing happen, status = -1 is error
                    let processMessage;
                    let personIdentifier;
                    let messageData;
                    let authorizationStatus = {};
                    let errorMessage = "";
                    let selectedpersonIdentifier;
                    let payload;
                    let message;
                    let primaryServerVerificationStatus;
                    if (status == 1) {
                        try {
                            processMessage = JSON.parse(process.message);
                        }
                        catch (e) {
                            status = -1;
                            errorMessage = "Error is tranmission message.";
                        }
                    }
                    if (status == 1) {
                        personIdentifier = processMessage.personIdentifier;
                        messageData = processMessage.messageData;
                        selectedpersonIdentifier = processMessage.selectedpersonIdentifier;
                        if (this.ZKTFpService.getConnectionStatus() == "online" /* ONLINE */) {
                            if (processMessage.verificationStatus.status === "registered fingerprint" /* REGISTERED_FINGERPRINT */) {
                                primaryServerVerificationStatus = "authorization success" /* AUTHORIZATION_FINGERPRINT_SUCCESS */;
                            }
                            else {
                                primaryServerVerificationStatus = "authorization failed" /* AUTHORIZATION_FINGERPRINT_FAILED */;
                            }
                        }
                        else {
                            primaryServerVerificationStatus = "Not Available";
                        }
                    }
                    if (status == 1) {
                        if (messageData && selectedpersonIdentifier.length == 0) {
                            status = -1;
                            errorMessage = 'Please select the organisation and person name before scan.';
                        }
                    }
                    if (status == 1) {
                        if (personIdentifier == selectedpersonIdentifier) {
                            authorizationStatus = {
                                hqfpstatus: primaryServerVerificationStatus,
                                sitefpstatus: "authenticate success" /* AUTHENTICATE_FINGERPRINTT_SUCCESS */,
                                finalstatus: "NONE",
                                uuid: process.requestId
                            };
                        }
                        else {
                            authorizationStatus = {
                                hqfpstatus: primaryServerVerificationStatus,
                                sitefpstatus: "authenticate failed" /* AUTHENTICATE_FINGERPRINTT_FAILED */,
                                finalstatus: "NONE",
                                uuid: process.requestId
                            };
                        }
                    }
                    //error message for no paid amount in payment collection page
                    if (status == 1) {
                        if (!processMessage.amount && processMessage.currentPage == 'paymentCollection') {
                            status = -1;
                            errorMessage = 'Please enter the paid amounts.';
                        }
                    }
                    if (status == 1) {
                        if (processMessage.amount < 0 && processMessage.currentPage == 'paymentCollection') {
                            status = -1;
                            errorMessage = 'Please enter the correct paid amounts.';
                        }
                    }
                    if (status == 1) {
                        if (processMessage.amount > 0 && processMessage.currentPage == 'paymentCollection') {
                            await this.authentication.authenticate("authenticationLogByPaymentCollection" /* AUTHENTICATION_LOG_BY_PAYMENT_COLLECTION */, processMessage.newAuthorizationMsg.fileData.uuid, processMessage);
                        }
                    }
                    if (status == 1) {
                        // Success
                        payload = handlestatusmessage_2.successResponse(JSON.stringify(authorizationStatus));
                        message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.AuthorizationComplete,
                            message: payload
                        };
                        newOutputObservable.next(message);
                    }
                    else {
                        // Error
                        payload = handlestatusmessage_2.failResponse(errorMessage);
                        message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.AuthorizationComplete,
                            message: payload
                        };
                        newOutputObservable.next(message);
                    }
                    // for the final status decision
                    // if (this.VERIFICATION_SETTING === "AND") {
                    //     if (processMessage.verificationStatus.hqfpstatus === PROCESS_STATUS.REGISTERED_FINGERPRINT &&
                    //         personIdentifier == selectedpersonIdentifier) {
                    //         authorizationStatus = {
                    //             hqfpstatus: primaryServerVerificationStatus,
                    //             sitefpstatus: PROCESS_STATUS.AUTHORIZATION_FINGERPRINT_SUCCESS,
                    //             finalstatus: PROCESS_STATUS.REGISTERED_FINGERPRINT,
                    //             uuid: process.requestId
                    //         }
                    //     }
                    //     else {
                    //         authorizationStatus = {
                    //             hqfpstatus: primaryServerVerificationStatus,
                    //             sitefpstatus: PROCESS_STATUS.AUTHORIZATION_FINGERPRINT_FAILED,
                    //             finalstatus: PROCESS_STATUS.UNREGISTERED_FINGERPRINT,
                    //             uuid: process.requestId
                    //         }
                    //     }
                    // }
                    // if (this.VERIFICATION_SETTING === "OR") {
                    //     if (processMessage.verificationStatus.hqfpstatus === PROCESS_STATUS.REGISTERED_FINGERPRINT ||
                    //         personIdentifier == selectedpersonIdentifier) {
                    //         authorizationStatus = {
                    //             hqfpstatus: primaryServerVerificationStatus,
                    //             sitefpstatus: PROCESS_STATUS.AUTHORIZATION_FINGERPRINT_SUCCESS,
                    //             finalstatus: PROCESS_STATUS.REGISTERED_FINGERPRINT,
                    //             uuid: process.requestId
                    //         }
                    //     }
                    //     else {
                    //         authorizationStatus = {
                    //             hqfpstatus: primaryServerVerificationStatus,
                    //             sitefpstatus: PROCESS_STATUS.AUTHORIZATION_FINGERPRINT_FAILED,
                    //             finalstatus: PROCESS_STATUS.UNREGISTERED_FINGERPRINT,
                    //             uuid: process.requestId
                    //         }
                    //     }
                    // }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForAuthorizationComplete(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.AuthorizationComplete) {
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.AuthorizationComplete,
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
    // subscribeForConnectionError (inputObservable:Subject<any>){
    //     let newErrorPublisher = new Subject()
    //     let newSub = this.errorSinkObservable.subscribe({
    //         next:(process:processingObservableInterface)=>{
    //             if(process.eventType == eventTypes.ConnectionError){
    //                 this.previous_UCP_Id = this.UCP_Id
    //                 clearTimeout(this.timeoutID)
    //                 this.restart_count = 0
    //                 setTimeout(()=>{
    //                     // Start the server's subscription
    //                     // let connectionError:processingObservableInterface = {
    //                     //     requestId: "Start_"+new Uuid().generateId(),
    //                     //     eventType: eventTypes.Start,  // can be ProcessingError
    //                     //     message: this.DP_LeaveNotification.getMessageService().getNotificationMessage("Internal","Connection Error."||"")
    //                     // };
    //                     // console.log("Connection Error!")
    //                     // newErrorPublisher.next(connectionError) 
    //                 },5000)
    //             }
    //         }
    //     })
    //     this.liveSubsription.push(newSub);
    //     return newErrorPublisher;
    // }
    getFingerprintDataService() {
        return this.ZKTFpService;
    }
}
exports.authorization_fingerprint_class = authorization_fingerprint_class;
//# sourceMappingURL=authorization_fingerprint_handler.js.map