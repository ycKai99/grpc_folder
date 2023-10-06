import { base_notification_handler_class, handler_interface } from '../base/base_notification_handler';
import { Subject } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { ResponseMessage } from '../_dependencies/DP/src/interface/export';
export declare class remote_fingerprint_synchronization_class extends base_notification_handler_class implements handler_interface {
    app: string;
    UCP_Id: string;
    n8n_url: string;
    previous_UCP_Id: string;
    http_config: AxiosRequestConfig;
    handler_id: number;
    private localhost;
    constructor();
    send_message(handler_id: number, steps_id: number): Promise<ResponseMessage>;
    publishForRemoteFingerprintSynchronizationRequested(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForSynchronizationNextFingerprintStarted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingCompleted(inputObservable: Subject<any>): Subject<unknown>;
    subscribeForProcessingError(inputObservable: Subject<any>): Subject<unknown>;
}
