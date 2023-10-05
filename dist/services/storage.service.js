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
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const readdata_1 = require("./utility/readdata");
const writedata_1 = require("./utility/writedata");
const constsetting_1 = require("../interfaces/constsetting");
const database_service_1 = require("./database.service");
const dotenv = require("dotenv");
dotenv.config();
let StorageController = class StorageController {
    constructor() {
        this.entityName_storageType = {};
        this.dbConnectionController = new database_service_1.DbConnectionController();
    }
    async init() {
        const storage = process.env.storage;
        const storageArray = storage.split(",");
        storageArray.forEach((keyvalue) => {
            let keyvalueArray;
            keyvalueArray = keyvalue.split("=");
            const key = keyvalueArray[0];
            const value = keyvalueArray[1];
            let DBvalue;
            if (value.toLocaleLowerCase() === 'file') {
                DBvalue = constsetting_1.DB.FILE;
            }
            if (value.toLocaleLowerCase() === 'mongo') {
                DBvalue = constsetting_1.DB.MONGO;
            }
            this.setStorageType(key, DBvalue);
        });
        await this.dbConnectionController.init();
    }
    getStorageType(entityName) {
        return this.entityName_storageType[entityName];
    }
    setStorageType(entityName, data) {
        this.entityName_storageType[entityName] = data;
    }
    async readData(entityName, entityUUID) {
        if (this.getStorageType(entityName) === constsetting_1.DB.FILE) {
            return (0, readdata_1.readExec)(entityName, entityUUID);
        }
        if (this.getStorageType(entityName) === constsetting_1.DB.MONGO) {
            return await this.dbConnectionController.readExec(entityName, entityUUID);
        }
    }
    async writeData(entityName, entityUUID, data) {
        const JSONdata = JSON.parse(data);
        if (this.getStorageType(entityName) === constsetting_1.DB.FILE) {
            console.log("Not yet implemented file storage.");
            (0, writedata_1.writeExec)(entityName, data);
        }
        else if (this.getStorageType(entityName) === constsetting_1.DB.MONGO) {
            return await this.dbConnectionController.writeExec(entityName, JSONdata, entityUUID);
        }
        else {
            console.error("Error : No storage option set for " + entityName);
        }
    }
    async updateData(entityName, entityUUID, data) {
        const JSONdata = JSON.parse(data);
        if (this.getStorageType(entityName) === constsetting_1.DB.FILE) {
            console.log("Not yet implemented file storage.");
        }
        if (this.getStorageType(entityName) === constsetting_1.DB.MONGO) {
            return await this.dbConnectionController.updateExec(entityName, JSONdata, entityUUID);
        }
    }
    async deleteData(entityName, entityUUID) {
        if (this.getStorageType(entityName) === constsetting_1.DB.FILE) {
            console.log("Not yet implemented file storage.");
        }
        if (this.getStorageType(entityName) === constsetting_1.DB.MONGO) {
            return await this.dbConnectionController.deleteExec(entityName, entityUUID);
        }
    }
};
StorageController = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageController);
exports.StorageController = StorageController;
//# sourceMappingURL=storage.service.js.map