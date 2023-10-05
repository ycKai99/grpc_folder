import { NotificationMessage, RequestMessage, ResponseMessage, SubscriptionMessage } from '../../_dependencies/FISAppMessageJSUtility/interface/export';
import { FisCreateMessageUtility } from '../../_dependencies/FISAppMessageJSUtility/interface/export';
import { Observable } from 'rxjs';
import { LoggingService } from '../LoggingService/logging.service';
import { ConnectionInterface } from '../../_interfaces/MD.connection.interface';
export declare class DomainProxyController {
    applicationName: string;
    private messageDeliveryController;
    constructor();
    initialise(applicationName: string): void;
    getLogger(): LoggingService;
    getConnection(connectionIdName: string): import("../../_interfaces/MD.interface").MessageDeliveryInterface | import("../../_interfaces/MD.interface").MessageDeliveryRunTimeInterface;
    setIsConnectionStatusObserved(connectionIdName: string, isObserved: boolean): void;
    getIsConnectionStatusObserved(connectionIdName: string, isObserved: boolean): boolean;
    setConnection(settings: ConnectionInterface): import("../../_interfaces/MD.interface").MessageDeliveryInterface | import("../../_interfaces/MD.interface").MessageDeliveryRunTimeInterface;
    setApplicationName(applicationName: string): void;
    changeMessageService(messageService: FisCreateMessageUtility): void;
    getMessageService(): FisCreateMessageUtility;
    emit(connectionIdName: string, msg: NotificationMessage): Observable<ResponseMessage>;
    send(connectionIdName: string, msg: RequestMessage, isStreamable?: boolean, connection?: {}, newConnection?: boolean): Observable<ResponseMessage>;
    subscribe(connectionIdName: string, msg: SubscriptionMessage, isStream?: boolean, connection?: {}): Observable<ResponseMessage>;
    subscribeWithCallback(connectionIdName: any, msg: SubscriptionMessage, callback?: any): import("rxjs").Subscription;
    sendPromise(connectionIdName: string, msg: RequestMessage, appName?: string): Promise<ResponseMessage>;
}
