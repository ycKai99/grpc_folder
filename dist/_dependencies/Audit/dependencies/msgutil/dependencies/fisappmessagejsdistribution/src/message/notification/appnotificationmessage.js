"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationMessage = exports.AppNotificationMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appnotificationmessagetype_1 = require("./appnotificationmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App notification message.
 *
 * @class AppNotificationMessage
 */
class AppNotificationMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app notification message.
     *
     * @class AppNotificationMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = appnotificationmessagetype_1.AppMessageType.Notification;
    }
    /**
     * Create new notification message.
     *
     * @class AppNotificationMessage
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {NotificationMessage} - New notification message.
     */
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
/**
 * Create new App notification message.
 *
 * @function createNotificationMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App notification message.
 */
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