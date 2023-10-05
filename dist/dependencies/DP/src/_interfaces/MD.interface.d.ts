import { Observable } from 'rxjs';
import { FisCreateMessageUtility, NotificationMessage, RequestMessage, ResponseMessage, SubscriptionMessage } from '../_dependencies/FISAppMessageJSUtility/interface/export';
import { ConnectionInterface } from './MD.connection.interface';
export interface MessageDeliveryInterface {
    initialise(settings: ConnectionInterface): any;
    emit(msg: NotificationMessage): Observable<ResponseMessage>;
    send(msg: RequestMessage): Observable<ResponseMessage>;
    subscribe?(msg: SubscriptionMessage): Observable<ResponseMessage>;
    MessageService?: FisCreateMessageUtility;
    isConnectionStatusObserved: boolean;
}
export interface MessageDeliveryRunTimeInterface extends MessageDeliveryInterface {
    settings: ConnectionInterface;
    UCP_ID?: string;
    status: 'connected' | 'disconnected' | 'close';
}
