import { HttpService } from '@nestjs/axios';
import { ConnectionInterface } from '../interface/MD.connection.interface';
import { MessageDeliveryInterface, MessageDeliveryRunTimeInterface } from '../interface/MD.interface';
import { NotificationMessage, RequestMessage, ResponseMessage, SubscriptionMessage } from '../dependencies/FISAppMessageJSUtility/interface/export';
import { FisCreateMessageUtility } from '../dependencies/FISAppMessageJSUtility/interface/export';
import { Observable } from 'rxjs';
import { LoggingService } from '../queue/logging.service';
export declare class MessageDeliveryController {
    private connectionsList;
    protected MessageService: FisCreateMessageUtility;
    http_Service: HttpService;
    protected readonly logger: LoggingService;
    constructor();
    getLogger(): LoggingService;
    getConnection(connectionIdName: string): MessageDeliveryInterface | MessageDeliveryRunTimeInterface;
    setIsConnectionStatusObserved(connectionIdName: string, isObserved: boolean): void;
    getIsConnectionStatusObserved(connectionIdName: string, isObserved: boolean): boolean;
    setConnection(settings: ConnectionInterface): MessageDeliveryInterface | MessageDeliveryRunTimeInterface;
    changeMessageService(messageService: FisCreateMessageUtility): void;
    getMessageService(): FisCreateMessageUtility;
    emit(connectionIdName: string, msg: NotificationMessage): Observable<ResponseMessage>;
    send(connectionIdName: string, msg: RequestMessage, isStreamable?: boolean, connection?: {}, newConnection?: boolean): Observable<ResponseMessage>;
    subscribe(connectionIdName: string, msg: SubscriptionMessage, isStream?: boolean, connection?: {}): Observable<ResponseMessage>;
    subscribeWithCallback(connectionIdName: any, msg: SubscriptionMessage, callback?: any): import("rxjs").Subscription;
    sendPromise(connectionIdName: string, msg: RequestMessage): Promise<ResponseMessage>;
}
