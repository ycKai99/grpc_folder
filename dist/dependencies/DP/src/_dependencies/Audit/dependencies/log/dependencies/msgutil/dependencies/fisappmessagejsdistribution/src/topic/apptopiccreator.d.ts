import { Topic, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
import * as Topics from './topics';
export type DefaultModule = typeof Topics;
export declare class AppTopicCreator {
    protected static __initialised: boolean;
    static topics: object;
    protected static initialise(): boolean;
    static new(alias: string, options?: any): AppTopic;
    static create(topicParameters: TopicParameters, alias: string, options?: any): Topic;
}
export declare function createTopic(topicParameters: TopicParameters, alias: string, options?: any): Topic;
