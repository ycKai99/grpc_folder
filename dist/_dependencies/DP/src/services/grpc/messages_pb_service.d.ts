// package: message
// file: messages.proto

import * as messages_pb from './messages_pb';
import { grpc } from '@improbable-eng/grpc-web';

type MessageServiceHandleMessage = {
  readonly methodName: string;
  readonly service: typeof MessageService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof messages_pb.Request;
  readonly responseType: typeof messages_pb.Response;
};

export class MessageService {
  static readonly serviceName: string;
  static readonly HandleMessage: MessageServiceHandleMessage;
}

export type ServiceError = {
  message: string;
  code: number;
  metadata: grpc.Metadata;
};
export type Status = { details: string; code: number; metadata: grpc.Metadata };

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(
    type: 'data',
    handler: (message: ResT) => void,
  ): BidirectionalStream<ReqT, ResT>;
  on(
    type: 'end',
    handler: (status?: Status) => void,
  ): BidirectionalStream<ReqT, ResT>;
  on(
    type: 'status',
    handler: (status: Status) => void,
  ): BidirectionalStream<ReqT, ResT>;
}

export class MessageServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  handleMessage(
    requestMessage: messages_pb.Request,
    metadata?: grpc.Metadata,
  ): ResponseStream<messages_pb.Response>;
}
