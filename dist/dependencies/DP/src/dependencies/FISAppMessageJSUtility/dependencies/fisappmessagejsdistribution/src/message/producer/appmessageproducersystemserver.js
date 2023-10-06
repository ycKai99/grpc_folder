"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerSystemServer = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessageproducer_1 = require("./appmessageproducer");
/**
 * App message producer is System Server.
 *
 * @class AppMessageProducerSystemServer
 */
class AppMessageProducerSystemServer extends appmessageproducer_1.AppMessageProducerKind {
    /**
     * Create producer information is System Server.
     *
     * @class AppMessageProducerSystemServer
     * @method createProducer
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ProducerInformationSystemServer} - Message producer is System Server.
     */
    createProducer(messageParameter) {
        let producer = {};
        return producer;
    }
    /**
     * Create components.
     *
     * @class AppMessageProducerSystemServer
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {SystemServers} - Message producer component.
     */
    createComponent(messageParameter) {
        return appmessagetype_1.SystemServers.MicroserviceServer;
    }
}
exports.AppMessageProducerSystemServer = AppMessageProducerSystemServer;
//# sourceMappingURL=appmessageproducersystemserver.js.map