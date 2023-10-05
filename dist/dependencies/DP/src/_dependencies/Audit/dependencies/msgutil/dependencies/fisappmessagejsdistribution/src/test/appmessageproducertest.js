"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerAppTest = void 0;
const appmessagetype_1 = require("../types/appmessagetype");
const appmessageproducerappserver_1 = require("../message/producer/appmessageproducerappserver");
class AppMessageProducerAppTest extends appmessageproducerappserver_1.AppMessageProducerAppServer {
    createComponent(messageParameter) {
        return appmessagetype_1.FisAppServerComponents.GlobalStore;
    }
}
exports.AppMessageProducerAppTest = AppMessageProducerAppTest;
//# sourceMappingURL=appmessageproducertest.js.map