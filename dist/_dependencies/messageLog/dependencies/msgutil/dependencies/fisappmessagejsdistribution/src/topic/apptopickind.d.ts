/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, GenericTopic, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
/**
 * Abstract App topic kind.
 *
 * @class AppTopicKind
 */
export declare abstract class AppTopicKind implements AppTopic {
    /**
     * App topic.
     *
     * @class AppTopicKind
     * @property topic
     * @type {Topic}
     */
    protected topic: Topic;
    /**
     * App base topic type.
     * Default is Base
     *
     * @class AppTopicKind
     * @property baseTopicType
     * @type {string}
     */
    protected baseTopicType: string;
    /**
     * Create new app topic.
     *
     * @class AppTopicKind
     * @method constructor
     */
    constructor();
    /**
     * Create new app topic.
     *
     * @class AppTopicKind
     * @method create
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @return {Topic} - App topic.
     */
    create(topicParameters: TopicParameters): Topic;
    /**
     * Validate app topic.
     *
     * @class AppTopicKind
     * @method validate
     * @param topic {Topic} -  topic.
     * @return {boolean} - True = success, false = error.
     */
    validate(topic: Topic): boolean;
    /**
     * Create new topic.
     *
     * @class AppTopicKind
     * @method createTopic
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @return {GenericTopic} - App topic.
     */
    protected abstract createTopic(topicParameters: TopicParameters): GenericTopic;
}
