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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("./app.service");
const sample_dto_1 = require("./interfaces/sample.dto");
const multer = require("multer");
const multer_1 = require("multer");
const fs = require("graceful-fs");
const jade = require("jade");
const axios_1 = require("@nestjs/axios");
const export_1 = require("./dependencies/DP/src/_interfaces/export");
const fisappmessageschema_1 = require("./dependencies/DP/src/_dependencies/FISAppMessageJSUtility/dependencies/fisappmessagejsdistribution/src/types/fisappmessageschema");
const upload = multer({ dest: 'uploads/' });
const { v4: uuidv4 } = require('uuid');
let lastUpload = {};
let AppController = class AppController {
    constructor(appService, http) {
        this.appService = appService;
        this.http = http;
        this.messageUtil = new export_1.FisCreateMessageUtility("FisAppID/Name");
        this.dataUtil = new export_1.FisReadDataUtility();
        this.messageType = new export_1.MessageTypeProfile();
        this.dataType = new export_1.DataTypeProfile();
    }
    sayHello() {
        return this.appService.getHello();
    }
    uploadFile(body, file) {
        return {
            body,
            file: file,
        };
    }
    async messageOperation(body) {
        let message = body;
        if (message.header.messageType == fisappmessageschema_1.AppMessageType.Query && message.header.query == fisappmessageschema_1.Query.GetData) {
            return await this.appService.intepretMessage(message, message.data.operation || `read`);
        }
        if (message.header.messageType == fisappmessageschema_1.AppMessageType.Command && message.header.command == fisappmessageschema_1.Command.Save) {
            return await this.appService.intepretMessage(message, message.data.operation || `write`);
        }
        if (message.header.messageType == fisappmessageschema_1.AppMessageType.Command && message.header.command == fisappmessageschema_1.Command.Update) {
            return await this.appService.intepretMessage(message, message.data.operation || `update`);
        }
        if (message.header.messageType == fisappmessageschema_1.AppMessageType.Command && message.header.command == fisappmessageschema_1.Command.Delete) {
            return await this.appService.intepretMessage(message, message.data.operation || `delete`);
        }
    }
    async dataOperation(body) {
        let postBody = body;
        let data = await this.appService.dataOperation(postBody);
        if (!data.data || data.data === undefined) {
            data.data = "";
        }
        return data.data;
    }
    res_render(jadefile, res, jadeargument) {
        let data = fs.readFileSync('views/' + jadefile + '.jade', {
            encoding: 'utf8',
        });
        let renderer = jade.compile(data);
        let html = renderer({ jadeargument });
        return html;
    }
    getUploadFileManagement(req, res) {
        try {
            let jadeargument = {};
            let req_body = {};
            if (!req.body.filename) { }
            else {
                lastUpload = req.body;
            }
            if (req.body['filedata']) {
                let dataString = req.body['filedata'].split(',')[1];
                let mimeStr = req.body['filedata'].split(',')[0].split(':')[1].split(';')[0];
                req.body['filedata'] = dataString;
            }
            if (req.body['filename']) {
                req_body = Object.assign({ 'uuid': uuidv4() }, req.body);
                this.writeData("genericFileData", req_body);
            }
            jadeargument['lastUpload'] = JSON.stringify(req_body, null, 4);
            return res.send(this.res_render('uploadfilemanagement', res, jadeargument));
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async getDownloadFileManagement(req, res) {
        try {
            console.log(JSON.stringify(req.body, null, 4));
            let readData = "";
            let downloadData = {};
            let jadeargument = {};
            if (!req.body.filename) { }
            else {
                lastUpload = req.body;
            }
            jadeargument['readData'] = [];
            if (req) {
                readData = await this.readData("genericFileData", "");
                jadeargument['readData'] = JSON.stringify(JSON.parse(readData), null, 4);
            }
            if (req.body) {
                if (req.body.uuid) {
                    downloadData = JSON.parse(await this.readData("genericFileData", req.body.uuid));
                }
            }
            if (downloadData[0]) {
                downloadData = downloadData[0];
            }
            if (downloadData) {
                if (downloadData['fileData']) {
                    downloadData = downloadData['fileData'];
                }
            }
            if (downloadData['filename']) {
                let downloadFileData = downloadData;
                res.set('Content-disposition', `attachment; filename=${downloadFileData.filename}`);
                let downloadFileData_filedata = downloadFileData.filedata;
                let fileBuffer = Buffer.from(downloadFileData_filedata, 'base64');
                return res.send(fileBuffer);
            }
            else {
                return res.send(this.res_render('downloadfilemanagement', res, jadeargument));
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async readData(entityname, entityUUID) {
        let operationData = {
            operation: "read",
            entityName: entityname,
            uuid: entityUUID
        };
        let responseMessage = (await this.http.axiosRef.post('http://localhost:' + process.env.PORT_SERVER + '/data', operationData)).data;
        return JSON.stringify(responseMessage);
    }
    async writeData(entityname, payloadData) {
        let operationData = {
            operation: "write",
            entityName: entityname,
            uuid: payloadData.uuid,
            data: JSON.stringify(payloadData)
        };
        let responseMessage = (await this.http.axiosRef.post('http://localhost:' + process.env.PORT_SERVER + '/data', operationData)).data;
        return JSON.stringify(responseMessage);
    }
    async startSynnchronization(body) {
        let configurations = body;
        this.appService.startSynchronizationService(configurations);
    }
    async syncOperation(body) {
        return await this.appService.syncOperation(body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sayHello", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads'
        })
    })),
    (0, common_1.Post)('file'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sample_dto_1.SampleDto, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "messageOperation", null);
__decorate([
    (0, common_1.Post)('data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "dataOperation", null);
__decorate([
    (0, common_1.All)('uploadfilemanagement'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUploadFileManagement", null);
__decorate([
    (0, common_1.All)('downloadfilemanagement'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getDownloadFileManagement", null);
__decorate([
    (0, common_1.Post)('startSynchronization'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "startSynnchronization", null);
__decorate([
    (0, common_1.Post)('sync'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "syncOperation", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        axios_1.HttpService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map