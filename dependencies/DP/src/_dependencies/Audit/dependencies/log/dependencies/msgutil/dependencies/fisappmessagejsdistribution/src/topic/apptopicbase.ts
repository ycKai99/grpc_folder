/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, TopicBase, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
import { validateTopicBase } from './apptopicvalidation';
import { Uuid, generateNewId } from '../utils/idgenerator';

/**
 * App topic base.
 *
 * @class AppTopicBase
 */
export class AppTopicBase implements AppTopic {
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
    create(topicParameters: TopicParameters): Topic {
        try {
            this.topic = this.createTopic(topicParameters);
            this.validate(this.topic);
            return this.topic as Topic;
        }
        catch (e) {
            throw "App topic base is not valid. " + e;
        }
    }

    /**
     * Validate app topic base.
     *
     * @class AppTopicBase
     * @method validate
     * @param topic {TopicBase } - Topic. 
     * @return {boolean} - True = success, false = error.
     */
    validate(topic: TopicBase): boolean {
        try {
            return validateTopicBase(topic);
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Create new topic base.
     *
     * @class AppTopicBase
     * @method createTopic
     * @param topicParameters {TopicParameters} - Topic parameters. 
     * @return {Topic} - App topic base.
     */
    protected createTopic(topicParameters: TopicParameters): TopicBase {
        try {
            let topic: TopicBase = {} as TopicBase;

            topic.topicId = this.generateId();
            topic.topicCode = (topicParameters && topicParameters.code) || "";
            topic.topicName = (topicParameters && topicParameters.name) || "";
            return topic;
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Generate new topic id.
     *
     * @class AppTopicBase
     * @method generateId
     * @param  
     * @return {string} - New Id.
     */
    protected generateId(): string {
        try {
            return generateNewId(Uuid);
            // return new Uuid().generateId();
        }
        catch (e) {
            throw e;
        }
    }

}

/**
 * Create new app topic base.
 *
 * @class AppTopicBase
 * @method createAppTopic
 * @param topicParameters {TopicParameters} - Topic parameters. 
 * @return {TopicBase} - App topic.
 */
export function createAppTopic(topicParameters: TopicParameters): TopicBase {
    try {
        return new AppTopicBase().create(topicParameters);
    }
    catch (e) {
        throw e;
    }
}
