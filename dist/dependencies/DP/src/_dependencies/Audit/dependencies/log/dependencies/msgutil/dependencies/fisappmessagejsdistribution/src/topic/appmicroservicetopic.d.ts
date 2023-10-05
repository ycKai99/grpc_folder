import { GenericTopic, TopicParameters } from './apptopictype';
import { AppTopicKind } from './apptopickind';
export declare class AppMicroserviceTopic extends AppTopicKind {
    protected createTopic(topicParameters: TopicParameters): GenericTopic;
}
