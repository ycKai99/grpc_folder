"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerUi = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessageproducer_1 = require("./appmessageproducer");
/**
 * App message producer information is UI.
 *
 * @class AppMessageProducerUi
 */
class AppMessageProducerUi extends appmessageproducer_1.AppMessageProducerKind {
    /**
     * Create producer information.
     *
     * @class AppMessageProducerUi
     * @method createProducer
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ProducerInformationUi} - Message producer is UI.
     */
    createProducer(messageParameter) {
        let producer = {};
        return producer;
    }
    /**
     * Create components.
     *
     * @class AppMessageProducerUi
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {UserInterfaceComponentTypesEnum} - Message producer component.
     */
    createComponent(messageParameter) {
        return appmessagetype_1.UserInterfaceComponentTypes.Presentation;
    }
}
exports.AppMessageProducerUi = AppMessageProducerUi;
//# sourceMappingURL=appmessageproducerui.js.map