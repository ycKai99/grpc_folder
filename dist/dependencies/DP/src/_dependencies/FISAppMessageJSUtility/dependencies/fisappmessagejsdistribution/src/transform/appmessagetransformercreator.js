"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.AppMessageTransformerCreator = void 0;
const Transformers = require("./transformers");
const TransformersExtend = require("../transformers.config");
class AppMessageTransformerCreator {
    static initialise() {
        if (this.__initialised) {
        }
        else {
            this.transformers = Object.assign(Object.assign({}, Transformers), TransformersExtend);
            this.__initialised = true;
        }
        return true;
    }
    static new(alias, options) {
        try {
            this.initialise();
            return new this.transformers[alias](options);
        }
        catch (e) {
            throw "Transformer alias name '" + alias + "' not found.\n" + e;
        }
    }
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