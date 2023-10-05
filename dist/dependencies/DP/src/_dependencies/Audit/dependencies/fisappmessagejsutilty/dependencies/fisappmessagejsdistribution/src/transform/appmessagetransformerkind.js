"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageTransformerKind = void 0;
const appmessagevalidation_1 = require("../message/common/appmessagevalidation");
const appmessagetransformercreator_1 = require("./appmessagetransformercreator");
const clone = require("rfdc");
class AppMessageTransformerKind {
    constructor() {
    }
    transform(message) {
        try {
            this.validate(message);
            return Object.assign(Object.assign({}, this.transformBase(message)), this.transformExtensions(message));
        }
        catch (e) {
            throw "Transfroming '" +
                (message && message.header && message.header.messageType) +
                "' message.\n" + e;
        }
    }
    validate(message) {
        try {
            if ((0, appmessagevalidation_1.validateMessage)(message)) {
                return (0, appmessagevalidation_1.validateMessageHeader)(message.header, [this.permissibleMessageType]);
            }
            ;
        }
        catch (e) {
            throw e;
        }
    }
    transformBase(message) {
        try {
            let base;
            let baseMessage;
            if (!message) {
                message = {};
            }
            ;
            baseMessage = clone()(message);
            if (this.baseTransformerType) {
                this.baseTransformerType.forEach((transformerType) => {
                    baseMessage.header.messageType = transformerType;
                    base = Object.assign(Object.assign({}, base), (0, appmessagetransformercreator_1.transform)(baseMessage));
                });
            }
            return base;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageTransformerKind = AppMessageTransformerKind;
//# sourceMappingURL=appmessagetransformerkind.js.map