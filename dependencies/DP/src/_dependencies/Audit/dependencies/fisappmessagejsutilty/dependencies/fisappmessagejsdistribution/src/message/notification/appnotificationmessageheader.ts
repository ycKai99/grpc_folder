/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, MessageParameter, GenericHeader, GenericHeaderOf,
    AppMessageHeaderOptions, NotificationMessageHeader, NotificationNature,
    NotificationType
} from './appnotificationmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';

/**
 * App notification message header.
 *
 * @class AppNotificationMessageHeader
 */
export class AppNotificationMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app notification message header.
     *
     * @class AppNotificationMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Notification;
    }

    /**
     * Create new notification header.
     *
     * @class AppNotificationMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {NotificationMessageHeader} - New notification header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: NotificationMessageHeader = {} as NotificationMessageHeader;
            header.notificationNature = (messageParameter &&
                messageParameter.notificationNature) || NotificationNature.ForInformation;
            header.notificationType = (messageParameter &&
                messageParameter.notificationType) || NotificationType.UserActivity;
            return header as GenericHeaderOf<NotificationMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }
}
