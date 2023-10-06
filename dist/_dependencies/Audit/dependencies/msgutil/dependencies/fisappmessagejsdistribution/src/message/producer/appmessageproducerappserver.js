"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerAppServer = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessageproducer_1 = require("./appmessageproducer");
/**
 * App message producer is App Server.
 *
 * @class AppMessageProducerAppServer
 */
class AppMessageProducerAppServer extends appmessageproducer_1.AppMessageProducerKind {
    /**
     * Create producer information is App Server.
     *
     * @class AppMessageProducerAppServer
     * @method createProducer
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ProducerInformationAppServer} - Message producer is App Server.
     */
    createProducer(messageParameter) {
        let producer = {};
        return producer;
    }
    /**
     * Create components.
     *
     * @class AppMessageProducerBase
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {FisAppServerComponentsEnum} - Message producer component.
     */
    createComponent(messageParameter) {
        return appmessagetype_1.FisAppServerComponents.BackOfficeApplication;
    }
}
exports.AppMessageProducerAppServer = AppMessageProducerAppServer;
//# sourceMappingURL=appmessageproducerappserver.js.map