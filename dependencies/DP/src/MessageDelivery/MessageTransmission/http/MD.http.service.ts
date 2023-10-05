/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { HttpService } from '@nestjs/axios';
import {
  combineLatest,
  forkJoin,
  identity,
  merge,
  observable,
  Observable,
  Observer,
  of,
  Subject,
  Subscriber,
  Subscription,
  throwError,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosRequestConfig } from 'axios'; // For type definition only
import { URLs } from '../../../_config/DP.config';

import { MessageDeliveryInterface } from '../../../_interfaces/MD.interface';

import {
  ExceptionType,
  FisCreateMessageUtility,
  NotificationMessage,
  RequestMessage,
  ResponseException,
  ResponseMessage,
  ResponseStatus,
  StatusException,
  StatusResponse,
  SubscriptionMessage,
} from '../../../_dependencies/FISAppMessageJSUtility/interface/export';
import { Agent } from 'https';
import { ConnectionInterface } from '../../../_interfaces/MD.connection.interface';

export class AxiosHttpDomainProxyServiceClass implements MessageDeliveryInterface {
  public DATA_URL = URLs.NESTWS;
  public targets: { [key: string]: string };
  public http_Service: HttpService;
  public https_Agent;
  public MessageService: FisCreateMessageUtility;
  public http_config: AxiosRequestConfig = {
    responseType: 'stream',
    httpsAgent: new Agent({
      rejectUnauthorized: false
    })
  };
  public isConnectionStatusObserved = false;

  private settings:ConnectionInterface;

  initialise(settings:ConnectionInterface){
    this.settings = settings;
  }
  emit(msg: NotificationMessage): Observable<ResponseMessage> {
    let subject: Subject<any> = new Subject();

    // Sent and get observable
    this.send(msg as unknown as RequestMessage).subscribe(subject);

    return subject.asObservable();
  }

  send(msg: RequestMessage): Observable<ResponseMessage> {
    // Sent and get observable
    let observableResult: Observable<ResponseMessage>;
    let internalBuffer = '';

    if (this.http_config.responseType == 'stream') {
      this.http_config.method = 'post';
      //this.http_config.url = this.DATA_URL + '/request';
      if(!this.http_config.url)
      { 
        this.http_config.url = this.DATA_URL;
      }
      this.http_config.data = this.MessageService.getDPmessage(msg);

      let subscriber: Subscriber<any>;
      observableResult = new Observable((thisSubscriber) => {
        subscriber = thisSubscriber;

        this.http_Service.axiosRef
          .request(this.http_config)
          .then((res) => {
            res.data.on('data', (data) => {
              data = data.toString();

              try {
                // Attempt to parse
                let temp = internalBuffer + data;
                temp = JSON.parse(temp);

                // Array conversion if needed
                if (temp[0]) {
                  temp = temp[0];
                }

                // If parse-able consider a full message
                subscriber.next(temp);

                // Reset buffer
                internalBuffer = '';
              } catch (e) {
                // Else, something is wrong so add to buffer
                // console.log(e.message);
                // console.log(data);
                internalBuffer = internalBuffer + data;
              }
              //console.log(data);
            });

            res.data.on('error', (error) => {
              // Observe connection status in next event or not?
              if (this.isConnectionStatusObserved) {
                subscriber.next(error);
              }
              //console.log(error);
            });

            res.data.on('end', () => {
              // Check buffer
              if (internalBuffer > '') {
                let buffer_data: StatusException = {
                  status: '-1',
                  message:
                    'Buffer is not clear, something is wrong. ' +
                    internalBuffer,
                };
                let buffer_msg =
                  this.MessageService.getResponseExceptionMessage(
                    msg.header.security.ucpId,
                    {
                      StatusException: buffer_data,
                    },
                    msg,
                    ResponseStatus.ExecutionException,
                    ExceptionType.ServerUnavailable,
                  );

                // Observe connection status in next event or not?
                if (this.isConnectionStatusObserved) {
                  subscriber.next(buffer_msg);
                }

                console.log('Error clearing buffer.');
              }

              // Connection closed
              let res_data: StatusResponse = {
                status: '1',
                message: 'HTTP connection ended.',
              };
              let res_msg = this.MessageService.getResponseStatusMessage(
                msg.header.security.ucpId,
                {
                  StatusResponse: res_data,
                },
                msg,
                ResponseStatus.ExecutionCompleted,
                ExceptionType.ServerUnavailable,
              );

              // Observe connection status in next event or not?
              if (this.isConnectionStatusObserved) {
                subscriber.next(res_msg);
              }

              // To avoid confusing the library user, this message is removed. 
              //console.log('HTTP connection closed.');

              subscriber.complete();
            });

            if (res) {
              let status_data: StatusResponse = {
                status: '1',
                message: 'Connection started',
              };
              let status_msg = this.MessageService.getResponseStatusMessage(
                msg.header.security.ucpId,
                {
                  StatusResponse: status_data,
                },
                msg,
                ResponseStatus.ExecutionCompleted,
                ExceptionType.ServerUnavailable,
              );

              if (this.isConnectionStatusObserved) {
                subscriber.next(status_msg);
              }
            }
          })
          .catch((err) => {
            let error_data: StatusException = {
              status: '-1',
              message: err.message,
            };
            let error_msg = this.MessageService.getResponseExceptionMessage(
              msg.header.security.ucpId,
              {
                StatusException: error_data,
              },
              msg,
              ResponseStatus.ExecutionException,
              ExceptionType.ServerUnavailable,
            );

            // Observe connection status in next event or not?
            if (this.isConnectionStatusObserved) {
              subscriber.next(error_msg);
            }
            subscriber.error(err);
            subscriber.complete();
            console.log("Connection error occurred.");
            console.log(err.message);
            //console.log("Was here");
          });
      });
    } else {
      observableResult = this.http_Service
        .post(
          //this.DATA_URL + '/request',
          this.DATA_URL,
          this.MessageService.getDPmessage(msg),
          this.http_config,
        ) // here is Observable<AxiosResponse>
        .pipe(map((resp) => this.convertAxiosResponseToFisAppResponse(resp))); // converted to Observable<ResponseMessage>
    }

    return observableResult;
  }

  subscribe(msg: SubscriptionMessage): Observable<ResponseMessage> {
    // Sent and get observable
    return this.send(<RequestMessage>msg);
  }

  convertAxiosResponseToFisAppResponse(resp: any) {
    let message: ResponseMessage;
    message = resp.data;
    return message;
  }

  convertAxiosResponseToNotification(resp: any) {
    let message: NotificationMessage;
    message = resp;
    return message;
  }

  constructor(private readonly http?: HttpService) {
    if (!this.https_Agent) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      let https = require('https');
      this.https_Agent = new https.Agent({
        keepAlive: true,
        rejectUnauthorized: false,
      });
    }

    // New http service
    if (!http) {
      this.http_Service = new HttpService();
    }
  }

  public getMessageService() {
    return this.MessageService;
  }
}

export const AxiosHttpDomainProxyService: AxiosHttpDomainProxyServiceClass =
  new AxiosHttpDomainProxyServiceClass();
