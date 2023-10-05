import { GenericTopic, TopicParameters } from './apptopictype';
import { AppTopicKind } from './apptopickind';
export declare class AppMicroserviceNotificationTopic extends AppTopicKind {
    constructor();
    protected createTopic(topicParameters: TopicParameters): GenericTopic;
}
