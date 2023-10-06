"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprint_class = void 0;
const base_notification_handler_1 = require("../base/base_notification_handler");
const app_zkt_fingerprint_service_1 = require("./_utility/app.zkt_fingerprint.service");
class fingerprint_class extends base_notification_handler_1.base_notification_handler_class {
    constructor() {
        super();
        // class 
        this.fingerprint_processor = new app_zkt_fingerprint_service_1.ZKTFingerprintService();
        this.fingerprint_processor.fpInit();
    }
    async getZKTFingerprintService() {
        return this.fingerprint_processor;
    }
}
exports.fingerprint_class = fingerprint_class;
//# sourceMappingURL=fingerprint_handler.js.map