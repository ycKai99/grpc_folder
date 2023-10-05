"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerSystemServer = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessageproducer_1 = require("./appmessageproducer");
class AppMessageProducerSystemServer extends appmessageproducer_1.AppMessageProducerKind {
    createProducer(messageParameter) {
        let producer = {};
        return producer;
    }
    createComponent(messageParameter) {
        return appmessagetype_1.SystemServers.MicroserviceServer;
    }
}
exports.AppMessageProducerSystemServer = AppMessageProducerSystemServer;
//# sourceMappingURL=appmessageproducersystemserver.js.map