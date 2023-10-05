import { Topic, TopicBase, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
export declare class AppTopicBase implements AppTopic {
    protected topic: TopicBase;
    create(topicParameters: TopicParameters): Topic;
    validate(topic: TopicBase): boolean;
    protected createTopic(topicParameters: TopicParameters): TopicBase;
    protected generateId(): string;
}
export declare function createAppTopic(topicParameters: TopicParameters): TopicBase;
