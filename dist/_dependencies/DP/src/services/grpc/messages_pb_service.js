// package: message
// file: messages.proto

var messages_pb = require("./messages_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MessageService = (function () {
  function MessageService() {}
  MessageService.serviceName = "message.MessageService";
  return MessageService;
}());

MessageService.HandleMessage = {
  methodName: "HandleMessage",
  service: MessageService,
  requestStream: false,
  responseStream: true,
  requestType: messages_pb.Request,
  responseType: messages_pb.Response
};

exports.MessageService = MessageService;

function MessageServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MessageServiceClient.prototype.handleMessage = function handleMessage(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(MessageService.HandleMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.MessageServiceClient = MessageServiceClient;

