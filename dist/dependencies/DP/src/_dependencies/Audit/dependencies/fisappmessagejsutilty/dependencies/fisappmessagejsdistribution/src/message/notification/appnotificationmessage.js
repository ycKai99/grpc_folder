"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationMessage = exports.AppNotificationMessage = void 0;
const appnotificationmessagetype_1 = require("./appnotificationmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
class AppNotificationMessage extends appmessagekind_1.AppMessageKind {
    constructor(options) {
        super(options);
        this.messageType = appnotificationmessagetype_1.AppMessageType.Notification;
    }
    createMessage(messageParameter) {
        try {
            this.notificationMessage = {};
            return this.notificationMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppNotificationMessage = AppNotificationMessage;
function createNotificationMessage(messageParameter) {
    try {
        return new AppNotificationMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createNotificationMessage = createNotificationMessage;
//# sourceMappingURL=appnotificationmessage.js.map