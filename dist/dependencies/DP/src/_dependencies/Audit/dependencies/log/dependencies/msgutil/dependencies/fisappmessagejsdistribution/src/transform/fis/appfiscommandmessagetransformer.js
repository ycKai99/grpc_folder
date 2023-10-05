"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.AppFisCommandMessageTransformer = void 0;
const fisappmessageschema_1 = require("../../types/fisappmessageschema");
const appmessagetransformerkind_1 = require("../appmessagetransformerkind");
class AppFisCommandMessageTransformer extends appmessagetransformerkind_1.AppMessageTransformerKind {
    constructor() {
        super();
        this.baseTransformerType = [fisappmessageschema_1.AppMessageType.Base];
        this.permissibleMessageType = fisappmessageschema_1.AppMessageType.Command;
    }
    transformExtensions(message) {
        let fisMessage = {};
        fisMessage.operation = message.header.command;
        fisMessage.requestType = fisappmessageschema_1.AppMessageType.Command;
        return fisMessage;
    }
}
exports.AppFisCommandMessageTransformer = AppFisCommandMessageTransformer;
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