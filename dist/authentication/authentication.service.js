"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const app_zkt_fingerprint_service_1 = require("../fingerprint/_utility/app.zkt_fingerprint.service");
const export_1 = require("../_dependencies/DP/src/interface/export");
let authenticateUuid;
class AuthenticationService {
    constructor() {
        this.ZKTFpService = new app_zkt_fingerprint_service_1.ZKTFingerprintService();
    }
    authenticate(entityName, entityUuid, fpUuid, data) {
        if (entityName == "authenticationLogByPaymentCollection" /* AUTHENTICATION_LOG_BY_PAYMENT_COLLECTION */) {
            if (authenticateUuid) {
                this.logAuditInformation(entityName, authenticateUuid, fpUuid, data);
            }
        }
        else {
            authenticateUuid = entityUuid;
            this.logAuditInformation(entityName, entityUuid, fpUuid, data);
        }
    }
    async logAuditInformation(entityName, entityUuid, fpUuid, data) {
        var _a;
        // Update authenticationLogSchema
        let authenticationLog = {
            uuid: entityUuid,
            fpUuid: fpUuid,
            eventDate: new Date(),
            personID: (_a = data.fileData.personIdentifier) !== null && _a !== void 0 ? _a : '',
            machineID: data.machineID,
        };
        let authenticationLogPayload = {
            uuid: new export_1.Uuid().generateId(),
            fileName: entityName + "-" + new export_1.Uuid().generateId(),
            fileType: "json" /* JSON */,
            entityName: entityName,
            fileData: authenticationLog
        };
        await this.ZKTFpService.addData(entityName, authenticationLogPayload);
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map