import { handler_interface } from "../base/base_notification_handler";
import { Subject } from 'rxjs';
import { AxiosRequestConfig } from "axios";
import { fingerprint_class } from "./fingerprint_handler";
import { ZKTFingerprintService } from "./_utility/app.zkt_fingerprint.service";
import { ResponseMessage } from "../_dependencies/DP/src/interface/export";
export declare class retrieve_person_for_fingerprint_class extends fingerprint_class implements handler_interface {
    app: string;
    UCP_Id: string;
    n8n_url: string;
    previous_UCP_Id: string;
    ZKTFpService: ZKTFingerprintService;
    personData: any;
    accessibleOrgnData: any;
    accessibleServiceProgramData: any;
    userData: any;
    databaseNameData: any;
    identifier: string;
    constructor();
    send_message(handler_id: number, steps_id: number): Promise<ResponseMessage>;
    getRecords(identifier: string): {
        'personData': [];
        'accessibleOrgnData': [];
        'accessibleServiceProgramData': [];
        'userData': {};
        'databaseName': string;
    };
    http_config: AxiosRequestConfig;
    handler_id: number;
    publishForReceivePersonRequested(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForRetrievedOrganisationInfo(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForLoginCompleted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForRetrievedPersonInfo(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForRetrievedServiceProgramData(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingCompleted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingError(inputObservable: Subject<any>): Subject<unknown>;
    getDatabaseName(): any;
    setDatabaseName(databaseName: any): void;
}
