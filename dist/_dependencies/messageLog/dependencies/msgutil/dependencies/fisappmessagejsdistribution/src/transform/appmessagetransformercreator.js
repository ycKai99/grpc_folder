"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.AppMessageTransformerCreator = void 0;
const Transformers = require("./transformers");
// 20201228 -Fixed Angular Webpack not support dynamic require
// import { load } from '../utils/moduleloader';
// import { Config } from '../config/config';
const TransformersExtend = require("../transformers.config");
/**
 * App message transformer creator.
 *
 * @class AppMessageTransformerCreator
 */
class AppMessageTransformerCreator {
    /**
     * Initialise message transformer creator.
     *
     * @class AppMessageTransformerCreator
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
        if (this.__initialised) {
        }
        else {
            // 20201228 -Fixed Angular Webpack not support dynamic require
            // Load additional message transformer modules
            // Angular Webpack does not suipport require using string based variable
            // Cause Module not found.
            // this.transformers = {
            //     ...Transformers,
            //     ...load(Config.messageTransformerModule()) as object
            // };
            this.transformers = Object.assign(Object.assign({}, Transformers), TransformersExtend);
            this.__initialised = true;
            // End 20201228 -Fixed Angular Webpack not support dynamic require
        }
        return true;
    }
    /**
     * Create new message transformer instance.
     *
     * @class AppMessageTransformerCreator
     * @method new
     * @param alias {string} -  Transformer class alias name.
     * @param options {any} - Transformer options.
     * @return {AppMessageTransformer} - App message transformer instance.
     */
    static new(alias, options) {
        try {
            this.initialise(); // 20201228 -Fixed Angular Webpack not support dynamic require
            return new this.transformers[alias](options);
        }
        catch (e) {
            throw "Transformer alias name '" + alias + "' not found.\n" + e;
        }
    }
    /**
     * Transform message.
     *
     * @class AppMessageTransformerCreator
     * @method transform
     * @param message {Message} - Message.
     * @param alias {string} -  Transformer class alias name.
     * @param options {any} - Transformer options.
     * @return {object} - Output object.
     */
    static transform(message, options) {
        try {
            return this.new((message && message.header && message.header.messageType), options).transform(message);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageTransformerCreator = AppMessageTransformerCreator;
/**
 * Transform message.
 *
 * @function transform
 * @param message {Message} - Message parameters.
 * @param options {any} - Transformer options.
 * @return {object} - Output object.
 */
function transform(message, options) {
    try {
        return AppMessageTransformerCreator.transform(message, options);
    }
    catch (e) {
        throw e;
    }
}
exports.transform = transform;
//# sourceMappingURL=appmessagetransformercreator.js.map