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
exports.LocationRelationController = void 0;
const common_1 = require("@nestjs/common");
let LocationRelationController = class LocationRelationController {
    constructor() { }
    // set the storageController from the StorageController
    setStorageController(controller) {
        this.storageController = controller;
    }
    /**
     * @param entityName string
     * @param entityUUID optional, used when read image
     * @description pass data to storageController.readData(entityname, entityUUID)
     */
    async readRelation(entityName, entityUUID) {
        try {
            let data = await this.storageController.readData(entityName, entityUUID);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.writeData(entityname, data)
     */
    async addRelation(entityName, data) {
        await this.storageController.writeData(entityName, data);
    }
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.updateData(entityname, data)
     */
    async updateRelation(entityName, data) {
        return await this.storageController.updateData(entityName, data);
    }
    /**
     * @param entityName string
     * @param data data
     * @description pass data to storageController.deleteData(entityname, data)
     */
    async deleteRelation(entityName, entityUUID) {
        return await this.storageController.deleteData(entityName, entityUUID);
    }
};
LocationRelationController = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], LocationRelationController);
exports.LocationRelationController = LocationRelationController;
//# sourceMappingURL=app.location_relation.service.js.map