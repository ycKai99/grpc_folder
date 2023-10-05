import { Topic, TopicParameters } from './apptopictype';
export interface AppTopic {
    create(topicParameters: TopicParameters): Topic;
    validate(topic: Topic): boolean;
}
