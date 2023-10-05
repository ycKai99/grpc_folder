"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const storage_service_1 = require("./services/storage.service");
const axios_1 = require("@nestjs/axios");
const synchronization_service_1 = require("./services/synchronization.service");
const export_1 = require("./dependencies/DP/src/_dependencies/Audit/dependencies/log/interface/export");
const DP_controller_1 = require("./dependencies/DP/src/MessageDelivery/MessageTransmission/DP.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [platform_express_1.MulterModule, axios_1.HttpModule],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            storage_service_1.StorageController,
            synchronization_service_1.SynchronisationService,
            export_1.LoggingService,
            DP_controller_1.DomainProxyController
        ],
    })
], AppModule);
exports.AppModule = AppModule;
platform_express_1.MulterModule.register({
    dest: './upload',
});
//# sourceMappingURL=app.module.js.map