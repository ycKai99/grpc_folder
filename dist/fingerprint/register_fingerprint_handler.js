"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register_fingerprint_class = void 0;
//import { staff_profile_type } from "../model/staff_profile";
//import { common_employee_profile_notification_class } from "./common_employee_profile_notification_handler";
//import { add_employee_profile_notification_class } from "./add_employee_profile_notification_handler";
//import { set_employee_profile_notification_class } from "./set_employee_profile_notification_handler";
const https_1 = require("https");
const axios_1 = require("@nestjs/axios");
const fingerprint_handler_1 = require("./fingerprint_handler");
const postmethod_1 = require("./_utility/postmethod");
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const handlestatusmessage_1 = require("./_utility/handlestatusmessage");
const export_1 = require("../_dependencies/DP/src/interface/export");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const dotenv = require("dotenv");
dotenv.config();
class register_fingerprint_class extends fingerprint_handler_1.fingerprint_class {
    constructor() {
        super();
        this.app = "Test Application";
        this.eventMsgData = "";
        this.eventMessageDataRegStat = [];
        // latestDateData;
        this.siteLocation = process.env.LOCATION;
        this.javaServer = process.env.JAVA_SERVER;
        this.FINGER_EDGE_THRESHOLD = process.env.FINGER_EDGE_THRESHOLD;
        this.FINGER_SCORE_THRESHOLD = process.env.FINGER_SCORE_THRESHOLD;
        this.FINGERPRINT_VERIFICATION_MODULE = process.env.FINGERPRINT_VERIFICATION_MODULE;
        this.LOCATION = process.env.LOCATION;
        this.http_config = {
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        };
        const n8n_URL = process.env['n8n_URL'];
        this.n8n_url = n8n_URL;
        this.setZKTFingerprintService();
    }
    async setZKTFingerprintService() {
        this.ZKTFpService = await this.getZKTFingerprintService();
    }
    async getEventMessageData() {
        try {
            await this.ZKTFpService.readData("eventMessage" /* EVENT_MSG */).then((res) => {
                this.eventMessageAllData = res;
            });
        }
        catch (err) {
            throw err;
        }
    }
    async filteredLatestDateEventMessageData() {
        let latestDateData = await this.eventMessageAllData.sort((a, b) => +new Date(b.registeredDate) - +new Date(a.registeredDate))[0];
        if (!this.eventMessageDataRegStat) {
            this.eventMessageDataRegStat.push(latestDateData);
        }
        else {
            let result = this.eventMessageDataRegStat.some(x => x.uuid == latestDateData.uuid);
            if (!result) {
                this.eventMessageDataRegStat.push(latestDateData);
            }
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
    subscribeForRegisterFPReceived(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: async (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RegistrationFPRequested) {
                    let processMsg = JSON.stringify(process.message);
                    let processMessage;
                    // let fingerEdges;
                    // if (!processMsg.includes('VERIFICATION') && !processMsg.includes('REGISTRATION')) {
                    //   processMessage = JSON.parse(process.message);
                    //   fingerEdges = processMessage.fingerEdges;
                    // }
                    let payload;
                    this.isError = undefined;
                    this.deviceNo = this.ZKTFpService.getScannerID();
                    try {
                        // Create new registration event
                        let fileDataPayload = {
                            uuid: new export_1.Uuid().generateId(),
                            registeredDate: new Date(),
                            message: process.message,
                            messageType: "FPEevent",
                            deviceNo: this.deviceNo
                        };
                        let newRegistrationMsg = {
                            uuid: new export_1.Uuid().generateId(),
                            fileName: "eventMessage" /* EVENT_MSG */ + "-" + new export_1.Uuid().generateId(),
                            fileType: "json" /* JSON */,
                            entityName: "eventMessage" /* EVENT_MSG */,
                            fileData: fileDataPayload
                        };
                        await this.ZKTFpService.addData("eventMessage" /* EVENT_MSG */, newRegistrationMsg).then(async (res) => {
                            await this.getEventMessageData();
                        }).then(async (res) => {
                            await this.filteredLatestDateEventMessageData();
                        }).catch((err) => {
                            throw err;
                        });
                    }
                    catch (err) {
                        payload = handlestatusmessage_1.failResponse(err);
                        console.log('Error: ', err);
                    }
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.RegistrationFPStarted,
                        message: payload
                    };
                    newOutputObservable.next(message);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRegistrationFPStarted(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RegistrationFPStarted) {
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.RegistrationFPStarted,
                        message: process.message
                    };
                    newOutputObservable.next(message);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRegisterFPInProgressRequested(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RegistrationFPInProgressRequested) {
                    /*
                      status = 1 is success,
                      status = 0 is nothing happen,
                      status = -1 is error
                    */
                    let status = 1;
                    let data = {};
                    let isDuplicate;
                    let filteredData;
                    let currentObjData;
                    let processMessage;
                    let targetUuid;
                    let selectedUuid;
                    let errorMessage = "";
                    let selectedpersonIdentifier;
                    let changeName = false;
                    let targetFingerPosition;
                    let selectedFingerPosition;
                    let payload;
                    let replaceFingerData = false;
                    let targetFPUuid;
                    let message;
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
                        // status = 1 is success, status = 0 is nothing happen, status = -1 is error
                        let statusCheckEmptyField = 1;
                        let errorMessageCheckEmptyField = "";
                        if (statusCheckEmptyField == 1) {
                            if (!processMessage.orgnName) {
                                statusCheckEmptyField = -1;
                                errorMessageCheckEmptyField += "Organisation must be selected." /* EMPTY_ORGANIZATION_FIELD */;
                            }
                        }
                        if (statusCheckEmptyField == 1) {
                            if (processMessage.personIdentifier.length == 0) {
                                statusCheckEmptyField = -1;
                                errorMessageCheckEmptyField += "Person must be selected." /* EMPTY_PERSON_FIELD */;
                            }
                        }
                        if (statusCheckEmptyField == 1) {
                            if (processMessage.fingerPosition.length == 0) {
                                statusCheckEmptyField = -1;
                                errorMessageCheckEmptyField += "Finger must be selected." /* EMPTY_FINGER_FIELD */;
                            }
                        }
                        if (statusCheckEmptyField == 1) {
                            status = statusCheckEmptyField;
                            errorMessage = errorMessageCheckEmptyField;
                        }
                        else {
                            status = statusCheckEmptyField;
                            errorMessage = errorMessageCheckEmptyField;
                        }
                    }
                    if (status == 1) {
                        // find the target fpUuid
                        if (processMessage.operation && processMessage.operation === 'new') {
                            targetFPUuid = this.eventMessageDataRegStat.filter(x => { if (x.uuid == processMessage.uuid) {
                                return x;
                            } });
                        }
                        else {
                            targetFPUuid = this.eventMessageDataRegStat.filter(x => { if (x.uuid == processMessage.uuid) {
                                return x;
                            } });
                        }
                    }
                    if (status == 1) {
                        if (!targetFPUuid) {
                            status = -1;
                            errorMessage = "Error in finding target fpuuid.";
                            console.log(errorMessage);
                        }
                    }
                    if (status == 1) {
                        if (targetFPUuid[0]) { }
                        else {
                            status = -1;
                            errorMessage = "Error in empty target fpuuid array.";
                            console.log(errorMessage);
                        }
                    }
                    if (status == 1) {
                        if (targetFPUuid[0]['fpUuid']) { }
                        else {
                            status = -1;
                            errorMessage = "Please scan your finger." /* SCAN_FINGER_REQUIRED */;
                            console.log(errorMessage);
                        }
                    }
                    if (status == 1) {
                        // find the fingerPosition index
                        targetFingerPosition = (processMessage.fingerCodes.findIndex(x => x == processMessage.fingerPosition) + 1);
                    }
                    if (status == 1) {
                        // assign the index to data['position']
                        if (targetFingerPosition == -1) {
                            status = -1;
                            errorMessage = "Finger selected not found in finger dictionary.";
                            console.log(errorMessage);
                        }
                    }
                    if (status == 1) {
                        // assign value to data 
                        data['position'] = targetFingerPosition;
                        data['uuid'] = processMessage.uuid;
                        data['fpUuid'] = targetFPUuid[0]['fpUuid'];
                        data['fpTemplate'] = '';
                        data['personIdentifier'] = processMessage.personIdentifier;
                        data['operation'] = processMessage.operation || '';
                        selectedpersonIdentifier = processMessage.personIdentifier;
                        // selectedFingerPosition = processMessage.fingerCodes;
                        // selectedUuid = processMessage.uuid;
                    }
                    if (status == 1) {
                        currentObjData = processMessage.eventMsgData ? JSON.parse(processMessage.eventMsgData) : [];
                    }
                    if (status == 1) {
                        targetUuid = currentObjData.filter(x => {
                            if (x.uuid == processMessage.uuid) {
                                return x;
                            }
                        });
                    }
                    if (status == 1) {
                        // Check is repeated info???
                        if (targetUuid.length <= 0) {
                            currentObjData.push(data);
                        }
                    }
                    // check the change of person code
                    // if (status == 1) {
                    //   for (let i = 0; i < currentObjData.length; i++) {
                    //     if (currentObjData[i].personIdentifier != selectedpersonIdentifier) {
                    //       changeName = true;
                    //     }
                    //   };
                    // }
                    // if (status == 1) {
                    //   if (changeName) {
                    //     status = -1;
                    //     errorMessage = RESPONSE_MESSAGE.SELECTED_CHANGED;
                    //   }
                    // }
                    //check the same finger scan for the same finger position after set finger
                    // if (status == 1) {
                    //   // if (currentObjData.length == 1 && currentObjData[0].position == targetFingerPosition && currentObjData[0].uuid == processMessage.uuid && currentObjData[0].fpUuid == targetFPUuid[0]['fpUuid']) {
                    //   //   console.log('same finger position found and same finger scan detected.');
                    //   //   replaceFingerData = false;
                    //   // }
                    //   // else {
                    //   filteredData = currentObjData.reduce((fpData, current) => {
                    //     isDuplicate = fpData.findIndex(item => item.position === current.position);
                    //     if (processMessage.settingFpScore > this.FINGER_SCORE_THRESHOLD && isDuplicate != -1) {
                    //       // console.log('same finger position found and same finger scan detected.');
                    //       fpData[isDuplicate] = current;
                    //       replaceFingerData = false;
                    //     }
                    //     else {
                    //       isDuplicate = -1;
                    //       fpData.push(current);
                    //       replaceFingerData = true;
                    //     }
                    //     return fpData;
                    //   }, []);
                    //   currentObjData = filteredData;
                    //   // }
                    // }
                    // check the finger edges
                    if (status == 1) {
                        if (processMessage.fingerEdges < this.FINGER_EDGE_THRESHOLD) {
                            status = -1;
                            errorMessage = "Bad fingerprint, Please try again" /* INVALID_FINGER_EDGES */;
                        }
                    }
                    // check the finger score
                    // if (status == 1) {
                    //   if (processMessage.fingerScore > this.FINGER_SCORE_THRESHOLD) {
                    //     status = -1;
                    //     errorMessage = RESPONSE_MESSAGE.INVALID_FINGER_SCORE;
                    //   }
                    // }
                    //check the situation of registered fingerprint registered again by different person
                    if (status == 1) {
                        if ((selectedpersonIdentifier != processMessage.registeredpersonIdentifier && processMessage.fingerScore > this.FINGER_SCORE_THRESHOLD)) {
                            status = -1;
                            errorMessage = "Fingerprint already registered." /* INVALID_FINGER_SCORE */;
                            console.log('wrong person register again other person finger');
                        }
                    }
                    // check the situation of registered fingerprint registered again by same person
                    if (status == 1) {
                        if (selectedpersonIdentifier == processMessage.registeredpersonIdentifier && processMessage.fingerPosition != processMessage.registeredFingerPosition) {
                            status = -1;
                            errorMessage = 'Fingerprint position not same with registered fingerprint';
                            console.log('same person register different fingerprint position');
                        }
                    }
                    // check the finger score compare to setting finger
                    // if (status == 1) {
                    //   if ((processMessage.settingFpScore > this.FINGER_SCORE_THRESHOLD || processMessage.settingFpScore > 50)) {
                    //     status = -1;
                    //     errorMessage = RESPONSE_MESSAGE.SETTING_SAME_FINGER;
                    //   }
                    // }
                    // check the person code for the score > 100
                    // if (status == 1) {
                    //   if (processMessage.registeredpersonIdentifier == processMessage.personIdentifier || processMessage.fingerScore > this.FINGER_SCORE_THRESHOLD) {
                    //     status = -1;
                    //     errorMessage = 'This fingerprint already registered by ' + processMessage.registeredpersonIdentifier;
                    //   }
                    // }
                    if (status == 1) {
                        // Success
                        payload = handlestatusmessage_1.successResponse("SET FINGER SUCCESSFUL." /* SET_FINGER_SUCCESS */);
                        message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.RegistrationFPInProgress,
                            message: JSON.stringify(payload) + JSON.stringify(currentObjData)
                        };
                        newOutputObservable.next(message);
                    }
                    else {
                        // Error
                        payload = handlestatusmessage_1.failResponse(errorMessage);
                        message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.RegistrationFPInProgress,
                            message: payload
                        };
                        newOutputObservable.next(message);
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRegisterFPInProgress(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RegistrationFPInProgress) {
                    this.eventMsgData = JSON.stringify(process.message);
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.RegistrationFPInProgress,
                        message: this.eventMsgData
                    };
                    newOutputObservable.next(message);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRegisteredFPCompletedRequested(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: async (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RegistrationFPCompletedRequested) {
                    /*
                      status = 1 is success,
                      status = 0 is nothing happen,
                      status = -1 is error
                    */
                    let status = 1;
                    let objData;
                    let errorMessage = "";
                    let payload;
                    let fpData;
                    let message;
                    let previousData;
                    let fpTemplateData;
                    let objData1;
                    let operationStatus = "";
                    let targetFpPosition;
                    if (status == 1) {
                        try {
                            await this.ZKTFpService.readFingerprintTemplateData();
                        }
                        catch (e) {
                            status = -1;
                            errorMessage = "Error in read fingerprint template data failed.";
                        }
                    }
                    if (status == 1) {
                        objData = JSON.parse(process.message);
                        objData1 = JSON.parse(process.message);
                    }
                    if (status == 1) {
                        fpTemplateData = this.ZKTFpService.getFingerprintTemplateData();
                        // check the eventMsgData
                        if (objData.eventMsgData) {
                            objData = JSON.parse(objData.eventMsgData);
                            if (objData) {
                                targetFpPosition = (objData1.fingerCodes.findIndex(x => x == objData1.fingerPosition) + 1);
                                for (let x of objData) {
                                    if (x.position == targetFpPosition) {
                                        // console.log('fptemplatedata length: ', fpTemplateData.length)
                                        if (fpTemplateData.length != 0) {
                                            previousData = fpTemplateData.filter((z) => { if (z.position == x.position && z.personIdentifier == x.personIdentifier) {
                                                return x;
                                            } });
                                            // console.log('previous data found...', previousData)
                                            if (previousData.length == 0) {
                                                // console.log('no matching previous data...')
                                                operationStatus = objData1.operation;
                                                fpTemplateData = [
                                                    {
                                                        uuid: x.uuid,
                                                        fpUuid: x.fpUuid,
                                                        fpTemplate: objData1.fingerprintrawdata1,
                                                        registeredDate: new Date(),
                                                        status: "registered fingerprint" /* REGISTERED_FINGERPRINT */,
                                                        location: this.LOCATION,
                                                        personIdentifier: objData1.personIdentifier,
                                                        position: x.position,
                                                        masterfp: true
                                                    }
                                                ];
                                            }
                                        }
                                        else {
                                            // console.log('no data found...')
                                            operationStatus = objData1.operation;
                                            fpTemplateData = [
                                                {
                                                    uuid: x.uuid,
                                                    fpUuid: x.fpUuid,
                                                    fpTemplate: objData1.fingerprintrawdata1,
                                                    registeredDate: new Date(),
                                                    status: "registered fingerprint" /* REGISTERED_FINGERPRINT */,
                                                    location: this.LOCATION,
                                                    personIdentifier: objData1.personIdentifier,
                                                    position: x.position,
                                                    masterfp: true
                                                }
                                            ];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (status == 1) {
                        if (!fpTemplateData) {
                            status = -1;
                            errorMessage = "Error in empty fingerprint template data.";
                        }
                    }
                    if (status == 1) {
                        if (!objData) {
                            status = -1;
                            errorMessage = "Error in empty obj data.";
                        }
                    }
                    if (status == 1) {
                        for (let x of objData) {
                            /*
                              statusCheckObjData = 1 is success,
                              statusCheckObjData = 0 is nothing happen,
                              statusCheckObjData = -1 is error
                            */
                            let statusCheckObjData = 1;
                            let eventDataPayload;
                            let locationTagPayload;
                            let fpMsg;
                            let errorMessageCheckObjData = "";
                            if (statusCheckObjData == 1) {
                                if (!operationStatus) {
                                    previousData = fpTemplateData.filter((z) => { if (z.position == x.position && z.personIdentifier == x.personIdentifier) {
                                        return x;
                                    } });
                                }
                                else {
                                    previousData = [];
                                }
                            }
                            // if (statusCheckObjData == 1) {
                            //   if (!previousData) {
                            //     // statusCheckObjData = -1;
                            //     // errorMessageCheckObjData = 'Error in empty previous data';
                            //   }
                            // }
                            if (statusCheckObjData == 1) {
                                fpData = fpTemplateData.filter((z) => { if (z.fpUuid === x.fpUuid) {
                                    return z;
                                } });
                            }
                            if (statusCheckObjData == 1) {
                                if (!fpData) {
                                    statusCheckObjData = -1;
                                    errorMessageCheckObjData = 'Error in empty fpData';
                                }
                            }
                            if (statusCheckObjData == 1) {
                                if (fpData.length == 0) {
                                    statusCheckObjData = -1;
                                    errorMessageCheckObjData = `Register fingerprint error : found no fingerprint in database`;
                                }
                            }
                            if (statusCheckObjData == 1) {
                                if (previousData.length > 0) {
                                    /*
                                      statucCheckPreviousData = 1 is success,
                                      statucCheckPreviousData = 0 is nothing happen,
                                      statucCheckPreviousData = -1 is error
                                    */
                                    let statucCheckPreviousData = 1;
                                    let prevMsg;
                                    let errorMessagePreviousData = "";
                                    for (let y of previousData) {
                                        if (statucCheckPreviousData == 1) {
                                            prevMsg = {
                                                uuid: y.uuid,
                                                fpUuid: y.fpUuid,
                                                fpTemplate: y.fpTemplate,
                                                registeredDate: new Date(),
                                                status: y.status,
                                                location: y.location,
                                                personIdentifier: y.personIdentifier,
                                                position: y.position,
                                                masterfp: false
                                            };
                                            this.fpTemplate = y.fpTemplate;
                                        }
                                        if (statucCheckPreviousData == 1) {
                                            // console.log('add previous data: ', prevMsg)
                                            await this.ZKTFpService.updateData("fingerprintTemplateData" /* FP_TEMPLATE_MSG */, prevMsg);
                                        }
                                        if (statucCheckPreviousData == 1) {
                                            statusCheckObjData = statucCheckPreviousData;
                                            errorMessageCheckObjData = errorMessagePreviousData;
                                        }
                                        else {
                                            statusCheckObjData = statucCheckPreviousData;
                                            errorMessageCheckObjData = errorMessagePreviousData;
                                        }
                                    }
                                }
                            }
                            if (statusCheckObjData == 1) {
                                fpMsg = {
                                    uuid: fpData[0].uuid,
                                    fpUuid: fpData[0].fpUuid,
                                    fpTemplate: fpData[0].fpTemplate,
                                    registeredDate: new Date(),
                                    status: "registered fingerprint" /* REGISTERED_FINGERPRINT */,
                                    location: fpData[0].location,
                                    personIdentifier: x.personIdentifier,
                                    position: x.position,
                                    masterfp: true
                                };
                                this.fpTemplate = fpData[0].fpTemplate;
                            }
                            if (statusCheckObjData == 1) {
                                eventDataPayload = {
                                    uuid: new export_1.Uuid().generateId(),
                                    fileName: "eventMessage" /* EVENT_MSG */ + "-" + new export_1.Uuid().generateId(),
                                    fileType: "json" /* JSON */,
                                    entityName: "eventMessage" /* EVENT_MSG */,
                                    fileData: {
                                        uuid: new export_1.Uuid().generateId(),
                                        fpUuid: x.fpUuid,
                                        registeredDate: new Date(),
                                        message: "registered fingerprint" /* REGISTERED_FINGERPRINT */,
                                        messageType: "FPEvent",
                                        deviceNo: this.ZKTFpService.getScannerID()
                                    }
                                };
                            }
                            if (statusCheckObjData == 1) {
                                locationTagPayload = {
                                    uuid: new export_1.Uuid().generateId(),
                                    fileName: "locationTag" /* LOCATION_TAG */ + "-" + new export_1.Uuid().generateId(),
                                    fileType: "json" /* JSON */,
                                    entityName: "locationTag" /* LOCATION_TAG */,
                                    fileData: {
                                        uuid: new export_1.Uuid().generateId(),
                                        fpUuid: (fpData[0].fpUuid).toString(),
                                        location: this.siteLocation
                                    }
                                };
                            }
                            if (statusCheckObjData == 1) {
                                if (operationStatus === 'new') {
                                    // console.log('add new data')
                                    await this.ZKTFpService.addData("fingerprintTemplateData" /* FP_TEMPLATE_MSG */, fpMsg);
                                }
                                else {
                                    // console.log('update current data: ', fpMsg)
                                    await this.ZKTFpService.updateData("fingerprintTemplateData" /* FP_TEMPLATE_MSG */, fpMsg);
                                }
                            }
                            if (statusCheckObjData == 1) {
                                await this.ZKTFpService.addData("eventMessage" /* EVENT_MSG */, eventDataPayload);
                            }
                            if (statusCheckObjData == 1) {
                                await this.ZKTFpService.addLocationTag("locationTag" /* LOCATION_TAG */, locationTagPayload);
                            }
                            // exit
                            if (statusCheckObjData == 1) {
                                status = statusCheckObjData;
                                errorMessage = errorMessageCheckObjData;
                            }
                            else {
                                status = statusCheckObjData;
                                errorMessage = errorMessageCheckObjData;
                            }
                        }
                    }
                    if (status == 1) {
                        //Success
                        payload = {
                            status: 1 /* SUCCESS */,
                            message: "Registered successful." /* FP_SUCCESS_REGISTER */
                        };
                        message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.RegistrationFPCompleted,
                            message: JSON.stringify(payload) + process.message
                        };
                        postmethod_1.postAxiosMethod(this.FINGERPRINT_VERIFICATION_MODULE, "NEWFPTEMPLATE" /* UPDATE_PHONE_FP_TEMPLATE */); // notify java to get latest fingerprint template
                        newOutputObservable.next(message);
                    }
                    else {
                        //Error
                        payload = {
                            status: -1 /* ERROR */,
                            message: errorMessage
                        };
                        message = {
                            requestId: process.requestId,
                            eventType: handlers_manager_1.eventTypes.RegistrationFPCompleted,
                            message: payload
                        };
                        newOutputObservable.next(message);
                    }
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRegisteredFPCompleted(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: async (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RegistrationFPCompleted) {
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.RegistrationFPCompleted,
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
                    //    console.log("REGISTRATION : ProcessingCompleted Detected..")
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
exports.register_fingerprint_class = register_fingerprint_class;
//# sourceMappingURL=register_fingerprint_handler.js.map