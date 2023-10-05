/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { ConsoleLogger, Inject, Injectable, Optional } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  fromEvent,
  observable,
  Observable,
  Observer,
  Subject,
  Subscriber,
  Subscription,
  throwError,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosRequestConfig } from 'axios'; // For type definition only
import { URLs } from '../../../_config/DP.config';

import { v4 as uuidv4 } from 'uuid';
import { MessageDeliveryInterface } from '../../../_interfaces/MD.interface';

import {
  ExceptionType,
  NotificationMessage,
  RequestMessage,
  ResponseMessage,
  ResponseStatus,
  StatusException,
  StatusResponse,
  SubscriptionMessage,
} from '../../../_dependencies/FISAppMessageJSUtility/interface/export';

import { FisCreateMessageUtility } from '../../../_dependencies/FISAppMessageJSUtility/interface/export'; // Message Library
//import { io } from "socket.io-client";
const io = require('socket.io-client');
import { Socket } from 'socket.io-client';
import { ConnectionInterface } from '../../../_interfaces/MD.connection.interface';

export class SocketIODomainProxyServiceClass implements MessageDeliveryInterface {
  // Reference to :http://swopt.com:3000/swopt/ng-app-web/src/nativescript/src/app/services/socket.io.service.tns.ts
  
  private settings:ConnectionInterface;
  public DATA_URL;
  public targets: { [key: string]: string };
  public http_Service: HttpService;
  public https_Agent;
  public MessageService: FisCreateMessageUtility;
  public socket: Socket;
  public isConnectionStatusObserved = false;

  initialise(settings:ConnectionInterface){
    this.settings = settings;
    this['status'] = 'disconnected';
  }

  emit(msg: NotificationMessage) {
    let subject: Subject<any> = new Subject();

    // Sent
    //let subscription = this.send(msg,true).subscribe();  // Force it to send by subscribe
    // No return value
    let subscription = this.send(msg, true).subscribe(subject); // Force it to send by subscribe

    return subject.asObservable();
  }

  send(
    msg: RequestMessage | NotificationMessage,
    isStream: boolean = true,
    connection?: {},
  ): Observable<ResponseMessage> {
    // Handle first time connection used.
    if (!connection) {
      connection = {};
    }

    let observer: Subscriber<any>;
    let observableResult: Observable<ResponseMessage> = new Observable<any>(
      (localObserver) => {
        observer = localObserver;

        // establish connection to server if socket is uninitialized
        this.connect().then((socket) => {
          // Bind the observable to the socket
          this.bindObserverToSocket(
            this.socket,
            observer,
            isStream,
            connection,
            msg.header.security.ucpId,
            msg.header.messageID,
          );

          this.socket['observableResult'] = observableResult;

          this.socket.emit('request', this.MessageService.getDPmessage(msg));
        });
      },
    ).pipe(map((resp) => this.convertFisAppResponse(resp)));

    return observableResult;
  }

  bindObserverToSocket(
    socket: Socket,
    observer: Subscriber<any>,
    isStream: boolean,
    connection,
    ucpId: string,
    requestId: string,
  ) {
    {
      socket.on('connect', () => {
        console.log('Client connected.');
      });

      socket.on('response', (res: any) => {
        if (res.id > '') {
          //this.count = this.count + 1;
          //console.log(String(this.count)+" rec-> "+JSON.stringify(res,null,4)); // Testing logging

          if (!res.complete) {
            if (res.message) {
              const response_msg = JSON.parse(res.message);
              let requestRespondtoID = '';

              // If having res.id
              if (res.id) {
                requestRespondtoID = res.id;
              }

              // If have response_msg.data.uiMessage.header.messageID field
              if (
                requestRespondtoID == '' &&
                response_msg &&
                response_msg.header &&
                response_msg.header.requestMessageRespondTo &&
                response_msg.header.requestMessageRespondTo.data &&
                response_msg.header.requestMessageRespondTo.data.uiMessage &&
                response_msg.header.requestMessageRespondTo.data.uiMessage
                  .header &&
                response_msg.header.requestMessageRespondTo.data.uiMessage
                  .header.messageID
              ) {
                requestRespondtoID =
                  response_msg.header.requestMessageRespondTo.data.uiMessage
                    .header.messageID;
              }

              // If have response_msg.header.requestMessageRespondTo.header.messageID field
              if (
                requestRespondtoID == '' &&
                response_msg &&
                response_msg.header &&
                response_msg.header.requestMessageRespondTo &&
                response_msg.header.requestMessageRespondTo.header &&
                response_msg.header.requestMessageRespondTo.header.messageID
              ) {
                requestRespondtoID =
                  response_msg.header.requestMessageRespondTo.header.messageID;
              }

              // If have response to ID
              if (requestRespondtoID > '') {
                // must be same as request Id
                if (requestRespondtoID == requestId) {
                  observer.next(res);
                }
              } else {
                // Else, also send to observable
                observer.next(res);
              }
            }
          } else if (res.complete) {
            // Only complete for own request.
            if (
              res.message &&
              res.message.requestId &&
              res.message.requestId == requestId
            ) {
              observer.complete();
            }
          }
        } else {
          console.log('Connection error');
          console.log(res);
        }

        if (!isStream)
          if (res.complete) {
            //socket.close();
            if (observer) observer.complete();
          }
      });

      socket.on('error', (res: any) => {
        console.log('SocketError' + res);

        let error_data: StatusException = {
          status: '-1',
          message: res,
        };
        let error_msg = this.MessageService.getResponseExceptionMessage(
          ucpId,
          {
            StatusException: error_data,
          },
          this.MessageService.getCommandMessage_ext(ucpId, '', ''),
          ResponseStatus.ExecutionException,
          ExceptionType.ServerUnavailable,
        );

        if (this.isConnectionStatusObserved) {
          observer.next(error_msg);
        }
      });

      socket.on('disconnect', (reason) => {
        if (reason != 'io client disconnect') {
          connection.status = 'Error';
          console.log('Socket disconnection.' + reason);
        } else {
          connection.status = 'Closed';
          console.log('Socket closed by client.' + reason);
        }

        let error_data: StatusException = {
          status: '-1',
          message: reason,
        };
        let error_msg = this.MessageService.getResponseExceptionMessage(
          ucpId,
          {
            StatusException: error_data,
          },
          this.MessageService.getCommandMessage_ext(ucpId, '', ''),
          ResponseStatus.ExecutionException,
          ExceptionType.ServerUnavailable,
        );

        if (this.isConnectionStatusObserved) {
          observer.next(error_msg);
        }
      });

      socket.on('connect', () => {
        let status_data: StatusResponse = {
          status: '1',
          message: 'Connection started',
        };
        let status_msg = this.MessageService.getResponseStatusMessage(
          ucpId,
          {
            StatusResponse: status_data,
          },
          this.MessageService.getCommandMessage_ext(ucpId, '', ''),
          ResponseStatus.ExecutionCompleted,
          ExceptionType.ServerUnavailable,
        );

        if (this.isConnectionStatusObserved) {
          observer.next(status_msg);
        }
      });
    }
  }

  subscribe(msg: SubscriptionMessage): Observable<ResponseMessage> {
    let requestMsg: RequestMessage;
    requestMsg = msg;

    // Sent and get observable
    let observableResult: Observable<ResponseMessage> = this.send(requestMsg);

    return observableResult;
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

  private connect(): Promise<any> {
    if (this.socket && this.socket.connected) {
      return new Promise((resolve) => {
        return resolve(this.socket);
      });
    } else {
      return this.createSocket().then((socket: Socket) => {
        this.socket = socket;
      });
    }
  }

  private createSocket(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // this.socket = io(this.DATA_URL, {  pingTimeout: 30000, reconnectionDelayMax: 1000,  auth: {},  query: {}})
      let socket: Socket = new io(this.DATA_URL, {
        autoConnect: true,
        auth: {},
        query: {},
      });
      resolve(socket);
      return socket;
    });
  }

  constructor(private readonly http?: HttpService) {}

  public getMessageService() {
    return this.MessageService;
  }

  public switchServer(ServerDBName: string) {
    if (URLs.NESTWS_ALL[ServerDBName]) {
      this.DATA_URL = URLs.NESTWS_ALL[ServerDBName];

      return this.connect();
    }
  }
}

export const socketIODomainProxyService: SocketIODomainProxyServiceClass =
  new SocketIODomainProxyServiceClass();
