"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remote_fingerprint_synchronization_class = void 0;
const observer_application_1 = require("./../observer.application");
const base_notification_handler_1 = require("../base/base_notification_handler");
const rxjs_1 = require("rxjs");
const handlers_manager_1 = require("../handlers_manager");
const axios_1 = require("@nestjs/axios");
const https_1 = require("https");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const export_1 = require("../_dependencies/DP/src/interface/export");
const postmethod_1 = require("../fingerprint/_utility/postmethod");
const findPersonInPersonDataSet_1 = require("../fingerprint/_utility/findPersonInPersonDataSet");
const dotenv = require("dotenv");
dotenv.config();
class remote_fingerprint_synchronization_class extends base_notification_handler_1.base_notification_handler_class {
    constructor() {
        super();
        this.app = 'Synchronize fingerprint application';
        this.http_config = { httpsAgent: new https_1.Agent({ rejectUnauthorized: false, }), };
        this.localhost = process.env.localhost;
        const n8n_URL = process.env['n8n_URL'];
        this.n8n_url = n8n_URL;
    }
    // Override for fixing socket connection issue
    async send_message(handler_id, steps_id) {
        let promise; //:Promise<ResponseMessage|FisResponseMessage>;
        for (let ind = 0; ind < this.handlers[handler_id].steps[steps_id].request.length; ind++) {
            promise = new Promise((resolve, reject) => {
                let sub = new axios_1.HttpService()
                    .post(DP_config_1.URLs.NESTWS + '/request', this.MessageService.getDPmessage(this.handlers[handler_id].steps[steps_id].request[ind]), this.http_config) // here is Observable<AxiosResponse>
                    .pipe(rxjs_1.map((resp) => {
                    return resp['data'][0];
                }))
                    .subscribe({
                    next: (msg) => {
                        resolve(msg);
                        sub.unsubscribe(); // stop
                        return;
                    },
                    error: (err) => {
                        // Start ConnectionError Subscription
                        let connectionError = {
                            requestId: 'Start_' + new export_1.Uuid().generateId(),
                            eventType: handlers_manager_1.eventTypes.ConnectionError,
                            message: this.getDomainProxy()
                                .getMessageService()
                                .getNotificationMessage('Internal', 'Connection Error.' + err.message || ''),
                        };
                        //console.log("New Notification Connection Error!")
                        this.errorSinkObservable.next(connectionError);
                    },
                });
            });
        }
        return promise;
    }
    publishForRemoteFingerprintSynchronizationRequested(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        let newSub = inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.Start &&
                    this.restart_count == 0 &&
                    this.checkIsCurrentObject(process.message)) {
                    // Reset
                    this.resetLiveSubscription();
                    this.attemptToLogout(this.previous_UCP_Id);
                    this.attemptToLogout(this.UCP_Id);
                    this.restart_count = this.restart_count + 1;
                    this.maintainConnection();
                    let DP_FingerprintNotification = this.getDomainProxy();
                    let currentUCPId = '';
                    let appname = this.app;
                    const msg = DP_FingerprintNotification.getMessageService().getLoginMessage();
                    let newSub = DP_FingerprintNotification.send(appname, msg).subscribe({
                        next: (response_msg) => {
                            if (response_msg.data &&
                                response_msg.data['StatusException'] &&
                                response_msg.data['StatusException']['status'] &&
                                response_msg.data['StatusException']['status'] == '-1') {
                                // Start the server's subscription
                                let connectionError = {
                                    requestId: 'Start_' + new export_1.Uuid().generateId(),
                                    eventType: handlers_manager_1.eventTypes.ConnectionError,
                                    message: this.getDomainProxy().getMessageService().getNotificationMessage('Internal', 'Connection Error.' || ''),
                                };
                                this.errorSinkObservable.next(connectionError);
                            }
                            if (response_msg.data && response_msg.data['ServerUCP'] && response_msg.data['ServerUCP']['ucpId']) {
                                currentUCPId = response_msg.data['ServerUCP']['ucpId'];
                                this.UCP_Id = currentUCPId;
                            }
                            if (currentUCPId) {
                                let msg = DP_FingerprintNotification.getMessageService().getSubscribeNotifMessage(currentUCPId, 'notification');
                                let newSub = DP_FingerprintNotification.subscribe(appname, msg).subscribe({
                                    next: async (responseMsg) => {
                                        this.maintainConnection();
                                        // Check if it is fingerprint notification
                                        if (responseMsg.data) {
                                            if (responseMsg['data']['data'] &&
                                                responseMsg['data']['data']['NotificationMicroserviceData'] &&
                                                responseMsg['data']['data']['NotificationMicroserviceData']['uiMessage'] &&
                                                responseMsg['data']['data']['NotificationMicroserviceData']['uiMessage']['FingerprintData']) {
                                                // Get the fingerprintData notified
                                                let fingerprintData = responseMsg['data']['data']['NotificationMicroserviceData']['uiMessage']['FingerprintData'];
                                                if (fingerprintData.submitedRequest) {
                                                    //retrieve database name and current personFullData
                                                    let identifier = await observer_application_1.application.processManager.FisHandler_set['retrieve_person_for_fingerprint']['identifier'];
                                                    let personFullData = await observer_application_1.application.processManager.FisHandler_set['retrieve_person_for_fingerprint']['personData'][identifier];
                                                    let currentDatabaseName = {};
                                                    if (await observer_application_1.application.processManager.FisHandler_set['retrieve_person_for_fingerprint']) {
                                                        currentDatabaseName = await observer_application_1.application.processManager.FisHandler_set['retrieve_person_for_fingerprint']['databaseNameData'];
                                                    }
                                                    // use to check the current database name value
                                                    const isObjectEmpty = (objectName) => {
                                                        return Object.keys(objectName).length === 0;
                                                    };
                                                    if (!isObjectEmpty(currentDatabaseName) && identifier && personFullData) {
                                                        if (currentDatabaseName[identifier].databaseName && currentDatabaseName[identifier].databaseName === 'unknown') { }
                                                        else {
                                                            if (fingerprintData.database.databaseName !== currentDatabaseName[identifier].databaseName) {
                                                                // Find matching personData in personFullData
                                                                let personToIdentify = fingerprintData.personData[0];
                                                                let personData = findPersonInPersonDataSet_1.findPersonInPersonDataSet(personFullData, personToIdentify);
                                                                fingerprintData.submitedRequest.personIdentifier = personData[0].pers_code;
                                                                await postmethod_1.postAxiosMethod(this.localhost + '/observer/fingerprintRegistrationPage', fingerprintData.submitedRequest);
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        console.log('Cannot get current database name...');
                                                    }
                                                }
                                                let message = {
                                                    requestId: new export_1.Uuid().generateId(),
                                                    eventType: handlers_manager_1.eventTypes.RemoteFingerprintSynchronizationProcess,
                                                    message: msg,
                                                };
                                                newOutputObservable.next(message);
                                            }
                                        }
                                    },
                                    error: (err) => {
                                        let message = err.message || err;
                                        console.error('[Remote_fingerprint_synchronization]Something wrong occurred: ' + message);
                                        // Start the server's subscription
                                        let connectionError = {
                                            requestId: 'Start_' + new export_1.Uuid().generateId(),
                                            eventType: handlers_manager_1.eventTypes.ConnectionError,
                                            message: this.getDomainProxy().getMessageService().getNotificationMessage('Internal', 'Connection Error.' + err.message || ''),
                                        };
                                        this.errorSinkObservable.next(connectionError);
                                    },
                                    complete() {
                                        console.log('[Remote_fingerprint_synchronization ]Done observable 2.');
                                    },
                                });
                                this.liveSubsription.push(newSub);
                            }
                        },
                        error: (err) => {
                            console.error('[Remote_fingerprint_synchronization ]Something wrong occurred: ' + err.message);
                            // Start the server's subscription
                            let connectionError = {
                                requestId: 'Start_' + new export_1.Uuid().generateId(),
                                eventType: handlers_manager_1.eventTypes.ConnectionError,
                                message: this.getDomainProxy().getMessageService().getNotificationMessage('Internal', 'Connection Error.' + err.message || ''),
                            };
                            this.errorSinkObservable.next(connectionError);
                        },
                        complete() { },
                    });
                    this.liveSubsription.push(newSub);
                }
            },
        });
        return newOutputObservable;
    }
    subscribeForSynchronizationNextFingerprintStarted(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RemoteFingerprintSynchronizationProcess) {
                    let nextMessage;
                    nextMessage = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.RemoteFingerprintSynchronizationComplete,
                        message: process.message,
                    };
                    newOutputObservable.next(nextMessage);
                }
            },
        });
        return newOutputObservable;
    }
    subscribeForProcessingCompleted(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.RemoteFingerprintSynchronizationComplete) {
                    // Complete
                    let message = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.RemoteFingerprintSynchronizationComplete,
                        message: process.message,
                    };
                    newOutputObservable.next(message);
                }
            },
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
            },
        });
        return newOutputObservable;
    }
}
exports.remote_fingerprint_synchronization_class = remote_fingerprint_synchronization_class;
//# sourceMappingURL=remote_fingerprint_synchronization_handler.js.map