"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducerInformation = exports.AppMessageProducerCreator = void 0;
const Producers = require("./producers");
const moduleloader_1 = require("../../utils/moduleloader");
const config_1 = require("../../config/config");
/**
 * App message producer creator.
 *
 * @class AppMessageProducerCreator
 */
class AppMessageProducerCreator {
    /**
     * Initialise message producer creator.
     *
     * @class AppMessageProducerCreator
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
        if (this.__initialised) {
        }
        else {
            // Load additional message producer modules
            this.producers = Object.assign(Object.assign({}, Producers), moduleloader_1.load(config_1.Config.messageProducerModule()));
        }
        return true;
    }
    /**
     * Create new message producer instance.
     *
     * @class AppMessageProducerCreator
     * @method new
     * @param alias {string} - Producer class alias name.
     * @param options {any} - Producer's options.
     * @return {AppMessageProducer} - Message producer instance.
     */
    static new(alias, options) {
        try {
            return new this.producers[alias](options);
        }
        catch (e) {
            throw "Producer alias name '" + alias + "' not found.\n" + e;
        }
    }
    /**
     * Create new message producer information.
     *
     * @class AppMessageProducerCreator
     * @method createProducerInformation
     * @param messageParameter {MessageParameter} - Message parameters.
     * @param options {any} - Producer's options.
     * @return {MessageProducerInformation} - Message producer information.
     */
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
/**
 * Initialise message producer creator.
 *
 * @class AppMessageProducerCreator
 * @property __initialised
 * @type {boolean}
 */
AppMessageProducerCreator.__initialised = AppMessageProducerCreator.initialise();
/**
 * Create producer informmation.
 *
 * @function createProducerInformation
 * @param messageParameter {MessageParameter} - Message parameters.
 * @param options {any} - Producer's options.
 * @return {MessageProducerInformation} - Producer information.
 */
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