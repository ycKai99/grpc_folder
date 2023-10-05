/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, GenericTopic, TopicType, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
import { createTopic } from './apptopiccreator';
import { validateTopic } from './apptopicvalidation';

/**
 * Abstract App topic kind.
 *
 * @class AppTopicKind
 */
export abstract class AppTopicKind implements AppTopic {
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
    constructor() {
        // App base topic type. Default is Base
        this.baseTopicType = TopicType.Base;
    }

    /**
     * Create new app topic.
     *
     * @class AppTopicKind
     * @method create
     * @param topicParameters {TopicParameters} - Topic parameters. 
     * @return {Topic} - App topic.
     */
    create(topicParameters: TopicParameters): Topic {
        try {
            this.topic = {
                ...createTopic(topicParameters, this.baseTopicType),    // Base topic
                ...this.createTopic(topicParameters)
            };
            this.validate(this.topic);
            return this.topic;
        }
        catch (e) {
            throw "App topic is not valid. " + e;
        }
    }

    /**
     * Validate app topic.
     *
     * @class AppTopicKind
     * @method validate
     * @param topic {Topic} -  topic. 
     * @return {boolean} - True = success, false = error.
     */
    validate(topic: Topic): boolean {
        try {
            return validateTopic(topic);
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Create new topic.
     *
     * @class AppTopicKind
     * @method createTopic
     * @param topicParameters {TopicParameters} - Topic parameters. 
     * @return {GenericTopic} - App topic.
     */
    protected abstract createTopic(topicParameters: TopicParameters): GenericTopic
}
