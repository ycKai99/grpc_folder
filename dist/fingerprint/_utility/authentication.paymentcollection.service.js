"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationPaymentCollectionService = void 0;
const authentication_service_1 = require("../../authentication/authentication.service");
const app_zkt_fingerprint_service_1 = require("./app.zkt_fingerprint.service");
const export_1 = require("../../_dependencies//DP/src/interface/export");
class AuthenticationPaymentCollectionService extends authentication_service_1.AuthenticationService {
    constructor() {
        super(...arguments);
        this.ZKTFpService = new app_zkt_fingerprint_service_1.ZKTFingerprintService();
    }
    async logAuditInformation(entityName, entityUuid, data) {
        // super.logAuditInformation(entityName, entityUuid, data);
        // Update authenticationLogByPaymentCollectionSchema
        let authenticationLogByPaymentCollection = {
            uuid: entityUuid,
            witness: data.witnesspersonIdentifier,
            amount: data.amount
        };
        let authenticationLogByPaymentCollectionPayload = {
            uuid: new export_1.Uuid().generateId(),
            fileName: entityName + "-" + new export_1.Uuid().generateId(),
            fileType: "json" /* JSON */,
            entityName: entityName,
            fileData: authenticationLogByPaymentCollection
        };
        await this.ZKTFpService.addData(entityName, authenticationLogByPaymentCollectionPayload);
    }
}
exports.AuthenticationPaymentCollectionService = AuthenticationPaymentCollectionService;
//# sourceMappingURL=authentication.paymentcollection.service.js.map