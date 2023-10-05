/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import {
  ConsoleLogger,
  Controller,
  Inject,
  Injectable,
  Optional,
  UseInterceptors,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import {
  ConnectionInterface,
} from '../_interfaces/MD.connection.interface';
import { MessageDeliveryInterface,MessageDeliveryRunTimeInterface } from '../_interfaces/MD.interface';

import {
  NotificationMessage,
  RequestMessage,
  ResponseMessage,
  SubscriptionMessage,
} from '../_dependencies/FISAppMessageJSUtility/interface/export'; 

import { FisCreateMessageUtility } from '../_dependencies/FISAppMessageJSUtility/interface/export'; // Message Library
import { SocketIODomainProxyServiceClass } from './MessageTransmission/socketio/MD.socketio.service';
import { AxiosHttpDomainProxyServiceClass } from './MessageTransmission/http/MD.http.service';
import { MicroserviceDomainProxyService } from './MessageTransmission/microservice/MD.microservice.service';
import { GRPCDomainProxyServiceClass } from './MessageTransmission/grpc/_behaviour/MD.grpc.service';
import { URLs } from '../_config/DP.config';
import { firstValueFrom, Observable, pipe, share, shareReplay, Subject } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { LoggingService } from './LoggingService/logging.service';
import { BasicActor } from '../_dependencies/BasicActor/src/basic.actor';
import { Behaviour, PubSubInterface } from '../_interfaces/actor.operations';

//export class MessageDeliveryController extends BasicActor implements Behaviour,PubSubInterface {
export class MessageDeliveryController {
  private connectionsList: {
    [connectionIdName: string]:
      | MessageDeliveryInterface
      | MessageDeliveryRunTimeInterface;
  } = {};

  protected MessageService: FisCreateMessageUtility;
  public http_Service: HttpService;
  protected readonly logger = new LoggingService(MessageDeliveryController.name);

  // Contructor
  constructor(settings?:any){ 
    // Parent
    //super(settings);
    // Auto initialise
    //this.initialise(settings);
  }

  getLogger(): LoggingService {
    return this.logger;
  }

  getConnection(connectionIdName: string) {
    let currentConnectionIdName = connectionIdName;

    if (currentConnectionIdName == '') {
      currentConnectionIdName = 'Default';

      // Start default if not yet started
      if (!this.connectionsList[currentConnectionIdName]) {
        // Set defaults
        this.setConnection({
          // Identifier Name that is Unique
          IdName: 'Default',
          // Description
          Description: 'Default connection.',
          // Type
          //Type: 'SocketIO', // 2023-03-13 - Change default to HTTP
          Type: 'Http', // 2023-03-13 - Change default to HTTP
          // Type
          Target: URLs.NESTWS,
        });
      }
    }

    return this.connectionsList[currentConnectionIdName];
  }

  setIsConnectionStatusObserved(connectionIdName: string, isObserved: boolean) {
    this.getConnection(connectionIdName).isConnectionStatusObserved =
      isObserved;
  }

  getIsConnectionStatusObserved(connectionIdName: string, isObserved: boolean) {
    return this.getConnection(connectionIdName).isConnectionStatusObserved;
  }

  setConnection(settings: ConnectionInterface) {
    let connectionIdName: string = settings.IdName;

    if (settings.Type == 'SocketIO') {
      // Set instance
      let DP = new SocketIODomainProxyServiceClass();
      DP.DATA_URL = settings.Target;
      DP.initialise(settings);  
      this.connectionsList[connectionIdName] = DP;
    }

    if (settings.Type == 'Http') {
      // Set instance
      let DP = new AxiosHttpDomainProxyServiceClass();
      DP.DATA_URL = settings.Target;
      DP.initialise(settings);  
      this.connectionsList[connectionIdName] = DP;
    }

    if (settings.Type == 'Microservice') {
      // Set instance
      let DP = new MicroserviceDomainProxyService();
      DP.initialise(settings);  
      this.connectionsList[connectionIdName] = DP;
    }

    if (settings.Type == 'grpc') {
      // Set instance
      let DP = new GRPCDomainProxyServiceClass();
      DP.initialise(settings);  
      this.connectionsList[connectionIdName] = DP;
    }

    if (this.getMessageService()) {
      // Refresh all message services to be same
      this.changeMessageService(this.getMessageService());
    }

    return this.connectionsList[connectionIdName];
  }

  changeMessageService(messageService: FisCreateMessageUtility) {
    this.MessageService = messageService;

    // Update shared services
    for (const key in this.connectionsList) {
      this.connectionsList[key].MessageService = this.MessageService =
        messageService;
    }
  }

  getMessageService() {
    return this.MessageService;
  }

  emit(connectionIdName: string, msg: NotificationMessage) {
    this.logger.addToLog(msg, ['emit']);
    return this.getConnection(connectionIdName).emit(msg);
  }

  send(
    connectionIdName: string,
    msg: RequestMessage,
    isStreamable: boolean = true,
    connection?: {},
    newConnection: boolean = false,
  ): Observable<ResponseMessage> {
    let observableResult: Subject<ResponseMessage> = new Subject();
    let type: string = '';

    // Add request to log
    this.logger.addToLog(msg, ['send', 'request']);

    // Add response to log
    this.logger.subscribeToLog(observableResult, ['send', 'response']);

    if (
      this.getConnection(connectionIdName) &&
      this.getConnection(connectionIdName)['settings']['Type']
    ) {
      type = this.getConnection(connectionIdName)['settings'];
    }

    if (type == 'SocketIO') {
      let DP: SocketIODomainProxyServiceClass = this.getConnection(
        connectionIdName,
      ) as SocketIODomainProxyServiceClass;
      DP.send(msg, isStreamable, connection).subscribe(observableResult); // subscribe to share send observable result to subject
    } else if (type == '') {
      throw new Error('Unknown or uninitialised connection type set.');
    } else {
      this.getConnection(connectionIdName)
        .send(msg)
        .subscribe(observableResult); // subscribe to share send observable result to subject
    }

    return observableResult.asObservable();
  }

  subscribe(
    connectionIdName: string,
    msg: SubscriptionMessage,
    isStream: boolean = true,
    connection?: {},
  ): Observable<ResponseMessage> {
    // Note:
    // AxiosHTTP subscription is okay.
    // Socket.io subscription is okay.
    // Grpc subscription may be okay.

    // Add to log
    this.logger.addToLog(msg, ['subscribe']);

    return this.send(connectionIdName, msg, isStream, connection);
  }

  subscribeWithCallback(connectionIdName, msg: SubscriptionMessage, callback?) {
    let connection = {
      status: 'connected',
    };
    let subscription = this.subscribe(
      connectionIdName,
      msg,
      true,
      connection,
    ).subscribe({
      next: (resp: ResponseMessage) => {
        callback.next(resp);
      },
      error: (err) => {
        if (subscription) subscription.unsubscribe();
        callback.error(err);
      },
      complete: () => {
        if (subscription) subscription.unsubscribe();

        if (connection.status == 'Error') {
          console.log('Error.');
          console.log('Reconnecting...');
          this.subscribeWithCallback(connectionIdName, msg, callback);
        } else {
          console.log('Subscription closed.');
          console.log('Reconnecting....');
          this.subscribeWithCallback(connectionIdName, msg, callback);
        }
        callback.complete();
      },
    });
    return subscription;
  }

  // Added promise to satify simple use case. Please use observable as necessarily.
  sendPromise(
    connectionIdName: string,
    msg: RequestMessage, 
  ): Promise<ResponseMessage> {

    let observableResponse: Observable<ResponseMessage> = this.send(
                                          connectionIdName,
                                          msg 
                                        )

    return firstValueFrom(observableResponse); 
  }
}
