import { ZKTFingerprintService } from "../fingerprint/_utility/app.zkt_fingerprint.service";
export declare class AuthenticationService {
    ZKTFpService: ZKTFingerprintService;
    deviceNo: string;
    authenticate(entityName: string, entityUuid: string, fpUuid?: string, data?: any): void;
    protected logAuditInformation(entityName: string, entityUuid: string, fpUuid?: string, data?: any): Promise<void>;
}
