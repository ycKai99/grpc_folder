"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = exports.AppFisQueryMessageTransformer = void 0;
const fisappmessageschema_1 = require("../../types/fisappmessageschema");
const appmessagetransformerkind_1 = require("../appmessagetransformerkind");
class AppFisQueryMessageTransformer extends appmessagetransformerkind_1.AppMessageTransformerKind {
    constructor() {
        super();
        this.baseTransformerType = [fisappmessageschema_1.AppMessageType.Base];
        this.permissibleMessageType = fisappmessageschema_1.AppMessageType.Query;
    }
    transformExtensions(message) {
        let fisMessage = {};
        fisMessage.operation = message.header.query;
        fisMessage.requestType = fisappmessageschema_1.AppMessageType.Query;
        return fisMessage;
    }
}
exports.AppFisQueryMessageTransformer = AppFisQueryMessageTransformer;
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