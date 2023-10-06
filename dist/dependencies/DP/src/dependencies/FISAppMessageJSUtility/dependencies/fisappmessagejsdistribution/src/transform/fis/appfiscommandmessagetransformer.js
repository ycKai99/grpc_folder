"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.AppFisCommandMessageTransformer = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const fisappmessageschema_1 = require("../../types/fisappmessageschema");
const appmessagetransformerkind_1 = require("../appmessagetransformerkind");
/**
 * App Fis command message transformer.
 * Transform to FisMessage
 *
 * @class  AppFisCommandMessageTransformer
 */
class AppFisCommandMessageTransformer extends appmessagetransformerkind_1.AppMessageTransformerKind {
    /**
     * Create new app Fis command message transformer.
     *
     * @class  AppFisCommandMessageTransformer
     * @method constructor
     */
    constructor() {
        super();
        this.baseTransformerType = [fisappmessageschema_1.AppMessageType.Base];
        this.permissibleMessageType = fisappmessageschema_1.AppMessageType.Command;
    }
    /**
    * Transform app Fis command message extensions.
    *
    * @class AppFisCommandMessageTransformer
    * @method transformExtensions
    * @param message  {FisCommandMessage} - Fis command message.
    * @return {object} - Output object..
    */
    transformExtensions(message) {
        let fisMessage = {};
        fisMessage.operation = message.header.command;
        fisMessage.requestType = fisappmessageschema_1.AppMessageType.Command; // Request for command service.
        return fisMessage;
    }
}
exports.AppFisCommandMessageTransformer = AppFisCommandMessageTransformer;
/**
 *  Transform app Fis command message.
 *
 * @function transform
 * @param message  {FisCommandMessage} - Fis command Message.
 * @return {FisMessage} - Fis message.
 */
function transform(message) {
    try {
        return new AppFisCommandMessageTransformer().transform(message);
    }
    catch (e) {
        throw e;
    }
}
exports.transform = transform;
//# sourceMappingURL=appfiscommandmessagetransformer.js.map