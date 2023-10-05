import { Topic, GenericTopic, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
export declare abstract class AppTopicKind implements AppTopic {
    protected topic: Topic;
    protected baseTopicType: string;
    constructor();
    create(topicParameters: TopicParameters): Topic;
    validate(topic: Topic): boolean;
    protected abstract createTopic(topicParameters: TopicParameters): GenericTopic;
}
