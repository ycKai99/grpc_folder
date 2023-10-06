/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, NotificationType, NotificationNature } from '../../types/appmessagetype';
import { TopicParameters } from '../../topic/apptopictype';
/**
 * Notification message parameter.
 * Consists of:
 *  Base message parameter.
 *  Notification type(NotificationType).
 *  Notification nature(NotificationNature).
 *
 * @interface NotificationMessageParameter
 */
export interface NotificationMessageParameter extends MessageParameter {
    /**
     * Notification type.
     * For UI Events, MS Events, NestJS Events, FIS Events.
     *
     * @interface MicroserviceNotificationMessageParameter
     * @property notificationType
     * @type {NotificationType}
     */
    notificationType: NotificationType;
    /**
     * Notification nature.
     *
     * @interface MicroserviceNotificationMessageParameter
     * @property notificationNature
     * @type {NotificationNature}
     */
    notificationNature: NotificationNature;
}
/**
 * Microservice notification message parameter.
 * Consists of:
 *  Notification message parameter.
 *  Topic parameter.
 *
 * @interface MicroserviceNotificationMessageParameter
 */
export interface MicroserviceNotificationMessageParameter extends NotificationMessageParameter {
    /**
     * Topic parameter.
     *
     * @interface MicroserviceNotificationMessageParameter
     * @property topicParameter
     * @type {TopicParameters}
     */
    topicParameter: TopicParameters;
}
