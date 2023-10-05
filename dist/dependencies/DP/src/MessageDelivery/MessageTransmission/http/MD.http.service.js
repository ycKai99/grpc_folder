"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosHttpDomainProxyService = exports.AxiosHttpDomainProxyServiceClass = void 0;
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DP_config_1 = require("../../../_config/DP.config");
const export_1 = require("../../../_dependencies/FISAppMessageJSUtility/interface/export");
const https_1 = require("https");
class AxiosHttpDomainProxyServiceClass {
    initialise(settings) {
        this.settings = settings;
    }
    emit(msg) {
        let subject = new rxjs_1.Subject();
        this.send(msg).subscribe(subject);
        return subject.asObservable();
    }
    send(msg) {
        let observableResult;
        let internalBuffer = '';
        if (this.http_config.responseType == 'stream') {
            this.http_config.method = 'post';
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
                            let temp = internalBuffer + data;
                            temp = JSON.parse(temp);
                            if (temp[0]) {
                                temp = temp[0];
                            }
                            subscriber.next(temp);
                            internalBuffer = '';
                        }
                        catch (e) {
                            internalBuffer = internalBuffer + data;
                        }
                    });
                    res.data.on('error', (error) => {
                        if (this.isConnectionStatusObserved) {
                            subscriber.next(error);
                        }
                    });
                    res.data.on('end', () => {
                        if (internalBuffer > '') {
                            let buffer_data = {
                                status: '-1',
                                message: 'Buffer is not clear, something is wrong. ' +
                                    internalBuffer,
                            };
                            let buffer_msg = this.MessageService.getResponseExceptionMessage(msg.header.security.ucpId, {
                                StatusException: buffer_data,
                            }, msg, export_1.ResponseStatus.ExecutionException, export_1.ExceptionType.ServerUnavailable);
                            if (this.isConnectionStatusObserved) {
                                subscriber.next(buffer_msg);
                            }
                            console.log('Error clearing buffer.');
                        }
                        let res_data = {
                            status: '1',
                            message: 'HTTP connection ended.',
                        };
                        let res_msg = this.MessageService.getResponseStatusMessage(msg.header.security.ucpId, {
                            StatusResponse: res_data,
                        }, msg, export_1.ResponseStatus.ExecutionCompleted, export_1.ExceptionType.ServerUnavailable);
                        if (this.isConnectionStatusObserved) {
                            subscriber.next(res_msg);
                        }
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
                    if (this.isConnectionStatusObserved) {
                        subscriber.next(error_msg);
                    }
                    subscriber.error(err);
                    subscriber.complete();
                    console.log("Connection error occurred.");
                    console.log(err.message);
                });
            });
        }
        else {
            observableResult = this.http_Service
                .post(this.DATA_URL, this.MessageService.getDPmessage(msg), this.http_config)
                .pipe((0, operators_1.map)((resp) => this.convertAxiosResponseToFisAppResponse(resp)));
        }
        return observableResult;
    }
    subscribe(msg) {
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
            let https = require('https');
            this.https_Agent = new https.Agent({
                keepAlive: true,
                rejectUnauthorized: false,
            });
        }
        if (!http) {
            this.http_Service = new axios_1.HttpService();
        }
    }
    getMessageService() {
        return this.MessageService;
    }
}
exports.AxiosHttpDomainProxyServiceClass = AxiosHttpDomainProxyServiceClass;
exports.AxiosHttpDomainProxyService = new AxiosHttpDomainProxyServiceClass();
//# sourceMappingURL=MD.http.service.js.map