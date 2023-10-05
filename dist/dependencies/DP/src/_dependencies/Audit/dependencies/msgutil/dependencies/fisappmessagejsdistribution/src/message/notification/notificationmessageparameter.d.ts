import { MessageParameter, NotificationType, NotificationNature } from '../../types/appmessagetype';
import { TopicParameters } from '../../topic/apptopictype';
export interface NotificationMessageParameter extends MessageParameter {
    notificationType: NotificationType;
    notificationNature: NotificationNature;
}
export interface MicroserviceNotificationMessageParameter extends NotificationMessageParameter {
    topicParameter: TopicParameters;
}
