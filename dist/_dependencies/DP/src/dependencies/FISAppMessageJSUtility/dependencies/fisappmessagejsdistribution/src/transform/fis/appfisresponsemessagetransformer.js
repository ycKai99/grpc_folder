"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.AppFisResponseMessageTransformer = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const fisappmessageschema_1 = require("../../types/fisappmessageschema");
const appmessagetransformerkind_1 = require("../appmessagetransformerkind");
/**
 * App Fis response message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisResponseMessageTransformer
 */
class AppFisResponseMessageTransformer extends appmessagetransformerkind_1.AppMessageTransformerKind {
    /**
     * Create new app Fis response message transformer.
     *
     * @class  AppFisResponseMessageTransformer
     * @method constructor
     */
    constructor() {
        super();
        this.baseTransformerType = [fisappmessageschema_1.AppMessageType.Base];
        this.permissibleMessageType = fisappmessageschema_1.AppMessageType.Response;
    }
    /**
    * Transform app Fis response message extensions.
    *
    * @class AppFisResponseMessageTransformer
    * @method transformExtensions
    * @param message  {FisResponseMessage} - Fis response message.
    * @return {object} - Output object..
    */
    transformExtensions(message) {
        let fisMessage = {};
        fisMessage.operation = "Response"; //message.header.response;
        fisMessage.requestType = fisappmessageschema_1.AppMessageType.Response; // Request for response service.
        return fisMessage;
    }
}
exports.AppFisResponseMessageTransformer = AppFisResponseMessageTransformer;
/**
 *  Transform app Fis response message.
 *
 * @function transform
 * @param message  {FisResponseMessage} - Fis response Message.
 * @return {FisMessage} - Fis message.
 */
function transform(message) {
    try {
        return new AppFisResponseMessageTransformer().transform(message);
    }
    catch (e) {
        throw e;
    }
}
exports.transform = transform;
//# sourceMappingURL=appfisresponsemessagetransformer.js.map