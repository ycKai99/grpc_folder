"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppNotificationMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appnotificationmessagetype_1 = require("./appnotificationmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
/**
 * App notification message header.
 *
 * @class AppNotificationMessageHeader
 */
class AppNotificationMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app notification message header.
     *
     * @class AppNotificationMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        this.messageType = appnotificationmessagetype_1.AppMessageType.Notification;
    }
    /**
     * Create new notification header.
     *
     * @class AppNotificationMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {NotificationMessageHeader} - New notification header.
     */
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