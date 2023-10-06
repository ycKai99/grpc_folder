"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification_fingerprint_class = void 0;
//import { staff_profile_type } from "../model/staff_profile";
//import { common_employee_profile_notification_class } from "./common_employee_profile_notification_handler";
//import { add_employee_profile_notification_class } from "./add_employee_profile_notification_handler";
//import { set_employee_profile_notification_class } from "./set_employee_profile_notification_handler";
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const https_1 = require("https");
const dotenv = require("dotenv");
const axios_1 = require("@nestjs/axios");
const fingerprint_handler_1 = require("./fingerprint_handler");
const postmethod_1 = require("./_utility/postmethod");
const handlestatusmessage_1 = require("./_utility/handlestatusmessage");
const authentication_service_1 = require("../authentication/authentication.service");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const export_1 = require("../_dependencies/DP/src/interface/export");
dotenv.config();
class verification_fingerprint_class extends fingerprint_handler_1.fingerprint_class {
    constructor() {
        super();
        this.app = "Test Application";
        this.lowFingerQuality = {};
        this.fpTemplate = "";
        this.edgeNumber = "";
        this.messageData = "";
        this.eventMessageData = [];
        this.primaryFingerprintStatus = {};
        this.siteLocation = process.env.LOCATION;
        this.JAVA_SERVER = process.env.JAVA_SERVER;
        this.FINGERPRINT_VERIFICATION_MODULE = process.env.FINGERPRINT_VERIFICATION_MODULE;
        this.PRIMARY_SERVER = process.env.PRIMARY_SERVER;
        this.VERIFICATION_SETTING = process.env.VERIFICATION_SETTING;
        this.FINGER_EDGE_THRESHOLD = process.env.FINGER_EDGE_THRESHOLD;
        this.FINGER_SCORE_THRESHOLD = process.env.FINGER_SCORE_THRESHOLD;
        this.authentication = new authentication_service_1.AuthenticationService();
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
    publishForNewFPReceived(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        this.resetLiveSubscription();
        let newSub = inputObservable.subscribe({
            next: async (process) => {
                var _a, _b;
                // Check process.message is it fingerprint data
                if (process.eventType == handlers_manager_1.eventTypes.Start && process.message.fpTemplate) {
                    this.deviceNo = this.ZKTFpService.getScannerID();
                    this.messageData = process.message.messageData;
                    this.fpTemplate = process.message.fpTemplate;
                    this.edgeNumber = process.message.edgeNumber;
                    delete process.message.messageData;
                    let eventMessage = {
                        uuid: new export_1.Uuid().generateId(),
                        fpUuid: process.message.fpUuid,
                        registeredDate: new Date(),
                        message: "new fingerprint" /* NEW_FINGERPRINT */,
                        messageType: "FPEevent",
                        deviceNo: this.deviceNo
                    };
                    let eventMessagePayload = {
                        uuid: new export_1.Uuid().generateId(),
                        fileName: "eventMessage" /* EVENT_MSG */ + "-" + new export_1.Uuid().generateId(),
                        fileType: "json" /* JSON */,
                        entityName: "eventMessage" /* EVENT_MSG */,
                        fileData: eventMessage
                    };
                    // process.message['machineID'] = this.deviceNo;
                    // await this.authentication.authenticate(FPENTITYNAME.AUTHENTICATION_LOG, eventMessage['uuid'], eventMessage['fpUuid'], process.message);
                    let fingerprintTemplateMessage = {
                        uuid: new export_1.Uuid().generateId(),
                        fpUuid: process.message.fpUuid,
                        fpTemplate: process.message.fpTemplate,
                        registeredDate: new Date(),
                        status: process.message.status,
                        location: this.siteLocation,
                        personIdentifier: (_a = process.message.personIdentifier) !== null && _a !== void 0 ? _a : "",
                        position: (_b = process.message.position) !== null && _b !== void 0 ? _b : "",
                        masterfp: false,
                    };
                    let fingerprintTemplateMessagePayload = {
                        uuid: new export_1.Uuid().generateId(),
                        fileName: "eventMessage" /* EVENT_MSG */ + "-" + new export_1.Uuid().generateId(),
                        fileType: "json" /* JSON */,
                        entityName: "fingerprintTemplateData" /* FP_TEMPLATE_MSG */,
                        fileData: fingerprintTemplateMessage
                    };
                    let payload = [];
                    payload['eventMessage'] = eventMessagePayload;
                    payload['fingerprintTemplateMessage'] = fingerprintTemplateMessagePayload;
                    payload['status'] = process.message.status;
                    try {
                        await this.ZKTFpService.addData("eventMessage" /* EVENT_MSG */, eventMessagePayload);
                        this.primaryFingerprintStatus = {};
                        if (payload) {
                            let message = {
                                requestId: process.requestId,
                                eventType: handlers_manager_1.eventTypes.NewFPReceived,
                                message: payload
                            };
                            newOutputObservable.next(message);
                        }
                        else {
                            console.error('error FP data detected');
                        }
                    }
                    catch (err) {
                        console.error('publishForNewFPReceived error is ', err);
                    }
                }
            }
        });
        this.liveSubsription.push(newSub);
        return newOutputObservable;
    }
    subscribeForNewFPReceived(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: async (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.NewFPReceived) {
                    this.primaryFingerprintStatus = {};
                    this.deviceNo = this.ZKTFpService.getScannerID();
                    let eventMessage = {
                        uuid: new export_1.Uuid().generateId(),
                        fpUuid: process.message['eventMessage'].fileData.fpUuid,
                        registeredDate: new Date(),
                        message: process.message.status,
                        messageType: "FPEevent",
                        deviceNo: this.deviceNo
                    };
                    let eventMessagePayload = {
                        uuid: new export_1.Uuid().generateId(),
                        fileName: "eventMessage" /* EVENT_MSG */ + "-" + new export_1.Uuid().generateId(),
                        fileType: "json" /* JSON */,
                        entityName: "eventMessage" /* EVENT_MSG */,
                        fileData: eventMessage
                    };
                    let payload = [];
                    payload['eventMessage'] = eventMessagePayload;
                    payload['fingerprintTemplateMessage'] = process.message['fingerprintTemplateMessage'];
                    payload['status'] = process.message.status;
                    //update authenticationLogSchema
                    process.message['fingerprintTemplateMessage']['machineID'] = this.deviceNo;
                    if (this.deviceNo != 'NO DEVICE') {
                        await this.authentication.authenticate("authenticationLog" /* AUTHENTICATION_LOG */, eventMessage['uuid'], eventMessage['fpUuid'], process.message['fingerprintTemplateMessage']);
                    }
                    try {
                        await this.ZKTFpService.addData("eventMessage" /* EVENT_MSG */, payload['eventMessage']).then(async (res) => {
                            this.eventMessageData = await this.ZKTFpService.readData("eventMessage" /* EVENT_MSG */);
                        }).then(async (res) => {
                            await this.getEventMessageData();
                            await this.ZKTFpService.checkConnectionStatus();
                        }).then(async (res) => {
                            // check the connection status of primary Server
                            // if is primary server, primary connection status is always offline
                            // Error case not yet hyandled.
                            if (this.ZKTFpService.getConnectionStatus() == "online" /* ONLINE */) {
                                try {
                                    let verificationfptemplatedata = {
                                        fpTemplate: payload['fingerprintTemplateMessage'].fileData,
                                        //deviceIP: this.ZKTFpService.getDeviceIP()
                                    };
                                    console.log('payload ffile: ', payload['fingerprintTemplateMessage'].fileData);
                                    let returnData = await postmethod_1.postAxiosMethod(this.PRIMARY_SERVER + "/observer/verificationfptemplate", payload['fingerprintTemplateMessage'].fileData);
                                    console.log('return data from primary server: ', returnData);
                                    // if (returnData.status === RESPONSE_STATUS.SUCCESS) {
                                    postmethod_1.postAxiosMethod(this.FINGERPRINT_VERIFICATION_MODULE, "NEWFPTEMPLATE" /* UPDATE_PHONE_FP_TEMPLATE */);
                                    if (this.VERIFICATION_SETTING === "AND") {
                                        if (returnData.status === "registered fingerprint" /* REGISTERED_FINGERPRINT */ &&
                                            payload['fingerprintTemplateMessage'].status === "registered fingerprint" /* REGISTERED_FINGERPRINT */) {
                                            this.primaryFingerprintStatus = {
                                                hqfpstatus: returnData.status,
                                                sitefpstatus: payload['fingerprintTemplateMessage'].fileData.status,
                                                finalstatus: "registered fingerprint" /* REGISTERED_FINGERPRINT */,
                                                uuid: payload['fingerprintTemplateMessage'].fileData.uuid
                                            };
                                        }
                                        else {
                                            this.primaryFingerprintStatus = {
                                                hqfpstatus: returnData.status,
                                                sitefpstatus: payload['fingerprintTemplateMessage'].fileData.status,
                                                finalstatus: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
                                                uuid: payload['fingerprintTemplateMessage'].fileData.uuid
                                            };
                                        }
                                    }
                                    if (this.VERIFICATION_SETTING === "OR") {
                                        if (returnData.status === "registered fingerprint" /* REGISTERED_FINGERPRINT */ ||
                                            payload['fingerprintTemplateMessage'].status === "registered fingerprint" /* REGISTERED_FINGERPRINT */) {
                                            this.primaryFingerprintStatus = {
                                                hqfpstatus: returnData.status,
                                                sitefpstatus: payload['fingerprintTemplateMessage'].fileData.status,
                                                finalstatus: "registered fingerprint" /* REGISTERED_FINGERPRINT */,
                                                uuid: payload['fingerprintTemplateMessage'].fileData.uuid
                                            };
                                        }
                                        else {
                                            this.primaryFingerprintStatus = {
                                                hqfpstatus: returnData.status,
                                                sitefpstatus: payload['fingerprintTemplateMessage'].fileData.status,
                                                finalstatus: "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */,
                                                uuid: payload['fingerprintTemplateMessage'].fileData.uuid
                                            };
                                        }
                                    }
                                    //update authenticationLogExtensionPayload
                                    let authenticationLogExtensionPayload = {
                                        uuid: eventMessage['uuid'],
                                        primaryVerified: this.primaryFingerprintStatus['hqfpstatus'] == 'registered fingerprint' ? true : false,
                                        secondaryVerified: this.primaryFingerprintStatus['sitefpstatus'] == 'registered fingerprint' ? true : false,
                                    };
                                    await this.ZKTFpService.addData("authenticationLogExtension" /* AUTHENTICATION_LOG_EXTENSION */, authenticationLogExtensionPayload);
                                    let message = {
                                        requestId: process.requestId,
                                        eventType: handlers_manager_1.eventTypes.NewFPStored,
                                        message: payload
                                    };
                                    newOutputObservable.next(message);
                                    // }
                                    // else {
                                    //     // this.hqFingerprintStatus = {
                                    //     //     hqfpstatus: returnData.message,
                                    //     //     sitefpstatus: payload['fingerprintTemplateMessage'].fileData.status,
                                    //     //     finalstatus: "NONE",
                                    //     //     uuid: payload['fingerprintTemplateMessage'].fileData.uuid
                                    //     // }
                                    //     throw returnData.message
                                    // }
                                }
                                catch (err) {
                                    throw err;
                                }
                            }
                            else {
                                this.primaryFingerprintStatus = {
                                    hqfpstatus: "NOT AVAILABLE",
                                    sitefpstatus: payload['fingerprintTemplateMessage'].fileData.status,
                                    finalstatus: "NONE",
                                    uuid: payload['fingerprintTemplateMessage'].fileData.uuid
                                };
                                payload['verificationStatus'] = this.primaryFingerprintStatus;
                                //update authenticationLogExtensionPayload
                                if (this.deviceNo != 'NO DEVICE') {
                                    let authenticationLogExtensionPayload = {
                                        uuid: eventMessage['uuid'],
                                        primaryVerified: false,
                                        secondaryVerified: this.primaryFingerprintStatus['sitefpstatus'] == 'registered fingerprint' ? true : false,
                                    };
                                    await this.ZKTFpService.addData("authenticationLogExtension" /* AUTHENTICATION_LOG_EXTENSION */, authenticationLogExtensionPayload);
                                }
                                let message = {
                                    requestId: process.requestId,
                                    eventType: handlers_manager_1.eventTypes.NewFPStored,
                                    message: payload
                                };
                                newOutputObservable.next(message);
                            }
                        }).catch((err) => {
                            throw err;
                        });
                    }
                    catch (err) {
                        let payload = {
                            status: -1 /* ERROR */,
                            message: err
                        };
                        console.error("subscribeForNewFPReceived error is " + JSON.stringify(handlestatusmessage_1.handleResponse(payload)));
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForNewFPStored(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: async (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.NewFPStored) {
                    if (process.message.status === "unregistered fingerprint" /* UNREGISTERED_FINGERPRINT */) {
                        try {
                            await this.ZKTFpService.addData("fingerprintTemplateData" /* FP_TEMPLATE_MSG */, process.message['fingerprintTemplateMessage']);
                            let message = {
                                requestId: process.requestId,
                                eventType: handlers_manager_1.eventTypes.UnregisteredFPReceived,
                                message: process.message
                            };
                            newOutputObservable.next(message);
                        }
                        catch (e) {
                            console.error('subscribeForNewFPStored error is ', e);
                        }
                    }
                    if (process.message.status === "registered fingerprint" /* REGISTERED_FINGERPRINT */) {
                        let message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.RegisteredFPReceived,
                            message: process.message
                        };
                        newOutputObservable.next(message);
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRegisteredFPReceived(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RegisteredFPReceived) {
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
    subscribeForUnregisteredFPReceived(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.UnregisteredFPReceived) {
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
exports.verification_fingerprint_class = verification_fingerprint_class;
//# sourceMappingURL=verification_fingerprint_handler.js.map