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
exports.ObserverModule = exports.isLogAllMessages = void 0;
const common_1 = require("@nestjs/common");
const observer_controller_1 = require("./observer.controller");
const observer_application_1 = require("./observer.application");
const axios_1 = require("@nestjs/axios");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const DP_core_module_1 = require("./_dependencies/DP/src/DP.core.module");
const DP_controller_1 = require("./_dependencies/DP/src/services/DP.controller");
const message_auditor_service_1 = require("./_dependencies/Audit/services/message-auditor.service");
let ObserverModule = class ObserverModule {
    constructor(configService) {
        this.configService = configService;
        exports.isLogAllMessages = this.configService.get('LogAllMessages');
    }
};
ObserverModule = __decorate([
    common_1.Module({
        imports: [
            DP_core_module_1.DPCoreModule, axios_1.HttpModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'Server_Microservice',
                    //transport: Transport.TCP,
                    //options: { port: 6380 }  
                    //transport: Transport.TCP 
                    transport: microservices_1.Transport.REDIS,
                    options: { url: 'redis://localhost:' + "6380" }
                },
            ]),
            config_1.ConfigModule.forRoot({
                envFilePath: '.env'
            })
        ],
        controllers: [observer_controller_1.ObserverController],
        providers: [
            observer_application_1.ObserverApplication,
            DP_controller_1.DomainProxyController,
            message_auditor_service_1.MessageAuditorService
        ],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ObserverModule);
exports.ObserverModule = ObserverModule;
//# sourceMappingURL=observer.module.js.map