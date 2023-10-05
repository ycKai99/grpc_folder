"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerAppServer = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessageproducer_1 = require("./appmessageproducer");
class AppMessageProducerAppServer extends appmessageproducer_1.AppMessageProducerKind {
    createProducer(messageParameter) {
        let producer = {};
        return producer;
    }
    createComponent(messageParameter) {
        return appmessagetype_1.FisAppServerComponents.BackOfficeApplication;
    }
}
exports.AppMessageProducerAppServer = AppMessageProducerAppServer;
//# sourceMappingURL=appmessageproducerappserver.js.map