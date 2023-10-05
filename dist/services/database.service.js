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
exports.DbConnectionController = void 0;
const common_1 = require("@nestjs/common");
const handlestatusmessage_1 = require("./utility/handlestatusmessage");
const constsetting_1 = require("../interfaces/constsetting");
const mongoose = require('mongoose');
const mongoose_1 = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const responseMessage_1 = require("./utility/responseMessage");
let DbConnectionController = class DbConnectionController {
    constructor() {
        this.genericDataSchema = require(`../interfaces/genericData.schema`);
    }
    async init() {
        mongoose.connect(process.env.MONGODB_SERVER, {
            useNewUrlParser: "true",
            useUnifiedTopology: true
        });
        this.dbConnection = mongoose.connection;
        this.dbConnection.on("connected", (err, res) => {
            (0, handlestatusmessage_1.handleMessage)("Connected to mongo database");
        });
        this.dbConnection.on("error", (err) => {
            (0, handlestatusmessage_1.handleMessage)("Failed to connect database", err);
        });
        this.dbConnection.on("disconnected", () => {
            (0, handlestatusmessage_1.handleMessage)("Disconnect to database");
        });
        this.dbConnection.on("reconnected", () => {
            (0, handlestatusmessage_1.handleMessage)("Reconnect to database");
        });
    }
    async readExec(entityName, entityUUID) {
        let msg;
        let findData = {};
        if (entityName) {
            findData = {
                'entityName': entityName.toLowerCase(),
                'fileData.isDeleted': { $exists: false },
            };
        }
        if (entityUUID) {
            if (entityName === 'personProfile') {
                findData = {
                    'entityName': entityName.toLowerCase(), 'fileData.pers_id': entityUUID,
                    $or: [
                        { 'fileData.isDeleted': false },
                        { 'fileData.isDeleted': { $exists: false } },
                    ],
                };
            }
            else {
                findData = {
                    'entityName': entityName.toLowerCase(), 'fileData.uuid': entityUUID,
                    $or: [
                        { 'fileData.isDeleted': false },
                        { 'fileData.isDeleted': { $exists: false } },
                    ],
                };
            }
        }
        try {
            const mongodbData = (0, mongoose_1.model)('GenericData', this.genericDataSchema);
            await mongodbData.find(findData).then((res) => {
                msg = (0, responseMessage_1.successMessage)("Success to read data", res);
            }).catch((err) => {
                throw err;
            });
        }
        catch (err) {
            msg = (0, responseMessage_1.errorMessage)(err.message);
        }
        return msg;
    }
    async writeExec(entityName, data, entityUUID) {
        let msg;
        const mongodbData = (0, mongoose_1.model)('GenericData', this.genericDataSchema);
        let returnData = this.checkEntityType(entityName, data);
        if (typeof returnData === "string") {
            msg = (0, responseMessage_1.errorMessage)(returnData);
        }
        else {
            if (returnData.uuid != undefined && returnData.fileName != undefined && returnData.fileType != undefined && returnData.entityName != undefined) {
                await mongodbData.create(returnData).then((res) => {
                    (0, handlestatusmessage_1.handleMessage)("Success to save data");
                    msg = (0, responseMessage_1.successMessage)("Success to save data");
                }).catch((err) => {
                    (0, handlestatusmessage_1.handleMessage)("Failed to save data", err);
                    msg = (0, responseMessage_1.errorMessage)(err.message);
                });
            }
            else {
                let writeData = {
                    uuid: uuidv4(),
                    fileName: entityName + '-' + entityUUID,
                    fileType: "json",
                    entityName: entityName,
                    fileData: returnData
                };
                await mongodbData.create(writeData).then((res) => {
                    (0, handlestatusmessage_1.handleMessage)("Success to save data");
                    msg = (0, responseMessage_1.successMessage)("Success to save data");
                }).catch((err) => {
                    (0, handlestatusmessage_1.handleMessage)("Failed to save data", err);
                    msg = (0, responseMessage_1.errorMessage)(err.message);
                });
            }
        }
        return msg;
    }
    async updateExec(entityNames, data, entityUUID) {
        console.log(data);
        let msg;
        let returnData = this.checkEntityType(entityNames, data);
        if (typeof returnData === "string") {
            msg = (0, responseMessage_1.errorMessage)(returnData);
        }
        else {
            const mongodbData = (0, mongoose_1.model)('GenericData', this.genericDataSchema);
            await mongodbData.updateOne({ 'fileData.uuid': entityUUID }, { "fileData": returnData }).then((res) => {
                if (res.modifiedCount === 0) {
                    (0, handlestatusmessage_1.handleMessage)("Failed to update data", { response: { data: "modifiedCount is 0." } });
                    msg = (0, responseMessage_1.errorMessage)("Modified count is 0.");
                }
                else {
                    (0, handlestatusmessage_1.handleMessage)("Success to update data");
                    msg = (0, responseMessage_1.successMessage)("Success to update data");
                }
            }).catch((err) => {
                (0, handlestatusmessage_1.handleMessage)("Failed to update data", err);
                msg = (0, responseMessage_1.errorMessage)(err.message);
            });
        }
        return msg;
    }
    async deleteExec(entityName, entityUUID) {
        let msg;
        let deleteQuery = {};
        let findData = {};
        if (entityName === 'personProfile') {
            findData = {
                'entityName': entityName.toLowerCase(), 'fileData.pers_id': entityUUID,
                'fileData.isDeleted': { $exists: false },
            };
        }
        else {
            findData = {
                'entityName': entityName.toLowerCase(), 'fileData.uuid': entityUUID,
                'fileData.isDeleted': { $exists: false },
            };
        }
        const mongodbData = (0, mongoose_1.model)('GenericData', this.genericDataSchema);
        let data = await mongodbData.find(findData);
        let returnData = this.checkEntityType(entityName, data);
        if (typeof returnData === "string") {
            msg = (0, responseMessage_1.errorMessage)(returnData);
        }
        else {
            if (entityName == constsetting_1.ENTITYNAME.PERSON_PROF_MSG) {
                deleteQuery = { 'fileData.pers_id': entityUUID };
            }
            else {
                deleteQuery = { 'fileData.uuid': entityUUID };
            }
            if (entityName == constsetting_1.ENTITYNAME.FINGERPRINTLOGINACCESS) {
                returnData[0].fileData.loginAccess = false;
            }
            for (const x of returnData) {
                if (entityName == constsetting_1.ENTITYNAME.FINGERPRINTLOGINACCESS) {
                    x.fileData.loginAccess = false;
                }
                x.fileData.isDeleted = true;
                x.fileData.deletedDate = new Date();
                const mongodbData = (0, mongoose_1.model)('GenericData', this.genericDataSchema);
                await mongodbData.updateOne(deleteQuery, { "fileData": x.fileData }).then((res) => {
                    if (res.modifiedCount === 0) {
                        (0, handlestatusmessage_1.handleMessage)("Failed to delete data", { response: { data: "deletedCount is 0." } });
                        msg = (0, responseMessage_1.errorMessage)("Delete count is 0, UUID is not match.");
                    }
                    else {
                        (0, handlestatusmessage_1.handleMessage)("Success to delete data");
                        msg = (0, responseMessage_1.successMessage)("Success to delete data");
                    }
                }).catch((err) => {
                    console.log("DELETE ERROR : ", err);
                    (0, handlestatusmessage_1.handleMessage)("Failed to delete data", err);
                    msg = (0, responseMessage_1.errorMessage)(err.message);
                });
            }
        }
        return msg;
    }
    checkEntityType(entityName, data) {
        let error_message = "";
        try {
            if (data === null) {
                error_message = "Data is null";
                (0, handlestatusmessage_1.handleMessage)("Verify failed.", error_message);
                return error_message;
            }
            if (entityName === constsetting_1.ENTITYNAME.FP_TEMPLATE_MSG) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.EVENT_MSG) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.LOCATION_TAG_MSG) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.LOCATION_REL_MSG) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.DEVICE_TAG_MSG) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.PERSON_PROF_MSG) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.CALENDAR) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.EVENT) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.EVENTINCALENDAR) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.FINGERPRINTLOGINACCESS) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.PERSONPHOTO) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.AUTHENTICATIONLOG) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.AUTHENTICATIONLOGBYPAYMENTCOLLECTION) {
                data;
            }
            if (entityName === constsetting_1.ENTITYNAME.AUTHENTICATION_LOG_EXTENSION) {
                data;
            }
            return data;
        }
        catch (err) {
            error_message = "[Type error] " + err.message;
            (0, handlestatusmessage_1.handleMessage)("Verify failed.", error_message);
            return error_message;
        }
    }
};
DbConnectionController = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DbConnectionController);
exports.DbConnectionController = DbConnectionController;
//# sourceMappingURL=database.service.js.map