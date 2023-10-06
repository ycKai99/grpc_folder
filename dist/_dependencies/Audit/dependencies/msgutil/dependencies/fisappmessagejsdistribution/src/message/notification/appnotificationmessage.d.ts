/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageParameter, NotificationMessage, AppMessageHeaderOptions } from './appnotificationmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
/**
 * App notification message.
 *
 * @class AppNotificationMessage
 */
export declare class AppNotificationMessage extends AppMessageKind {
    /**
     * Create new app notification message.
     *
     * @class AppNotificationMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * App notification Message.
     *
     * @class AppNotificationMessage
     * @property notificationMessage
     * @type {NotificationMessage}
     */
    protected notificationMessage: NotificationMessage;
    /**
     * Create new notification message.
     *
     * @class AppNotificationMessage
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {NotificationMessage} - New notification message.
     */
    protected createMessage(messageParameter: MessageParameter): NotificationMessage;
}
/**
 * Create new App notification message.
 *
 * @function createNotificationMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App notification message.
 */
export declare function createNotificationMessage(messageParameter: MessageParameter): Message;
