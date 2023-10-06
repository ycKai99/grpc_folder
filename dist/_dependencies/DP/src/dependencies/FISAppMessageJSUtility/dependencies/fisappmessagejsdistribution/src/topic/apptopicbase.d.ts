/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, TopicBase, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
/**
 * App topic base.
 *
 * @class AppTopicBase
 */
export declare class AppTopicBase implements AppTopic {
    /**
     * App topic base.
     *
     * @class AppTopicBase
     * @property topic
     * @type {TopicBase}
     */
    protected topic: TopicBase;
    /**
     * Create new app topic base.
     *
     * @class AppTopicBase
     * @method create
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @return {Topic} - App topic.
     */
    create(topicParameters: TopicParameters): Topic;
    /**
     * Validate app topic base.
     *
     * @class AppTopicBase
     * @method validate
     * @param topic {TopicBase } - Topic.
     * @return {boolean} - True = success, false = error.
     */
    validate(topic: TopicBase): boolean;
    /**
     * Create new topic base.
     *
     * @class AppTopicBase
     * @method createTopic
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @return {Topic} - App topic base.
     */
    protected createTopic(topicParameters: TopicParameters): TopicBase;
    /**
     * Generate new topic id.
     *
     * @class AppTopicBase
     * @method generateId
     * @param
     * @return {string} - New Id.
     */
    protected generateId(): string;
}
/**
 * Create new app topic base.
 *
 * @class AppTopicBase
 * @method createAppTopic
 * @param topicParameters {TopicParameters} - Topic parameters.
 * @return {TopicBase} - App topic.
 */
export declare function createAppTopic(topicParameters: TopicParameters): TopicBase;
