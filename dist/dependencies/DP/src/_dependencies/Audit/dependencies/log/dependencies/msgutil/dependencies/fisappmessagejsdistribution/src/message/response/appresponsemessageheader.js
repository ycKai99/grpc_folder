"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseMessageHeader = void 0;
const appresponsemessagetype_1 = require("./appresponsemessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
const appresponsemessagevalidation_1 = require("./appresponsemessagevalidation");
class AppResponseMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.respondToMessageValidator = appresponsemessagevalidation_1.validateRespondToMessage;
        this.permissibleRespondToMessageType = appresponsemessagetype_1.RespondToMessageType;
        this.messageType = appresponsemessagetype_1.AppMessageType.Response;
        if (options && options.permissibleRespondToMessageType) {
            this.permissibleRespondToMessageType = options.permissibleRespondToMessageType;
        }
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            header.requestMessageRespondTo = (messageParameter &&
                messageParameter.requestMessageRespondTo);
            return header;
        }
        catch (e) {
            throw e;
        }
    }
    validate(header) {
        let responseHeader = header;
        try {
            super.validate(header);
            this.respondToMessageValidator(responseHeader.requestMessageRespondTo, this.permissibleMessageType, this.permissibleRespondToMessageType);
        }
        catch (e) {
            throw e;
        }
        return true;
    }
}
exports.AppResponseMessageHeader = AppResponseMessageHeader;
//# sourceMappingURL=appresponsemessageheader.js.map