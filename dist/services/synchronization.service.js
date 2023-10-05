"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynchronisationService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const export_1 = require("../dependencies/DP/src/_dependencies/Audit/interface/export");
const dotenv = require("dotenv");
dotenv.config();
let SynchronisationService = class SynchronisationService {
    constructor() {
        this.messageAuditorService = new export_1.MessageAuditorService();
        this.SyncTrigger = new rxjs_1.Subject();
        this.returnMissingMessages = new rxjs_1.Subject();
    }
    synchronize(args) {
        this.SyncTrigger.next(args);
        return this.returnMissingMessages;
    }
    async initSync(configurations) {
        console.log(`Preparing Synchronizing implements...`);
        this.messageAuditorService.init(configurations);
        let missingData = this.messageAuditorService.subscribe(this.SyncTrigger);
        missingData.subscribe((messageToBeSynchronized) => {
            console.log(`Missing data: ${messageToBeSynchronized.appData.msgId}`);
            this.returnMissingMessages.next(messageToBeSynchronized);
        });
        console.log('Synchronization engine started');
        return 'Synchronization engine activated';
    }
};
SynchronisationService = __decorate([
    (0, common_1.Injectable)()
], SynchronisationService);
exports.SynchronisationService = SynchronisationService;
//# sourceMappingURL=synchronization.service.js.map