import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { MessageDeliveryInterface } from '../interface/MD.interface';
import { FisCreateMessageUtility, NotificationMessage, RequestMessage, ResponseMessage, SubscriptionMessage } from '../dependencies/FISAppMessageJSUtility/interface/export';
import { ConnectionInterface } from '../interface/MD.connection.interface';
export declare class AxiosHttpDomainProxyServiceClass implements MessageDeliveryInterface {
    private readonly http?;
    DATA_URL: string;
    targets: {
        [key: string]: string;
    };
    http_Service: HttpService;
    https_Agent: any;
    MessageService: FisCreateMessageUtility;
    http_config: AxiosRequestConfig;
    isConnectionStatusObserved: boolean;
    private settings;
    initialise(settings: ConnectionInterface): void;
    emit(msg: NotificationMessage): Observable<ResponseMessage>;
    send(msg: RequestMessage): Observable<ResponseMessage>;
    subscribe(msg: SubscriptionMessage): Observable<ResponseMessage>;
    convertAxiosResponseToFisAppResponse(resp: any): ResponseMessage;
    convertAxiosResponseToNotification(resp: any): NotificationMessage;
    constructor(http?: HttpService);
    getMessageService(): FisCreateMessageUtility;
}
export declare const AxiosHttpDomainProxyService: AxiosHttpDomainProxyServiceClass;
