"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducerInformation = exports.AppMessageProducerCreator = void 0;
const Producers = require("./producers");
const moduleloader_1 = require("../../utils/moduleloader");
const config_1 = require("../../config/config");
class AppMessageProducerCreator {
    static initialise() {
        if (this.__initialised) {
        }
        else {
            this.producers = Object.assign(Object.assign({}, Producers), (0, moduleloader_1.load)(config_1.Config.messageProducerModule()));
        }
        return true;
    }
    static new(alias, options) {
        try {
            return new this.producers[alias](options);
        }
        catch (e) {
            throw "Producer alias name '" + alias + "' not found.\n" + e;
        }
    }
    static create(messageParameter, options) {
        try {
            return this.new((messageParameter && messageParameter.producer && messageParameter.producer.type), options).create(messageParameter);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageProducerCreator = AppMessageProducerCreator;
AppMessageProducerCreator.__initialised = AppMessageProducerCreator.initialise();
function createProducerInformation(messageParameter, options) {
    try {
        return AppMessageProducerCreator.create(messageParameter, options);
    }
    catch (e) {
        throw "Cannot set origin location(as in app architeture components) " +
            "where this message is created.\n" + e;
    }
}
exports.createProducerInformation = createProducerInformation;
//# sourceMappingURL=appmessageproducercreator.js.map