import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ConnectionInterface } from '../interface/MD.connection.interface';
import { MessageDeliveryInterface } from '../interface/MD.interface';
import { FisCreateMessageUtility } from '../dependencies/FISAppMessageJSUtility/interface/export';
import { NotificationMessage, RequestMessage, ResponseMessage } from '../dependencies/FISAppMessageJSUtility/interface/export';
export declare class MicroserviceDomainProxyService implements MessageDeliveryInterface {
    private settings;
    MessageService: FisCreateMessageUtility;
    isConnectionStatusObserved: boolean;
    private client?;
    initialise(settings: ConnectionInterface): void;
    emit(msg: NotificationMessage): Observable<ResponseMessage>;
    send(msg: RequestMessage | NotificationMessage, isStream?: boolean): Observable<ResponseMessage>;
    convertFisAppResponse(resp: any): ResponseMessage;
    startClient(client?: ClientProxy): void;
    getMessageService(): FisCreateMessageUtility;
}
