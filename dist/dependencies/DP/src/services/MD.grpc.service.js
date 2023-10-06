"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.GRPCDomainProxyServiceClass = void 0;
const rxjs_1 = require("rxjs");
const messages_pb_1 = require("./grpc/messages_pb");
const axios_1 = require("@nestjs/axios");
const messages_pb_service_1 = require("./grpc/messages_pb_service");
const grpc_web_1 = require("@improbable-eng/grpc-web");
const dp_config_1 = require("./dp.config");
class GRPCDomainProxyServiceClass {
    constructor() {
        this.isConnectionStatusObserved = false;
        this.logger = [];
        this.userdat = { user: 'abc', pass: '123' };
        this.http = new axios_1.HttpService();
    }
    getMessageService() {
        return this.MessageService;
    }
    initialise(settings) {
        this.settings = settings;
    }
    emit(msg) {
        // return this.callProtobufStream(msg);
        let req = new messages_pb_1.Request();
        req.setMessage(JSON.stringify(msg));
        return this.callProtobufStream(req).pipe(rxjs_1.map((resp) => this.convertFisAppResponse(resp)));
    }
    send(msg, isStream = true) {
        let req = new messages_pb_1.Request();
        req.setMessage(JSON.stringify(msg));
        return this.callProtobufStream(req).pipe(rxjs_1.map((resp) => this.convertFisAppResponse(resp)));
    }
    convertFisAppResponse(resp) {
        try {
            let message;
            message = JSON.parse(resp['message']);
            return message;
        }
        catch (e) {
            console.log('Error performing conversion.' + e);
            console.log(resp);
        }
    }
    /**
     * initiate Protobuf stream from server
     * @param Request
     */
    callProtobufStream(request, protoServerUrl) {
        return new rxjs_1.Observable(observer => {
            if (!this.messageClient)
                this.messageClient = new messages_pb_service_1.MessageServiceClient(protoServerUrl ? protoServerUrl : dp_config_1.URLs.GRPC);
            let call = this.messageClient.handleMessage(request);
            call.on('status', (status) => {
                if (status.code !== grpc_web_1.grpc.Code.OK) {
                    observer.error(status);
                    observer.complete();
                }
            });
            call.on('data', (response) => {
                let msgObj = JSON.parse(response.getMessage());
                if (msgObj.status === 'failure' || msgObj.status === 'error') {
                    observer.error(msgObj);
                    observer.complete();
                }
                else
                    observer.next(response);
            });
            call.on('end', () => {
                observer.complete();
            });
        });
    }
    httpGet(url, params) {
        return new rxjs_1.Observable(observer => {
            let hdrs = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            this.http.get(url, hdrs).subscribe(res => { observer.next(res); observer.complete(); }, error => { observer.error(error); });
        });
    }
    httpPost(url, params) {
        return new rxjs_1.Observable(observer => {
            let hdrs = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            this.http.post(url, JSON.stringify(params), hdrs).subscribe(res => { observer.next(res); observer.complete(); }, error => { observer.error(error); });
        });
    }
    getFromDomain(url, params) {
        return new rxjs_1.Observable(observer => {
            let hdrs = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer abcd123'
                }
            };
            this.http.post(url, JSON.stringify(params), hdrs).subscribe(res => { observer.next(res); observer.complete(); }, error => { observer.error(error); });
        });
    }
    postToDomain(url, payload) {
        return new rxjs_1.Observable(observer => {
            let hdrs = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            this.http.post(url, payload, hdrs).subscribe(res => { observer.next(res); observer.complete(); }, error => { observer.error(error); });
        });
    }
    uploadFiles(url, formData) {
        return new rxjs_1.Observable(observer => {
            this.http.post(url, formData).subscribe(res => { observer.next(res); observer.complete(); }, error => { observer.error(error); });
        });
    }
    /** *GET JWT Authentication Token from server and stores it in localStorage */
    getAuthKey(userdat) {
        return new rxjs_1.Observable(observer => {
            let authKey = localStorage.getItem("auth-key");
            if (authKey === null) {
                let body = new URLSearchParams();
                body.append("username", userdat.user);
                body.append("password", userdat.pass);
                this.http.post(dp_config_1.URLs.SERVER, body).subscribe((res) => {
                    authKey = res.data;
                    localStorage.setItem("auth-key", authKey + '');
                    observer.next(authKey);
                    observer.complete();
                }, error => {
                    observer.error(error.json());
                    observer.complete();
                });
            }
            observer.next(authKey);
            observer.complete();
        });
    }
}
exports.GRPCDomainProxyServiceClass = GRPCDomainProxyServiceClass;
class MessageType {
}
exports.MessageType = MessageType;
MessageType.GET_METADATA = 'getMetadata';
MessageType.GET_BIZDATA = 'getBizData';
//# sourceMappingURL=MD.grpc.service.js.map