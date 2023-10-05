"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppNotificationMessageHeader = void 0;
const appnotificationmessagetype_1 = require("./appnotificationmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
class AppNotificationMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageType = appnotificationmessagetype_1.AppMessageType.Notification;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            header.notificationNature = (messageParameter &&
                messageParameter.notificationNature) || appnotificationmessagetype_1.NotificationNature.ForInformation;
            header.notificationType = (messageParameter &&
                messageParameter.notificationType) || appnotificationmessagetype_1.NotificationType.UserActivity;
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppNotificationMessageHeader = AppNotificationMessageHeader;
//# sourceMappingURL=appnotificationmessageheader.js.map