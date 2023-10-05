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
 
import {
  NotificationMessage,
  RequestMessage,
  ResponseMessage,
  SubscriptionMessage,
} from '../../_dependencies/FISAppMessageJSUtility/interface/export';

import { FisCreateMessageUtility } from '../../_dependencies/FISAppMessageJSUtility/interface/export'; // Message Library
 
import { URLs } from '../../_config/DP.config';
import { Observable, pipe, share, shareReplay, Subject } from 'rxjs';
import { AxiosRequestConfig } from 'axios';  
import { MessageDeliveryController } from '../MD.controller';
import { LoggingService } from '../LoggingService/logging.service';
import { ConnectionInterface } from '../../_interfaces/MD.connection.interface';
@Controller('') // NestJS require provider at all contructor. Simplified with having it start by event listener. More flexibility.
export class DomainProxyController {

  public applicationName: string; 
  private messageDeliveryController = new MessageDeliveryController();

  constructor() {}

  initialise(applicationName: string) {
    this.setApplicationName(applicationName);
 
    // Initialise the connection
    if(applicationName > '')
    {
      this.setConnection({
        // Identifier Name that is Unique
        IdName: applicationName,
        // Description
        Description: applicationName +' connection.',
        // Type
        //Type: 'SocketIO', // 2023-03-13 - Change default to HTTP
        Type: 'Http', // 2023-03-13 - Change default to HTTP
        // Type
        Target: URLs.NESTWS,  
      });
    }
    else{
      this.getConnection('') // Initialise the connection
    }
  }

  getLogger(): LoggingService {
    return this.messageDeliveryController.getLogger();
  }

  getConnection(connectionIdName: string) { 
    return this.messageDeliveryController.getConnection(connectionIdName);
  }

  setIsConnectionStatusObserved(connectionIdName: string, isObserved: boolean) {
    return this.messageDeliveryController.setIsConnectionStatusObserved(connectionIdName,isObserved); 
  }

  getIsConnectionStatusObserved(connectionIdName: string, isObserved: boolean) {
    return this.messageDeliveryController.getIsConnectionStatusObserved(connectionIdName,isObserved);  
  }

  setConnection(settings: ConnectionInterface) {

    // 2023-03-20 - Added /request for https 
    if(settings.Type == 'Http' && settings.Target.slice(-8) != '/request')
    {
      settings.Target = settings.Target + '/request'
    }
    // End 2023-03-20 - Added /request for https 

    return this.messageDeliveryController.setConnection(settings); 
  } 
  
  setApplicationName(applicationName: string) {
    this.applicationName = applicationName;

    // Update shared services
    this.changeMessageService(
      new FisCreateMessageUtility(this.applicationName),
    );
  }

  changeMessageService(messageService: FisCreateMessageUtility) {
    return this.messageDeliveryController.changeMessageService(messageService);  
  }

  getMessageService() {
    return this.messageDeliveryController.getMessageService();   
  }

  emit(connectionIdName: string, msg: NotificationMessage) {
    return this.messageDeliveryController.emit(connectionIdName,msg);   
  }

  send(
    connectionIdName: string,
    msg: RequestMessage,
    isStreamable: boolean = true,
    connection?: {},
    newConnection: boolean = false,
  ): Observable<ResponseMessage> { 
    return this.messageDeliveryController.send(
      connectionIdName,
      msg,
      isStreamable,
      connection,
      newConnection
    );   
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
    return this.messageDeliveryController.subscribe(
      connectionIdName,
      msg,
      isStream,
      connection 
    );   
  }

  subscribeWithCallback(connectionIdName, msg: SubscriptionMessage, callback?) {  
    return this.messageDeliveryController.subscribeWithCallback(
      connectionIdName,
      msg,
      callback)
  }

  // Added promise to satify simple use case. Please use observable as necessarily.
  sendPromise(
    connectionIdName: string,
    msg: RequestMessage, 
    appName = this.applicationName
  ): Promise<ResponseMessage> {
    return this.messageDeliveryController.sendPromise(
      connectionIdName,
      msg)
  } 
}
