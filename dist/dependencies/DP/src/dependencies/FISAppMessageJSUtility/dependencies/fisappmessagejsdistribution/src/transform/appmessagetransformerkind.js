"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMessageTransformerKind = void 0;
const appmessagevalidation_1 = require("../message/common/appmessagevalidation");
const appmessagetransformercreator_1 = require("./appmessagetransformercreator");
const clone = require('rfdc'); //const clone = require('rfdc')  
/**
 * App message transformer.
 *
 * @class AppMessageTransformerKind
 */
class AppMessageTransformerKind {
    /**
     * Create new app message Transformer.
     *
     * @class AppMessageTransformerKind
     * @method constructor
     */
    constructor() {
    }
    /**
     * Transform app message.
     *
     * @class AppMessageTransformerKind
     * @method transform
     * @param message  {Message} - Message.
     * @return {object} - Output object.
     */
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
    /**
     * Validate app message transformer.
     *
     * @class AppMessageTransformerKind
     * @method validate
     * @param message {Message} - Message.
     * @return {boolean} - True = success, false = error.
     */
    validate(message) {
        try {
            if (appmessagevalidation_1.validateMessage(message)) {
                return appmessagevalidation_1.validateMessageHeader(message.header, [this.permissibleMessageType]);
            }
            ;
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Transform app base message.
     *
     * @class AppMessageTransformerKind
     * @method transformBase
     * @param message  {Message} - Message.
     * @return {object} - Output object.
     */
    transformBase(message) {
        try {
            let base;
            let baseMessage;
            if (!message) {
                message = {};
            }
            ;
            // baseMessage = JSON.parse(JSON.stringify(message));//{ ...message }; // deep copy
            baseMessage = clone()(message);
            if (this.baseTransformerType) {
                this.baseTransformerType.forEach((transformerType) => {
                    baseMessage.header.messageType = transformerType;
                    base = Object.assign(Object.assign({}, base), appmessagetransformercreator_1.transform(baseMessage)); //...transform(message, transformerType) };
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