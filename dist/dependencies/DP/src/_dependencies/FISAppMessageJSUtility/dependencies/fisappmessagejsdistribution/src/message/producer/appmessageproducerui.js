"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageProducerUi = void 0;
const appmessagetype_1 = require("../../types/appmessagetype");
const appmessageproducer_1 = require("./appmessageproducer");
class AppMessageProducerUi extends appmessageproducer_1.AppMessageProducerKind {
    createProducer(messageParameter) {
        let producer = {};
        return producer;
    }
    createComponent(messageParameter) {
        return appmessagetype_1.UserInterfaceComponentTypes.Presentation;
    }
}
exports.AppMessageProducerUi = AppMessageProducerUi;
//# sourceMappingURL=appmessageproducerui.js.map