/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, TopicParameters } from './apptopictype';

/**
 * App topic.
 *
 * @interface AppTopic
 */
export interface AppTopic {
    /**
     * Create new app topic.
     *
     * @interface AppTopic
     * @method create
     * @param topicParameters {TopicParameters} - Topic parameters. 
     * @return {Topic} - App topic.
     */
    create(topicParameters: TopicParameters): Topic;

    /**
     * Validate topic.
     *
     * @interface AppTopic
     * @method validate
     * @param topic {Topic} -  topic. 
     * @return {boolean} - True = success, false = error.
     */
    validate(topic: Topic): boolean;
}
