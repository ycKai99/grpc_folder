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
exports.FingerprintStorageController = exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const postmethod_1 = require("./postmethod");
const dotenv = require("dotenv");
dotenv.config();
let StorageController = class StorageController {
    constructor() { }
    /**
     * @param entityName string
     * @param entityUUID optional, used when read single data
     * @description read data from mongoDB, data is based on entityName
     */
    async readData(entityName, entityUUID) {
        let operationData = {
            operation: "read",
            entityName: entityName,
            uuid: entityUUID
        };
        try {
            let responseMessage = await postmethod_1.postAxiosMethod(process.env.ContentDeliveryServerUrl, operationData);
            return JSON.stringify(responseMessage);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @param entityName string
     * @param data any
     * @description add data to mongoDB
     */
    async writeData(entityName, payloadData) {
        let operationData = {
            operation: "write",
            entityName: entityName,
            uuid: payloadData.uuid,
            data: JSON.stringify(payloadData)
        };
        try {
            let responseMessage = await postmethod_1.postAxiosMethod(process.env.ContentDeliveryServerUrl, operationData);
            return JSON.stringify(responseMessage);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @param entityName string
     * @param data any
     * @description update data to mongoDB
     */
    async updateData(entityName, payloadData) {
        let operationData = {
            operation: "update",
            entityName: entityName,
            uuid: payloadData.uuid,
            data: JSON.stringify(payloadData)
        };
        try {
            let responseMessage = await postmethod_1.postAxiosMethod(process.env.ContentDeliveryServerUrl, operationData);
            return JSON.stringify(responseMessage);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @param entityName string
     * @param entityUUID string
     * @description delete data from mongoDB
     */
    // public async deleteData(entityName: string, entityUUID: string) {
    async deleteData(entityName, entityUUID, payloadData) {
        let operationData = {
            operation: "delete",
            entityName: entityName,
            uuid: entityUUID,
            data: JSON.stringify(payloadData),
        };
        try {
            let responseMessage = await postmethod_1.postAxiosMethod(process.env.ContentDeliveryServerUrl, operationData);
            return JSON.stringify(responseMessage);
        }
        catch (err) {
            throw err;
        }
    }
};
StorageController = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], StorageController);
exports.StorageController = StorageController;
let FingerprintStorageController = class FingerprintStorageController extends StorageController {
    constructor() { super(); }
    /**
     * @param entityName string
     * @param entityUUID optional, used when read image
     * @description pass data to storageController.readData(entityname, entityUUID)
     */
    async readFpData(entityName, entityUUID) {
        try {
            return await this.readData(entityName, entityUUID);
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController
     */
    async writeFpData(entityName, data) {
        try {
            return await this.writeData(entityName, data);
        }
        catch (err) {
            throw err;
        }
    }
};
FingerprintStorageController = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], FingerprintStorageController);
exports.FingerprintStorageController = FingerprintStorageController;
//# sourceMappingURL=app.storage.service.js.map