import { HttpService } from '@nestjs/axios';
import { Observable, Subscriber } from 'rxjs';
import { MessageDeliveryInterface } from '../interface/MD.interface';
import { NotificationMessage, RequestMessage, ResponseMessage, SubscriptionMessage } from '../dependencies/FISAppMessageJSUtility/interface/export';
import { FisCreateMessageUtility } from '../dependencies/FISAppMessageJSUtility/interface/export';
import { Socket } from 'socket.io-client';
import { ConnectionInterface } from '../interface/MD.connection.interface';
export declare class SocketIODomainProxyServiceClass implements MessageDeliveryInterface {
    private readonly http?;
    private settings;
    DATA_URL: any;
    targets: {
        [key: string]: string;
    };
    http_Service: HttpService;
    https_Agent: any;
    MessageService: FisCreateMessageUtility;
    socket: Socket;
    isConnectionStatusObserved: boolean;
    initialise(settings: ConnectionInterface): void;
    emit(msg: NotificationMessage): Observable<any>;
    send(msg: RequestMessage | NotificationMessage, isStream?: boolean, connection?: {}): Observable<ResponseMessage>;
    bindObserverToSocket(socket: Socket, observer: Subscriber<any>, isStream: boolean, connection: any, ucpId: string, requestId: string): void;
    subscribe(msg: SubscriptionMessage): Observable<ResponseMessage>;
    convertFisAppResponse(resp: any): ResponseMessage;
    private connect;
    private createSocket;
    constructor(http?: HttpService);
    getMessageService(): FisCreateMessageUtility;
    switchServer(ServerDBName: string): Promise<any>;
}
export declare const socketIODomainProxyService: SocketIODomainProxyServiceClass;
