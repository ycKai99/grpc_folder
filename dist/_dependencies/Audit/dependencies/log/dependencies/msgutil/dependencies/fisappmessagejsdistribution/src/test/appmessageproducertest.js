"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerAppTest = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../types/appmessagetype");
const appmessageproducerappserver_1 = require("../message/producer/appmessageproducerappserver");
/**
 * App message producer is App Server.
 *
 * @class AppMessageProducerAppServer
 */
class AppMessageProducerAppTest extends appmessageproducerappserver_1.AppMessageProducerAppServer {
    /**
     * Create components.
     *
     * @class AppMessageProducerBase
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {FisAppServerComponentsEnum} - Message producer component.
     */
    createComponent(messageParameter) {
        return appmessagetype_1.FisAppServerComponents.GlobalStore;
    }
}
exports.AppMessageProducerAppTest = AppMessageProducerAppTest;
//# sourceMappingURL=appmessageproducertest.js.map