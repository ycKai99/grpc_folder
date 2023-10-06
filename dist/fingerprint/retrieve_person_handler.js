"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieve_person_for_fingerprint_class = void 0;
//import { staff_profile_type } from "../model/staff_profile";
//import { common_employee_profile_notification_class } from "./common_employee_profile_notification_handler";
//import { add_employee_profile_notification_class } from "./add_employee_profile_notification_handler";
//import { set_employee_profile_notification_class } from "./set_employee_profile_notification_handler";
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const axios_1 = require("@nestjs/axios");
const https_1 = require("https");
const fingerprint_handler_1 = require("./fingerprint_handler");
const app_zkt_fingerprint_service_1 = require("./_utility/app.zkt_fingerprint.service");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const export_1 = require("../_dependencies/DP/src/interface/export");
const filterPersonDataByOU_1 = require("../fingerprint/_utility/filterPersonDataByOU");
class retrieve_person_for_fingerprint_class extends fingerprint_handler_1.fingerprint_class {
    constructor() {
        super();
        this.app = "Test Application";
        this.personData = {};
        this.accessibleOrgnData = {};
        this.accessibleServiceProgramData = {};
        this.userData = {};
        this.databaseNameData = {};
        this.http_config = {
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        };
        this.ZKTFpService = new app_zkt_fingerprint_service_1.ZKTFingerprintService();
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
    getRecords(identifier) {
        return {
            'personData': this.personData[identifier],
            'accessibleOrgnData': this.accessibleOrgnData[identifier],
            'accessibleServiceProgramData': this.accessibleServiceProgramData[identifier],
            'userData': this.userData[identifier],
            'databaseName': this.databaseNameData[identifier]
        };
    }
    publishForReceivePersonRequested(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        let newSub = inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.ReceivePersonRequested) {
                    // Q drive secondary
                    this.UCP_Id = process.message.UcpId;
                    // this.UCP_Id = 't9tned6316';
                    console.log("Current UCP ID is : " + this.UCP_Id);
                    // Start the server's subscription
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.RetrievedOrganisationInfo,
                        // message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." || "")
                        message: process.message.UcpId
                    };
                    //console.log("Leave Notification Login Exception Error!")
                    newOutputObservable.next(message);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRetrievedOrganisationInfo(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RetrievedOrganisationInfo) {
                    // Retrieve service program data
                    console.log("Retrieving service program data...");
                    // let msg = this.getDomainProxy().getMessageService().getQueryMessage_ext(this.UCP_Id, Query.GetData, "FIS App", {});
                    let getUserCodeMsg = this.getDomainProxy().getMessageService().getQueryMessage_ext(this.UCP_Id, "GetUser", "FIS App", {});
                    this.getDomainProxy().send(this.app, getUserCodeMsg).subscribe({
                        next: function (response) {
                            // this.userData = [];
                            if (!response.data)
                                console.log("Error:Cannot get response");
                            else {
                                let currentUserData = response.data['GenericData']['data'];
                                // let msg = this.getDomainProxy().getMessageService().getQueryMessage_ext(this.UCP_Id, Query.GetData, "Fis Service Program Data", { "parameter": "userCode=" + this.userData.code });
                                let msg = this.getDomainProxy().getMessageService().getQueryMessage_ext(this.UCP_Id, "GetFisServiceProgram", "FIS App", {});
                                this.getDomainProxy().send(this.app, msg).subscribe({
                                    next: function (response) {
                                        if (!response.data)
                                            console.log("Error:Cannot get response");
                                        else {
                                            try {
                                                // this.accessibleServiceProgramData = []
                                                // let retrievedRows = response.data['GenericFisData'].data.ServiceProgramProfileSecurityAccessRightData.rows.row
                                                let retrievedRows = response.data['GenericData'].data.data;
                                                this.userData[currentUserData.code] = currentUserData;
                                                this.identifier = currentUserData.code;
                                                process.message = {
                                                    ucpid: process.message,
                                                    identifier: this.userData[currentUserData.code].code
                                                };
                                                console.log('Current Login User: ', this.userData[currentUserData.code].code);
                                                this.accessibleServiceProgramData[process.message.identifier] = [];
                                                for (let ind = 0; ind < retrievedRows.length; ind++) {
                                                    // this.accessibleServiceProgramData.push(retrievedRows[ind].column);
                                                    if (retrievedRows[ind].servicePorgram) {
                                                        retrievedRows[ind]['serviceProgram'] = retrievedRows[ind]['servicePorgram'];
                                                        delete retrievedRows[ind]['servicePorgram'];
                                                    }
                                                    if (retrievedRows[ind].asccessRight) {
                                                        retrievedRows[ind]['accessRight'] = retrievedRows[ind]['asccessRight'];
                                                        delete retrievedRows[ind]['asccessRight'];
                                                    }
                                                    this.accessibleServiceProgramData[process.message.identifier].push(retrievedRows[ind]);
                                                }
                                                console.log("Retrieved service program data total : ", this.accessibleServiceProgramData[process.message.identifier].length);
                                                let msg = this.getDomainProxy().getMessageService().getQueryMessage_ext(this.UCP_Id, export_1.Query.GetData, "Get Database Name", { "serviceId": "Get Database Name" });
                                                this.getDomainProxy().send(this.app, msg).subscribe({
                                                    next: function (response) {
                                                        if (!response.data)
                                                            console.log("Error:Cannot get response");
                                                        else {
                                                            try {
                                                                this.databaseNameData[process.message.identifier] = "unknown";
                                                                this.databaseNameData[process.message.identifier] = {
                                                                    databaseName: 'unknown'
                                                                };
                                                                if (response.data['GenericData']) {
                                                                    this.databaseNameData[process.message.identifier] = response.data['GenericData'].data;
                                                                }
                                                                // this.setDatabaseName(this.databaseNameData[process.message.identifier]);
                                                                console.log("Current Database Name : ", this.databaseNameData[process.message.identifier].databaseName);
                                                                let message = {
                                                                    requestId: process.requestId,
                                                                    eventType: handlers_manager_1.eventTypes.LoginCompleted,
                                                                    message: process.message
                                                                };
                                                                newOutputObservable.next(message);
                                                            }
                                                            catch (err) {
                                                                throw err;
                                                            }
                                                        }
                                                    }.bind(this),
                                                    error: function (err) {
                                                        console.log("ERROR on retrieving person info : ", err);
                                                    }
                                                });
                                            }
                                            catch (err) {
                                                console.log("ERROR : Retrieving data : ", err);
                                                let message = {
                                                    requestId: process.requestId,
                                                    eventType: handlers_manager_1.eventTypes.ProcessingError,
                                                    message: process.message
                                                };
                                                newOutputObservable.next(message);
                                            }
                                        }
                                    }.bind(this)
                                });
                            }
                        }.bind(this)
                    });
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForLoginCompleted(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.LoginCompleted) {
                    // Retrieve person info
                    console.log("Retrieving person info...");
                    let msg = this.getDomainProxy().getMessageService().getQueryMessage_ext(this.UCP_Id, export_1.Query.GetData, "Employee Profile Data", {});
                    this.getDomainProxy().send(this.app, msg).subscribe({
                        next: function (response) {
                            if (!response.data)
                                console.log("Error:Cannot get response");
                            else {
                                try {
                                    // this.personData = []
                                    let retrievedRows = response.data['GenericFisData'].data.DataService.rows.row;
                                    this.personData[process.message.identifier] = [];
                                    for (let ind = 0; ind < retrievedRows.length; ind++) {
                                        retrievedRows[ind].column["personIdentifier"] = this.databaseNameData[process.message.identifier]["databaseName"] + "-" + retrievedRows[ind].column["pers_id"];
                                        this.personData[process.message.identifier].push(retrievedRows[ind].column);
                                    }
                                    console.log("Retrieved employee total : ", this.personData[process.message.identifier].length);
                                    let message = {
                                        requestId: process.requestId,
                                        eventType: handlers_manager_1.eventTypes.RetrievedPersonInfo,
                                        message: process.message
                                    };
                                    newOutputObservable.next(message);
                                }
                                catch (err) {
                                    console.log(err.message);
                                }
                            }
                        }.bind(this),
                        error: function (err) {
                            console.log("ERROR on retrieving person info : ", err);
                        }
                    });
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRetrievedPersonInfo(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RetrievedPersonInfo) {
                    // Retrieve person info
                    console.log("Retrieving organisation profile data...");
                    let msg = this.getDomainProxy().getMessageService().getQueryMessage_ext(this.UCP_Id, export_1.Query.GetData, "Organisation Profile Data", {});
                    this.getDomainProxy().send(this.app, msg).subscribe({
                        next: function (response) {
                            if (!response.data)
                                console.log("Error:Cannot get response");
                            else {
                                try {
                                    // this.accessibleOrgnData = []
                                    let retrievedRows = response.data['GenericFisData'].data.DataService.rows.row;
                                    this.accessibleOrgnData[process.message.identifier] = [];
                                    for (let ind = 0; ind < retrievedRows.length; ind++) {
                                        this.accessibleOrgnData[process.message.identifier].push(retrievedRows[ind].column);
                                    }
                                    // Filter person record
                                    this.personData[process.message.identifier] = filterPersonDataByOU_1.filterPersonDataByOU(this.personData[process.message.identifier], this.accessibleOrgnData[process.message.identifier]);
                                    console.log("Retrieved organisation profile total : ", this.accessibleOrgnData[process.message.identifier].length);
                                    console.log("Filter person record total : ", this.personData[process.message.identifier].length);
                                    let message = {
                                        requestId: process.requestId,
                                        eventType: handlers_manager_1.eventTypes.RetrievedServiceProgramData,
                                        message: process.message
                                    };
                                    newOutputObservable.next(message);
                                }
                                catch (err) {
                                    console.log(err.message);
                                }
                            }
                        }.bind(this)
                    });
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForRetrievedServiceProgramData(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RetrievedServiceProgramData) {
                    console.log("Processing...");
                    const msg = this.getDomainProxy().getMessageService().getLogoutMessage(this.UCP_Id);
                    let newSub = this.getDomainProxy().send(this.app, msg);
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
                    //...   
                    console.log("ProcessingCompleted Detected..");
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
                    console.log("PROCESSING ERROR");
                    // Nothing happen.
                }
            }
        });
        return newOutputObservable;
    }
    getDatabaseName() {
        return this.databaseNameData;
    }
    setDatabaseName(databaseName) {
        this.databaseNameData = databaseName;
    }
}
exports.retrieve_person_for_fingerprint_class = retrieve_person_for_fingerprint_class;
//# sourceMappingURL=retrieve_person_handler.js.map