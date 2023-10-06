import { AuthenticationService } from '../../authentication/authentication.service';
import { ZKTFingerprintService } from "./app.zkt_fingerprint.service";
export declare class AuthenticationPaymentCollectionService extends AuthenticationService {
    ZKTFpService: ZKTFingerprintService;
    deviceNo: string;
    protected logAuditInformation(entityName: string, entityUuid: string, data?: any): Promise<void>;
}
