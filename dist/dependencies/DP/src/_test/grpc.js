"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const export_1 = require("../_interfaces/export");
const rxjs_1 = require("rxjs");
const messageUtil = new export_1.FisCreateMessageUtility('FisAppID/Name');
console.log('Client create login message');
const newLoginRequestMessage = messageUtil.getLoginMessage();
const PROTO_PATH = __dirname + '/message.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const message_proto = grpc.loadPackageDefinition(packageDefinition).message;
let req = {
    "id": "1",
    "message": JSON.stringify(newLoginRequestMessage)
};
let client = new message_proto.MessageService(`192.168.100.59:50151`, grpc.credentials.createInsecure());
let observer = new rxjs_1.Subject();
let stream = client.HandleMessage(req, function (err, response) {
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
observer.subscribe({
    next(element) {
        console.log(element);
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    },
});
//# sourceMappingURL=grpc.js.map