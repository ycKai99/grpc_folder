"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosHttpDomainProxyService = exports.AxiosHttpDomainProxyServiceClass = void 0;
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DP_config_1 = require("../config/DP.config");
const export_1 = require("../dependencies/FISAppMessageJSUtility/interface/export");
const https_1 = require("https");
class AxiosHttpDomainProxyServiceClass {
    constructor(http) {
        this.http = http;
        this.DATA_URL = DP_config_1.URLs.NESTWS;
        this.http_config = {
            responseType: 'stream',
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        };
        this.isConnectionStatusObserved = false;
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
            this.http_Service = new axios_1.HttpService();
        }
    }
    initialise(settings) {
        this.settings = settings;
    }
    emit(msg) {
        let subject = new rxjs_1.Subject();
        // Sent and get observable
        this.send(msg).subscribe(subject);
        return subject.asObservable();
    }
    send(msg) {
        // Sent and get observable
        let observableResult;
        let internalBuffer = '';
        if (this.http_config.responseType == 'stream') {
            this.http_config.method = 'post';
            //this.http_config.url = this.DATA_URL + '/request';
            if (!this.http_config.url) {
                this.http_config.url = this.DATA_URL;
            }
            this.http_config.data = this.MessageService.getDPmessage(msg);
            let subscriber;
            observableResult = new rxjs_1.Observable((thisSubscriber) => {
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
                        }
                        catch (e) {
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
                            let buffer_data = {
                                status: '-1',
                                message: 'Buffer is not clear, something is wrong. ' +
                                    internalBuffer,
                            };
                            let buffer_msg = this.MessageService.getResponseExceptionMessage(msg.header.security.ucpId, {
                                StatusException: buffer_data,
                            }, msg, export_1.ResponseStatus.ExecutionException, export_1.ExceptionType.ServerUnavailable);
                            // Observe connection status in next event or not?
                            if (this.isConnectionStatusObserved) {
                                subscriber.next(buffer_msg);
                            }
                            console.log('Error clearing buffer.');
                        }
                        // Connection closed
                        let res_data = {
                            status: '1',
                            message: 'HTTP connection ended.',
                        };
                        let res_msg = this.MessageService.getResponseStatusMessage(msg.header.security.ucpId, {
                            StatusResponse: res_data,
                        }, msg, export_1.ResponseStatus.ExecutionCompleted, export_1.ExceptionType.ServerUnavailable);
                        // Observe connection status in next event or not?
                        if (this.isConnectionStatusObserved) {
                            subscriber.next(res_msg);
                        }
                        // To avoid confusing the library user, this message is removed. 
                        //console.log('HTTP connection closed.');
                        subscriber.complete();
                    });
                    if (res) {
                        let status_data = {
                            status: '1',
                            message: 'Connection started',
                        };
                        let status_msg = this.MessageService.getResponseStatusMessage(msg.header.security.ucpId, {
                            StatusResponse: status_data,
                        }, msg, export_1.ResponseStatus.ExecutionCompleted, export_1.ExceptionType.ServerUnavailable);
                        if (this.isConnectionStatusObserved) {
                            subscriber.next(status_msg);
                        }
                    }
                })
                    .catch((err) => {
                    let error_data = {
                        status: '-1',
                        message: err.message,
                    };
                    let error_msg = this.MessageService.getResponseExceptionMessage(msg.header.security.ucpId, {
                        StatusException: error_data,
                    }, msg, export_1.ResponseStatus.ExecutionException, export_1.ExceptionType.ServerUnavailable);
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
        }
        else {
            observableResult = this.http_Service
                .post(
            //this.DATA_URL + '/request',
            this.DATA_URL, this.MessageService.getDPmessage(msg), this.http_config) // here is Observable<AxiosResponse>
                .pipe(operators_1.map((resp) => this.convertAxiosResponseToFisAppResponse(resp))); // converted to Observable<ResponseMessage>
        }
        return observableResult;
    }
    subscribe(msg) {
        // Sent and get observable
        return this.send(msg);
    }
    convertAxiosResponseToFisAppResponse(resp) {
        let message;
        message = resp.data;
        return message;
    }
    convertAxiosResponseToNotification(resp) {
        let message;
        message = resp;
        return message;
    }
    getMessageService() {
        return this.MessageService;
    }
}
exports.AxiosHttpDomainProxyServiceClass = AxiosHttpDomainProxyServiceClass;
exports.AxiosHttpDomainProxyService = new AxiosHttpDomainProxyServiceClass();
//# sourceMappingURL=MD.http.service.js.map