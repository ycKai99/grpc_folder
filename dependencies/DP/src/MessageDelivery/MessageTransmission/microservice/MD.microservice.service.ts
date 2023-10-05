import { Controller, HttpService, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { ConnectionInterface } from '../../../_interfaces/MD.connection.interface';
import { MessageDeliveryInterface } from '../../../_interfaces/MD.interface';
import { FisCreateMessageUtility } from '../../../_dependencies/FISAppMessageJSUtility/interface/export';

import {
  NotificationMessage,
  RequestMessage,
  ResponseMessage,
  SubscriptionMessage,
} from '../../../_dependencies/FISAppMessageJSUtility/interface/export';

@Controller('')
export class MicroserviceDomainProxyService implements MessageDeliveryInterface {
  
  private settings:ConnectionInterface;
  public MessageService: FisCreateMessageUtility;
  public isConnectionStatusObserved = false;
  private client?: ClientProxy; // Not used

  initialise(settings:ConnectionInterface){
    this.settings = settings;
    this['status'] = 'disconnected';
  }

  emit(msg: NotificationMessage) {
    //this.client.emit("message",msg);
    return this.client
      .emit('message', msg)
      .pipe(map((resp) => this.convertFisAppResponse(resp)));
  }
  send(
    msg: RequestMessage | NotificationMessage,
    isStream: boolean = true,
  ): Observable<ResponseMessage> {
    return this.client
      .send('request', msg)
      .pipe(map((resp) => this.convertFisAppResponse(resp)));
  }

  convertFisAppResponse(resp: any): ResponseMessage {
    try {
      let message: ResponseMessage;
      message = JSON.parse(resp['message']);
      return message;
    } catch (e) {
      console.log('Error performing conversion.' + e);
      console.log(resp);
    }
  }

  startClient(client?: ClientProxy) {
    this.client = client;

    try {
      this.client.connect();
    } catch (e) {
      console.error(e);
    }
  }

  public getMessageService() {
    return this.MessageService;
  }
}

//export const MicroserviceDomainProxyService:MicroserviceDomainProxyServiceClass = new MicroserviceDomainProxyServiceClass();
