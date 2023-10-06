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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardFingerprint = void 0;
const common_1 = require("@nestjs/common");
const handlestatusmessage_1 = require("./handlestatusmessage");
const app_storage_service_1 = require("./app.storage.service");
const app_location_tag_service_1 = require("./app.location_tag.service");
const app_location_relation_service_1 = require("./app.location_relation.service");
const dotenv = require("dotenv");
const getmethod_1 = require("./getmethod");
dotenv.config();
let StandardFingerprint = class StandardFingerprint {
    constructor() {
        this._eventMessageData = []; // store success/error message 
        this._fingerprintTemplateData = []; // store fingerprint template
        this._locationTag = [];
        this._locationRelation = [];
        this._scannerID = "NO DEVICE" /* UNAVAILABLE */;
        this._deviceStatus = "INACTIVE" /* INACTIVE */;
        this._deviceIP = "";
        this.connectionStatus = "offline" /* OFFLINE */;
        this.fpTemplateArray = [];
        this.storageController = new app_storage_service_1.StorageController();
        this.locationTagController = new app_location_tag_service_1.LocationTagController();
        this.locationRelationController = new app_location_relation_service_1.LocationRelationController();
        this.countFpVerify = 0;
    }
    // init for the first time
    async fpStandardInit() {
        // set storage controller, point to the same one
        this.locationTagController.setStorageController(this.storageController);
        this.locationRelationController.setStorageController(this.storageController);
        try {
            // load the data into each own variable
            this.checkConnectionStatus();
            await this.readFingerprintTemplateData();
            await this.readEventMessageData();
            await this.readLocationTagData();
            await this.readLocationRelationData();
        }
        catch (err) {
            let payload = {
                status: -1 /* ERROR */,
                message: err.message
            };
            console.error("FAILED TO READ INIT DATA" /* FAILED_TO_READ_INIT_DATA */ + JSON.stringify(handlestatusmessage_1.handleResponse(payload)));
            // console.error(RESPONSE_MESSAGE.FAILED_TO_READ_INIT_DATA + handleResponse(payload))
        }
    }
    getConnectionStatus() {
        return this.connectionStatus;
    }
    async setConnectionStatus(data) {
        this.connectionStatus = data;
    }
    // used to check current connection status is "Online" or "Offline"
    async checkConnectionStatus() {
        try {
            let data = await getmethod_1.getAxiosMethod(process.env.PRIMARY_SERVER + "/observer/checkfpconnection");
            if (data) {
                this.setConnectionStatus("online" /* ONLINE */);
            }
        }
        catch (err) {
            this.setConnectionStatus("offline" /* OFFLINE */);
        }
    }
    // // verification 1 ON 1
    // async fpVerify(): Promise<string> {
    //     let data = this.getFingerprintTemplateData();
    //     data = data.filter(x => x.status === PROCESS_STATUS.REGISTERED_FINGERPRINT);
    //     if(data.length > 0) {
    //       if(this.countFpVerify < data.length) {
    //         let requestData = data[this.countFpVerify]
    //         this.countFpVerify++;
    //         return JSON.stringify(requestData);
    //       }
    //       else{
    //         this.countFpVerify = 0;
    //         return "finish";
    //       }
    //     }else {
    //       this.countFpVerify = 0;
    //       return "finish";
    //     }
    // }
    // verification 1 ON MANY
    async fpVerify() {
        let data = this.getFingerprintTemplateData();
        data = data.filter(x => x.status === "registered fingerprint" /* REGISTERED_FINGERPRINT */);
        // if(data.length > 0) {
        //   if(this.countFpVerify < data.length) {
        //     console.log('this.countFpVerify : ',this.countFpVerify)
        //     let requestData = [];
        //     for(let i = 0; i < 10000; i++) {
        //       if(this.countFpVerify < data.length) {
        //         requestData.push(data[this.countFpVerify])
        //         this.countFpVerify++;
        //       }
        //       else{
        //         break;
        //       }
        //     }
        //     return JSON.stringify(requestData);
        //   }else {
        //     this.countFpVerify = 0;
        //     return "finish";
        //   }
        // }else {
        //   this.countFpVerify = 0;
        //   return "finish";
        // }
        return JSON.stringify(data);
    }
    /**
     * @returns Promise string
     * @description get fingerprint template data
    */
    async fingerprintTemplate() {
        try {
            return await this.readFingerprintTemplateData().then((res) => {
                let data = this.getFingerprintTemplateData();
                if (data.length > 0 && data !== undefined) {
                    // data = data.filter(x => x.status === PROCESS_STATUS.REGISTERED_FINGERPRINT);
                    return JSON.stringify(data);
                }
                else {
                    return "";
                }
            });
        }
        catch (err) {
            let payload = {
                status: -1 /* ERROR */,
                message: err
            };
            console.error("FAILED TO READ FINGERPRINT TEMPLATE DATA" /* FAILED_TO_READ_FP_TEMPLATE_DATA */ + JSON.stringify(handlestatusmessage_1.handleResponse(payload)));
            return "";
        }
    }
    /**
     * @description read fingerprint template from mongoDB, and set into this._fingerprintTemplateData
    */
    async readFingerprintTemplateData() {
        try {
            let data = await this.readData("fingerprintTemplateData" /* FP_TEMPLATE_MSG */);
            await this.setFingerprintTemplateData(data);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @returns fingerprintDataInterface
     * @description get fingerprint template data
    */
    getFingerprintTemplateData() {
        return this._fingerprintTemplateData;
    }
    /**
     * @param data fingerprintDataInterface[]
     * @description set fingerprint template data
    */
    async setFingerprintTemplateData(data) {
        this._fingerprintTemplateData = data;
    }
    /**
     * @description read event message from mongoDB, and set into this._eventMessageData
    */
    async readEventMessageData() {
        try {
            let data = await this.readData("eventMessage" /* EVENT_MSG */);
            await this.setEventMessageData(data);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @returns data eventMessageInterface[]
     * @description get event message data
    */
    getEventMessageData() {
        return this._eventMessageData;
    }
    /**
     * @param data eventMessageInterface[]
     * @description set event message data
    */
    async setEventMessageData(data) {
        this._eventMessageData = data;
    }
    /**
     * @description read location tag data, and set into this._locationTag
    */
    async readLocationTagData() {
        try {
            let data = await this.readLocationTag("locationTag" /* LOCATION_TAG */);
            await this.setLocationTagData(data);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @returns locationTagInterface[]
     * @description get location tag data
    */
    getLocationTagData() {
        return this._locationTag;
    }
    /**
     * @param data locationTagInterface[]
     * @description set location tag data
    */
    async setLocationTagData(data) {
        this._locationTag = data;
    }
    /**
     * @description read location relation data, and set into this._locationRelation
    */
    async readLocationRelationData() {
        try {
            let data = await this.readLocationRelation("locationRelation" /* LOCATION_REL */);
            await this.setLocationRelationData(data);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @returns locationRelationInterface[]
     * @description set location relation data
    */
    getLocationRelationData() {
        return this._locationRelation;
    }
    /**
     * @param data locationRelationInterface[]
     * @description set location relation data
    */
    async setLocationRelationData(data) {
        this._locationRelation = data;
    }
    /**
     * @param entityName string
     * @param entityUUID optional, used when read single data
     * @description read data from mongoDB, data is based on entityName
    */
    async readData(entityName, entityUUID) {
        try {
            let data = JSON.parse(await this.storageController.readData(entityName, entityUUID));
            // console.log("DATA : ",data)
            let filteredBody = [];
            if (data) {
                if (data.length > 0) {
                    data.filter((x) => {
                        filteredBody.push(x.fileData);
                    });
                }
                else {
                    filteredBody = [];
                }
            }
            else {
                filteredBody = [];
            }
            return filteredBody;
        }
        catch (err) {
            console.log("ERROR readdata");
            throw err;
        }
    }
    /**
     * @param entityName string
     * @param data any
     * @description add data to mongoDB
    */
    async addData(entityName, data) {
        await this.storageController.writeData(entityName, data).then((res) => {
            switch (entityName) {
                case "fingerprintTemplateData" /* FP_TEMPLATE_MSG */:
                    this._fingerprintTemplateData.push(data);
                    break;
                case "eventMessage" /* EVENT_MSG */:
                    this._eventMessageData.push(data);
                    break;
            }
        });
    }
    /**
     * @param entityName string
     * @param data any
     * @description update data to mongoDB
    */
    async updateData(entityName, data) {
        await this.storageController.updateData(entityName, data);
    }
    /**
     * @param entityName string
     * @param entityUUID string
     * @description delete data from mongoDB
    */
    async deleteData(entityName, entityUUID, data) {
        // public async deleteData(entityName: string, entityUUID: string, data: string) {
        await this.storageController.deleteData(entityName, entityUUID, data);
    }
    /**
     * @param entityName string
     * @param entityUUID optional, used when read single data
     * @description read location tag from mongoDB, data is based on entityName
    */
    async readLocationTag(entityName, entityUUID) {
        // try {
        //   let data: any = JSON.parse(await this.locationTagController.readTag(entityName, entityUUID));
        //   let body = JSON.parse(data.body);
        //   let filteredBody = []
        //     if(body) {
        //       if(body.length > 0) {
        //         body = body.map(({ _id, __v, ...others }) => others);
        //         body.filter((x) => {
        //           filteredBody.push(x.fileData)
        //         });
        //       }
        //     }
        //     else {
        //       body = JSON.stringify(body);
        //     }
        //   return filteredBody;
        // }
        // catch(err) {
        //   throw err;
        // }
        try {
            let data = JSON.parse(await this.locationTagController.readTag(entityName, entityUUID));
            let filteredBody = [];
            if (data) {
                if (data.length > 0) {
                    data.filter((x) => {
                        filteredBody.push(x.fileData);
                    });
                }
                else {
                    filteredBody = [];
                }
            }
            else {
                filteredBody = [];
            }
            return filteredBody;
        }
        catch (err) {
            throw err;
        }
        // try {
        //   let data: any = JSON.parse(await this.locationTagController.readTag(entityName, entityUUID));
        //   let body = JSON.parse(data.body);
        //   let filteredBody = []
        //     if(body) {
        //       if(body.length > 0) {
        //         body = body.map(({ _id, __v, ...others }) => others);
        //         body.filter((x) => {
        //           filteredBody.push(x.fileData)
        //         });
        //       }
        //     }
        //     else {
        //       body = JSON.stringify(body);
        //     }
        //   return filteredBody;
        // }
        // catch(err) {
        //   throw err;
        // }
    }
    /**
     * @param entityName string
     * @param data any
     * @description add location tag to mongoDB
    */
    async addLocationTag(entityName, data) {
        await this.locationTagController.addTag(entityName, data);
    }
    /**
     * @param entityName string
     * @param data any
     * @description update data to mongoDB
    */
    async updateLocationTag(entityName, data) {
        await this.locationTagController.updateTag(entityName, data);
    }
    /**
     * @param entityName string
     * @param entityUUID string
     * @description delete location tag from mongoDB
    */
    async deleteLocationTag(entityName, entityUUID) {
        await this.locationTagController.deleteTag(entityName, entityUUID);
    }
    /**
     * @param entityName string
     * @param entityUUID optional, used when read single data
     * @description read location relation from mongoDB, data is based on entityName
    */
    async readLocationRelation(entityName, entityUUID) {
        // try {
        //   let data: any = JSON.parse(await this.locationRelationController.readRelation(entityName, entityUUID));
        //   let body = JSON.parse(data.body);
        //   let filteredBody = []
        //     if(body) {
        //       if(body.length > 0) {
        //         body = body.map(({ _id, __v, ...others }) => others)
        //         body.filter((x) => {
        //           filteredBody.push(x.fileData)
        //         });
        //       }
        //     }
        //     else {
        //       body = JSON.stringify(body);
        //     }
        //   return filteredBody;
        // }
        // catch(err) {
        //   throw err;
        // }
        try {
            let data = JSON.parse(await this.locationRelationController.readRelation(entityName, entityUUID));
            let filteredBody = [];
            if (data) {
                if (data.length > 0) {
                    data.filter((x) => {
                        filteredBody.push(x.fileData);
                    });
                }
                else {
                    filteredBody = [];
                }
            }
            else {
                filteredBody = [];
            }
            return filteredBody;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @param entityName string
     * @param data any
     * @description add location relation to mongoDB
    */
    async addLocationRelation(entityName, data) {
        await this.locationRelationController.addRelation(entityName, data);
    }
    /**
     * @param entityName string
     * @param data any
     * @description update data to mongoDB
    */
    async updateLocationRelation(entityName, data) {
        await this.locationRelationController.updateRelation(entityName, data);
    }
    /**
     * @param entityName string
     * @param entityUUID string
     * @description delete location relation from mongoDB
    */
    async deleteLocationRelation(entityName, entityUUID) {
        await this.locationRelationController.deleteRelation(entityName, entityUUID);
    }
    async readScannerIDData(entityName, entityUUID) {
        let data = await this.readData(entityName, entityUUID);
        if (data) {
            data = JSON.parse(data);
            if (data.length > 0) {
                data = data.map((_a) => {
                    var { _id, __v } = _a, others = __rest(_a, ["_id", "__v"]);
                    return others;
                });
            }
        }
        return data;
    }
    /**
     * @param deviceNo string
     * @description set scanner ID
    */
    async setScannerID(deviceNo) {
        // let message = deviceTagMessage(deviceNo);
        // let data = await this.readScannerIDData(FPENTITYNAME.DEVICE_TAG_MSG);
        // try {
        //   if(data.length > 0) {
        //     let filterData = data.filter((x) => {
        //       if(x.deviceNo === deviceNo && x.location === process.env.LOCATION){return x;}
        //     });
        //     if(filterData.length < 0) {
        //       await this.addData(FPENTITYNAME.DEVICE_TAG_MSG, message);
        //     }
        //   }
        // }
        // catch(e) {
        //   throw new Error(`SET DEVICE NO ERROR : ${e}`)
        // }
        this._scannerID = deviceNo;
    }
    /**
     * @returns string
     * @description get scanner ID
    */
    getScannerID() {
        return this._scannerID;
    }
    /**
     * @param deviceStatus DEVICE enum
     * @description set device status
    */
    async setDeviceStatus(deviceStatus) {
        this._deviceStatus = deviceStatus;
    }
    /**
     * @returns DEVICE enum
     * @description get device status
    */
    getDeviceStatus() {
        return this._deviceStatus;
    }
    /**
     * @param deviceIP string
     * @description set deviceIP into this._deviceIP
    */
    async setDeviceIP(deviceIP) {
        this._deviceIP = deviceIP;
    }
    /**
     * @returns string
     * @description get device IP
    */
    getDeviceIP() {
        return this._deviceIP;
    }
};
StandardFingerprint = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], StandardFingerprint);
exports.StandardFingerprint = StandardFingerprint;
//# sourceMappingURL=app.standardfingerprint.service.js.map