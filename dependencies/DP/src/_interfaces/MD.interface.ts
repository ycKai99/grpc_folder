/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable } from 'rxjs';

import {
  FisCreateMessageUtility,
  NotificationMessage,
  RequestMessage,
  ResponseMessage,
  ResponseStatusMessage,
  SubscriptionMessage,
} from '../_dependencies/FISAppMessageJSUtility/interface/export';

import { ConnectionInterface } from './MD.connection.interface';

export interface MessageDeliveryInterface {  
  // Setup connection interface
  initialise(settings:ConnectionInterface);

  // To emit event:
  emit(msg: NotificationMessage): Observable<ResponseMessage>;
  // To perform a task:
  send(msg: RequestMessage): Observable<ResponseMessage>;
  // To subscribe events:
  subscribe?(msg: SubscriptionMessage): Observable<ResponseMessage>;
  
  // Message Service
  MessageService?: FisCreateMessageUtility;
  // Observe connection status in next event or not?
  isConnectionStatusObserved: boolean; 
  
}

export interface MessageDeliveryRunTimeInterface extends MessageDeliveryInterface {
  // Settings
  settings: ConnectionInterface;
  // UCP_ID
  UCP_ID?: string;
  // Status
  status: 'connected' | 'disconnected' | 'close';
}

