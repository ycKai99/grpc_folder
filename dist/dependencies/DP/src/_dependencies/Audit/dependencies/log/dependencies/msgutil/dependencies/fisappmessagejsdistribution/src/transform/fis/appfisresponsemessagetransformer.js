"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.AppFisResponseMessageTransformer = void 0;
const fisappmessageschema_1 = require("../../types/fisappmessageschema");
const appmessagetransformerkind_1 = require("../appmessagetransformerkind");
class AppFisResponseMessageTransformer extends appmessagetransformerkind_1.AppMessageTransformerKind {
    constructor() {
        super();
        this.baseTransformerType = [fisappmessageschema_1.AppMessageType.Base];
        this.permissibleMessageType = fisappmessageschema_1.AppMessageType.Response;
    }
    transformExtensions(message) {
        let fisMessage = {};
        fisMessage.operation = "Response";
        fisMessage.requestType = fisappmessageschema_1.AppMessageType.Response;
        return fisMessage;
    }
}
exports.AppFisResponseMessageTransformer = AppFisResponseMessageTransformer;
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