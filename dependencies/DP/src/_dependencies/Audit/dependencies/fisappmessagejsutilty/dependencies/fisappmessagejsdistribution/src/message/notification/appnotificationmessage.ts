/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, MessageParameter, NotificationMessage, 
    AppMessageHeaderOptions
} from './appnotificationmessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App notification message.
 *
 * @class AppNotificationMessage
 */
export class AppNotificationMessage extends AppMessageKind {
    /**
     * Create new app notification message.
     *
     * @class AppNotificationMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Notification;
    }

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
    protected createMessage(messageParameter: MessageParameter): NotificationMessage {
        try {
            this.notificationMessage = {} as NotificationMessage;
            return this.notificationMessage;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new App notification message.
 *
 * @function createNotificationMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App notification message.
 */
export function createNotificationMessage(messageParameter: MessageParameter): Message {
    try {
        return new AppNotificationMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
