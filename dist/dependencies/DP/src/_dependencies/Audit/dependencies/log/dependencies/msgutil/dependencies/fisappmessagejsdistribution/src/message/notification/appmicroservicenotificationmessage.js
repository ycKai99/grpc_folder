"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMicroserviceNotificationMessage = exports.AppMicroserviceNotificationMessage = void 0;
const appnotificationmessagetype_1 = require("./appnotificationmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppMicroserviceNotificationMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = appnotificationmessagetype_1.AppMessageType.MicroserviceNotification;
    }
    createMessage(messageParameter) {
        try {
            this.microserviceNotificationMessage = {};
            return this.microserviceNotificationMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMicroserviceNotificationMessage = AppMicroserviceNotificationMessage;
function createMicroserviceNotificationMessage(messageParameter) {
    try {
        return new AppMicroserviceNotificationMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createMicroserviceNotificationMessage = createMicroserviceNotificationMessage;
//# sourceMappingURL=appmicroservicenotificationmessage.js.map