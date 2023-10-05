"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.GRPCDomainProxyServiceClass = void 0;
const rxjs_1 = require("rxjs");
const messages_pb_1 = require("./utility/messages_pb");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
class GRPCDomainProxyServiceClass {
    constructor() {
        this.PROTO_PATH = __dirname + '/utility/messages.proto';
        this.packageDefinition = protoLoader.loadSync(this.PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        this.message_proto = grpc.loadPackageDefinition(this.packageDefinition).message;
        this.client = new this.message_proto.MessageService(`192.168.100.59:50151`, grpc.credentials.createInsecure());
        this.isConnectionStatusObserved = false;
        this.logger = [];
        this.userdat = { user: 'abc', pass: '123' };
    }
    getMessageService() {
        return this.MessageService;
    }
    initialise(settings) {
        this.settings = settings;
    }
    emit(msg) {
        let req = new messages_pb_1.Request();
        req.setMessage(JSON.stringify(msg));
        return this.transmit(req);
    }
    subscribe(msg) {
        return this.send(msg);
    }
    send(msg, isStream = true) {
        let req = {
            "id": "1",
            "message": JSON.stringify(msg)
        };
        let result = this.transmit(req);
        return result;
    }
    transmit(msg) {
        let observer = new rxjs_1.Subject();
        let stream = this.client.HandleMessage(msg, function (err, response) {
            if (err) {
                console.error('Error:', err);
                return;
            }
            console.log('Response:', response);
        });
        stream.on('status', (response) => {
            if (response.code !== 0) {
                observer.error(response);
                observer.complete();
            }
        });
        stream.on('data', (response) => {
            let msgObj = response;
            if (msgObj.status === 'failure' || msgObj.status === 'error') {
                observer.error(msgObj);
                observer.complete();
            }
            else
                observer.next(response);
        });
        stream.on('end', () => {
            observer.complete();
        });
        let responseMsg = observer.pipe((0, rxjs_1.map)(message => this.convertFisAppResponse(message)));
        return responseMsg;
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
}
exports.GRPCDomainProxyServiceClass = GRPCDomainProxyServiceClass;
class MessageType {
}
exports.MessageType = MessageType;
MessageType.GET_METADATA = 'getMetadata';
MessageType.GET_BIZDATA = 'getBizData';
//# sourceMappingURL=MD.grpc.service.js.map