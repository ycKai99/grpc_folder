import { ServiceDefinition } from "@grpc/grpc-js";
import { GrpcObject, PackageDefinition, ProtobufMessage } from "grpc";
import { FisCreateMessageUtility, RequestMessage, ResponseMessage } from "../_interfaces/export";
import * as grpc_ext from 'grpc';
import { Subject } from "rxjs";

// Declare interface for GRPC objects
interface protoMessage {
  id: string,
  message: string,
}

type GrpcRequest = {
  id: string,
  message: string,
}
type GrpcResponse = GrpcRequest

const messageUtil: FisCreateMessageUtility = new FisCreateMessageUtility(
  'FisAppID/Name',
);

/* Generate messages from FISappMSG */
// Client create login message
console.log('Client create login message');
const newLoginRequestMessage: RequestMessage = messageUtil.getLoginMessage();
// console.log(newLoginRequestMessage);

/* All required GRPC packages to be loaded to make the transport working */
const PROTO_PATH = __dirname + '/message.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
const message_proto: ProtobufMessage = grpc.loadPackageDefinition(packageDefinition).message

// Payload to be wrapped and according to the defined paylaod specified in the proto file
let req =
{
  "id": "1",
  "message": JSON.stringify(newLoginRequestMessage)
}

// console.log(req)

/* Testing on local UCP server and also windev UCP server. */
//let client = new message_proto.MessageService(`localhost:50151`,
//    grpc.credentials.createInsecure())
let client = new message_proto.MessageService(`192.168.100.59:50151`, // windev address Eric is using 8080(bt it's not working with this one)
  grpc.credentials.createInsecure())

// Create a new subject to house incoming response from the UCP server after transmitting the messages over.
let observer = new Subject();
let stream: grpc_ext.ServerWriteableStream<GrpcRequest, GrpcResponse> = client.HandleMessage(req, function (err, response) {
  if (err) {
    console.error('Error:', err);
    return;
  }

  console.log('Response:', response);
})

stream.on('status', (response: any) => {
  // Check response and set the condition for error accordingly
  if (response.code !== 0) {
    observer.error(response);
    observer.complete();
  }
});
stream.on('data', (response: any) => {
  let msgObj = response;//JSON.parse(response);
  if (msgObj.status === 'failure' || msgObj.status === 'error') {
    observer.error(msgObj);
    observer.complete();
  } else observer.next(response);
});
stream.on('end', () => {
  observer.complete();
});


observer.subscribe({
  next(element: any) {
    console.log(element);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});

