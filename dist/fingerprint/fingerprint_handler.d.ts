import { base_notification_handler_class } from "../base/base_notification_handler";
import { ZKTFingerprintService } from "./_utility/app.zkt_fingerprint.service";
export declare class fingerprint_class extends base_notification_handler_class {
    fingerprint_processor: ZKTFingerprintService;
    constructor();
    getZKTFingerprintService(): Promise<ZKTFingerprintService>;
}
