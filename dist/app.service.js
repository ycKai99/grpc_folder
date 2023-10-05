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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./services/storage.service");
const export_1 = require("./dependencies/DP/src/_dependencies/Audit/dependencies/log/interface/export");
const rxjs_1 = require("rxjs");
const synchronization_service_1 = require("./services/synchronization.service");
const DP_controller_1 = require("./dependencies/DP/src/MessageDelivery/MessageTransmission/DP.controller");
let AppService = class AppService {
    constructor(syncService, storageController, loggingService) {
        this.syncService = syncService;
        this.storageController = storageController;
        this.loggingService = loggingService;
        this.ActivityMessages = new rxjs_1.Subject();
        this.DPC = new DP_controller_1.DomainProxyController();
        this.applicationName = `Content Delivery Management Server`;
        this.UCPId = '';
        this.synchronizationServiceStatus = "Uninitiated";
        this.loggingSubject = new rxjs_1.Subject();
        this.storage = {
            cacheMessageLimit: 0,
            storage: process.env.STORAGE_OPTION_PRIMARY,
            setting: {
                appName: this.applicationName,
                appLocName: 'CDMS' + process.env.PORT_SERVER,
                logLocName: 'CDMS' + process.env.PORT_SERVER,
            },
            customSetting: {
                url: process.env.MONGODB_SERVER
            }
        };
        this.initializeAppServices();
    }
    getHello() {
        return { hello: 'world' };
    }
    async intepretMessage(body, operation) {
        let postBody = {
            operation: operation,
            entityName: body.data.entityName,
            uuid: body.data.uuid,
            data: body.data.data
        };
        await this.dataOperation(postBody);
        this.ActivityMessages.next(body);
    }
    async dataOperation(data) {
        let returnData;
        if (data.operation === "read") {
            console.log(`performing read`);
            returnData = await this.storageController.readData(data.entityName, data.uuid);
        }
        if (data.operation === "write") {
            console.log(`performing write`);
            returnData = await this.storageController.writeData(data.entityName, data.uuid, data.data);
        }
        if (data.operation === "update") {
            console.log(`performing update`);
            returnData = await this.storageController.updateData(data.entityName, data.uuid, data.data);
        }
        if (data.operation === "delete") {
            console.log(`performing delete`);
            returnData = await this.storageController.deleteData(data.entityName, data.uuid);
        }
        return returnData;
    }
    async startSynchronizationService(configurations) {
        this.syncService.initSync(configurations).then((result) => {
            this.synchronizationServiceStatus = result;
        });
    }
    async syncOperation(syncRequest) {
        if (this.synchronizationServiceStatus == "Synchronization engine activated") {
            let missingMessages = this.syncService.synchronize(syncRequest);
            missingMessages.pipe((0, rxjs_1.map)((message) => {
                let notificationMsg = JSON.parse(message.appData.msgPayload);
                return notificationMsg;
            })).subscribe({
                next: (notificationMessage) => {
                    this.sendNotificationToUCP(notificationMessage);
                },
                error: (err) => {
                    console.error(err);
                },
                complete: () => {
                    console.log(`Synchronization completed!`);
                }
            });
        }
        else {
            console.log(`Synchronization Service is not initiated. Please start the service.`);
        }
    }
    async initializeAppServices() {
        this.storageController.init().then(() => {
            this.loggingService.init(this.storage).then(() => {
                this.loggingService.subscribe(this.loggingSubject).then(() => {
                    this.DPC.initialise(this.applicationName);
                    let loginMessage = this.DPC.getMessageService().getLoginMessage();
                    this.getLoginResponseFromUCP(this.applicationName, loginMessage);
                    this.ActivityMessages.next(loginMessage);
                }).catch((err) => {
                    console.error(err.message);
                });
            }).catch((err) => {
                console.error(err.message);
            });
        }).catch((err) => {
            console.error(err.message);
        });
    }
    async notifyServer(message) {
        const notificationMessage = await this.generateNotificationMessage(message);
        const msg = JSON.parse(JSON.stringify(notificationMessage));
        console.log(`Successlly generated notificationMessage message: ${notificationMessage.header.messageName}`);
        this.sendNotificationToUCP(notificationMessage).then((response_msg) => {
            if (response_msg)
                this.loggingSubject.next(msg);
        });
    }
    async generateNotificationMessage(message) {
        return new Promise((resolve, reject) => {
            let result = this.DPC.getMessageService().getNotificationMessage(this.UCPId, message, 'CDMS_Activities');
            resolve(result);
        });
    }
    async sendNotificationToUCP(message) {
        return new Promise((resolve, reject) => {
            let response = this.DPC.emit(this.applicationName, message);
            response.subscribe({
                next: (response_msg) => {
                    console.log(`Notification response from server: ${response_msg.header.messageName}`);
                    resolve(response_msg);
                },
                error: (err) => {
                    console.error(`Something wrong occured: ${err}`);
                    reject(err);
                },
                complete: () => {
                }
            });
        });
    }
    async getLoginResponseFromUCP(appName, loginMessage) {
        return new Promise((resolve, reject) => {
            let obs = this.DPC.send(appName, loginMessage);
            console.log(`Acquiring login response from UCP server: ${process.env.UCP_Url}`);
            obs.subscribe({
                next: (response) => {
                    console.log(`Response from server: ${response.header.messageName}`);
                    if (response.header.security) {
                        this.UCPId = response.header.security.ucpId;
                        console.log(`Current UCPid is assigned: ${this.UCPId}`);
                    }
                },
                error: (err) => {
                    console.error(err.message);
                    reject(err);
                },
                complete: () => {
                    if (this.UCPId) {
                        resolve(this.UCPId);
                        this.ActivityMessages.subscribe((message) => {
                            this.notifyServer(message);
                        });
                    }
                    else {
                        console.log(`Something wrong occured: UCPid not found or null`);
                    }
                }
            });
        });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [synchronization_service_1.SynchronisationService,
        storage_service_1.StorageController,
        export_1.LoggingService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map