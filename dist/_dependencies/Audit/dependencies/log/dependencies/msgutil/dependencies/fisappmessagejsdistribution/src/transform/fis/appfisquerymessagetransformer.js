"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.AppFisQueryMessageTransformer = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const fisappmessageschema_1 = require("../../types/fisappmessageschema");
const appmessagetransformerkind_1 = require("../appmessagetransformerkind");
/**
 * App Fis query message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisQueryMessageTransformer
 */
class AppFisQueryMessageTransformer extends appmessagetransformerkind_1.AppMessageTransformerKind {
    /**
     * Create new app Fis query message transformer.
     *
     * @class  AppFisQueryMessageTransformer
     * @method constructor
     */
    constructor() {
        super();
        this.baseTransformerType = [fisappmessageschema_1.AppMessageType.Base];
        this.permissibleMessageType = fisappmessageschema_1.AppMessageType.Query;
    }
    /**
    * Transform app Fis query message extensions.
    *
    * @class AppFisQueryMessageTransformer
    * @method transformExtensions
    * @param message  {FisQueryMessage} - Fis query message.
    * @return {object} - Output object..
    */
    transformExtensions(message) {
        let fisMessage = {};
        fisMessage.operation = message.header.query;
        fisMessage.requestType = fisappmessageschema_1.AppMessageType.Query; // Request for query service.
        return fisMessage;
    }
}
exports.AppFisQueryMessageTransformer = AppFisQueryMessageTransformer;
/**
 *  Transform app Fis query message.
 *
 * @function transform
 * @param message  {FisQueryMessage} - Fis query Message.
 * @return {FisMessage} - Fis message.
 */
function transform(message) {
    try {
        return new AppFisQueryMessageTransformer().transform(message);
    }
    catch (e) {
        throw e;
    }
}
exports.transform = transform;
//# sourceMappingURL=appfisquerymessagetransformer.js.map