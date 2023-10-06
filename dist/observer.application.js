"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = exports.ObserverApplication = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
const common_1 = require("@nestjs/common");
const export_1 = require("./_dependencies/DP/src/interface/export");
const DP_controller_1 = require("./_dependencies/DP/src/services/DP.controller");
const rxjs_1 = require("rxjs");
const export_2 = require("./_dependencies/messageLog/interface/export");
const handlers_manager_1 = require("./handlers_manager");
const message_auditor_service_1 = require("./_dependencies/Audit/services/message-auditor.service");
require('dotenv').config();
let ObserverApplication = class ObserverApplication {
    constructor(DPC, messageAuditService) {
        this.DPC = DPC;
        this.messageAuditService = messageAuditService;
        this.TurnOffFingerprintApp = process.env.TurnOffFingerprintApp || '';
        // Subject that listens to incoming trigger for activating synchronization
        this.synchronizationTrigger = new rxjs_1.Subject();
        // Declare application Name for enabling DP calls
        this.ApplicationName = "Observer Application";
        // Subject to subscribe to notification messages from designated UCP sercer
        this.notificationMessage = new rxjs_1.Subject();
        // Delcare Logging Service instance to be used to log notification messages
        this.messageLogingservice = new export_2.LoggingService();
        // Currently add the type any until the dependencies are updated to the latest versions.
        // This will emit error because the LogSetting from the dependencies is still the old version which does
        // not have some of the properties outlined below.
        // Specify publisher settings
        this.loggingSettings = {
            cacheMessageLimit: 0,
            storage: process.env.STORAGE_OPTION_PRIMARY,
            setting: {
                appName: 'FIS-Observer Logging:' + this.ApplicationName,
                appLocName: 'Fis-Observer' + process.env.PORT_SERVER,
                logLocName: 'Fis-Observer' + process.env.PORT_SERVER,
            },
            customSetting: {
                url: process.env.LOGGING_MONGODB_SERVER
            }
        };
        this.sourceSetting = {
            cacheMessageLimit: 0,
            storage: process.env.STORAGE_OPTION_PRIMARY,
            setting: {
                appName: 'FIS-Observer:' + this.ApplicationName,
                appLocName: 'Fis-Observer' + process.env.PORT_SERVER,
                logLocName: 'Fis-Observer' + process.env.PORT_SERVER,
            },
            customSetting: {
                url: process.env.PrimaryPublisher_MONGODB_SERVER
            }
        };
        // Specify subscriber settings
        // Remote target to by synchronized
        this.targetSetting = {
            cacheMessageLimit: 0,
            storage: process.env.STORAGE_OPTION_SECONDARY,
            setting: {
                appName: 'Remote FIS-Observer',
                appLocName: 'Remote Fis-Observer',
                logLocName: 'Remote Fis-Observer',
            },
            customSetting: {
                url: process.env.SecondarySubscriber_MONGODB_SERVER
            }
        };
        // Compile/Package the declared settings into one to be sent for initiating the synchronization service
        this.syncConfig = {
            incomingSource: Object.assign(Object.assign({}, this.sourceSetting), { tags: ['default'] }),
            target: Object.assign(Object.assign({}, this.targetSetting), { tags: ['default'] }), //LogSetting & {tags:string[] }
        };
        exports.application = this;
        this.messageAuditService = new message_auditor_service_1.MessageAuditorService();
        this.DPC.setApplicationName(this.ApplicationName);
        this.DPC.changeMessageService(new export_1.FisCreateMessageUtility(this.ApplicationName));
        this.processManager = new handlers_manager_1.HandlersManager(this.ApplicationName, this.DPC);
        this.default_tag = this.processManager.default_tag;
        this.new_employee_profile_tag = this.processManager.new_employee_profile_tag;
        this.add_employee_profile_tag = this.processManager.add_employee_profile_tag;
        this.modified_employee_profile_tag = this.processManager.modified_employee_profile_tag;
        this.ServiceId_for_employee_profile = this.processManager.serviceId;
        // this.get_handler_with_Tag(this.default_tag); // Create default handler 
        this.fileOperation();
        if (this.TurnOffFingerprintApp.toLocaleUpperCase() == 'NO') {
            this.start();
        }
    }
    async start() {
        // Start subscription
        this.processManager.start();
        // Initialize synchronization service 
        this.messageAuditService.init(this.syncConfig);
        this.messageAuditService.subscribe(this.synchronizationTrigger).subscribe((missingMsg) => {
            let notificationMessage = JSON.parse(missingMsg.appData.msgPayload);
            this.DPC.initialise(this.ApplicationName);
            this.DPC.emit(this.ApplicationName, notificationMessage).subscribe({
                next: (resMsg) => { if (resMsg)
                    console.log(`${notificationMessage.header.messageID} has been sent`); },
                error: (err) => console.error(err.message),
                complete: () => { }
            });
            console.log(`Republishing ${notificationMessage.header.messageID} ...`);
        });
        this.messageLogingservice.init(this.loggingSettings).then(() => {
            this.messageLogingservice.subscribe(this.notificationMessage);
        });
        // await this.ZKTFpService.readFingerprintTemplateData();
        this.subscribeNotificationFromUcp();
        // Perform 1 synchronization when FisObserver starts
        // this.synchronizationTrigger.next({ status: 1, message: 'First trigger from FISobserver start up' })
    }
    get_application_name() {
        return this.ApplicationName;
    }
    synchronization_start() {
        this.synchronizationTrigger.next({ status: 1, message: 'First trigger from FISobserver start up' });
    }
    get_synchronization_observerable() {
        return this.synchronizationTrigger;
    }
    get_logging_observerable() {
        return this.notificationMessage;
    }
    get_handler_with_Tag(tag) {
        return this.processManager.get_handler_with_Tag(tag);
    }
    checkInitialisation() {
        return this.processManager.checkInitialisation();
    }
    getProcessingObservableInstance() {
        return this.processManager.getProcessingObservableInstance();
    }
    // When client calls this, the synchronization will be conducted
    // public async sync(args?: any) {
    //     // Check if client has their own messsage they want to publish, else just use default as prepared below
    //     let triggerMessage = {
    //         status: 1,
    //         message: 'Synchronization request acknowledged. Performing synchronization....'
    //     }
    //     if (args) triggerMessage = args
    //     this.synchronizationTrigger.next(triggerMessage)
    // }
    // Function call to subscribe to notification from designated UCP server. See environment file for more details and configuration
    subscribeNotificationFromUcp() {
        this.getUCPid().then((res) => {
            // console.log(`UCPid: ${res}`)
            // Subscribe to notification category 'notification'
            let notificationMessage = this.DPC.getMessageService().getSubscribeNotifMessage(this.ucp, 'notification');
            this.DPC.subscribe(this.ApplicationName, notificationMessage).subscribe({
                next: (responseMsg) => {
                    if (responseMsg && responseMsg.data && responseMsg.data.data) {
                        let layer1 = responseMsg.data.data;
                        if (layer1.NotificationMicroserviceData.uiMessage && layer1.NotificationMicroserviceData.uiMessage.uiMessage) {
                            let layer2 = layer1.NotificationMicroserviceData.uiMessage.uiMessage;
                            if (layer2.header.messageType == 'Notification') {
                                this.notificationMessage.next(layer2);
                                // console.log(layer2)
                            }
                        }
                    }
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                    // Just leaving the block here to do whatever
                }
            });
        });
    }
    // Function to acquire valid UCPid for authentication for calling DPC functions
    async getUCPid() {
        return new Promise((resolve, reject) => {
            let loginMessage = this.DPC.getMessageService().getLoginMessage();
            this.DPC.initialise(this.ApplicationName);
            this.DPC.send(this.ApplicationName, loginMessage).subscribe({
                next: (responseMessage) => {
                    this.ucp = responseMessage.header.security.ucpId;
                    resolve(this.ucp);
                }
            });
        });
    }
    async fileOperation() {
        // const filePath = "./_views/original/login-web-component.js";
        // const filePathToReplace = "./_views/login-web-component.js";
        // const targetString = "swopt.com";
        // let replacementString = process.env.UCP_URL;
        // replacementString = replacementString.replace('https://', '');
        // replacementString = replacementString.replace(':3011', '');
        // fs.readFile(filePath, 'utf-8', (err, data) => {
        //     if (err) {
        //         console.log("READ FILE ERROR : " + err)
        //         return;
        //     } else {
        //         console.log("READ SUCCESS.");
        //     }
        //     let modifiedData = data.replace(new RegExp(targetString, 'g'), replacementString)
        //     modifiedData = modifiedData.replace(new RegExp(":8080", 'g'), ":3011")
        //     fs.writeFile(filePathToReplace, modifiedData, 'utf-8', (err) => {
        //         if (err) {
        //             console.log("WRITE FILE ERROR :" + err)
        //         } else {
        //             console.log("WRITE SUCCESS.")
        //         }
        //     })
        // })
    }
};
ObserverApplication = __decorate([
    common_1.Controller(''),
    __metadata("design:paramtypes", [DP_controller_1.DomainProxyController, message_auditor_service_1.MessageAuditorService])
], ObserverApplication);
exports.ObserverApplication = ObserverApplication;
//# sourceMappingURL=observer.application.js.map