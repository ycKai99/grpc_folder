"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPCoreModule = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = require("@nestjs/common");
const DP_core_controller_1 = require("./DP.core.controller");
const axios_1 = require("@nestjs/axios");
//import { Transport, MicroserviceOptions, ClientsModule } from '@nestjs/microservices';
const DP_controller_1 = require("./services/DP.controller");
const MD_microservice_service_1 = require("./services/MD.microservice.service");
let DPCoreModule = class DPCoreModule {
};
DPCoreModule = __decorate([
    common_1.Module({
        imports: [axios_1.HttpModule],
        controllers: [DP_core_controller_1.DPCoreController, DP_controller_1.DomainProxyController],
        providers: [
            /*{
              provide: 'DomainProxyServiceInject',
              useClass:  DomainProxyService  // To be reused by other modules
            }, */
            DP_controller_1.DomainProxyController,
            MD_microservice_service_1.MicroserviceDomainProxyService,
        ],
    })
], DPCoreModule);
exports.DPCoreModule = DPCoreModule;
//# sourceMappingURL=DP.core.module.js.map