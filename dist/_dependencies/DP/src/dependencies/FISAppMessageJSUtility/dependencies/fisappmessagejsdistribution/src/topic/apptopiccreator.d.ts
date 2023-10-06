/*!
 * fisapptopicjs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
import * as Topics from './topics';
export declare type DefaultModule = typeof Topics;
/**
 * App topic creator.
 *
 * @class AppTopicCreator
 */
export declare class AppTopicCreator {
    /**
     * Initialise topic creator.
     *
     * @class AppTopicCreator
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean;
    /**
     * List of topic objects
     *
     * @class AppTopicCreator
     * @property topics
     * @type {object}
     */
    static topics: object;
    /**
     * Initialise topic creator.
     *
     * @class AppTopicCreator
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean;
    /**
     * Create new topic instance.
     *
     * @class AppTopicCreator
     * @method new
     * @param alias {string} -  Topic class alias name.
     * @param options {any} - Topic options.
     * @return {AppTopic} - App topic instance.
     */
    static new(alias: string, options?: any): AppTopic;
    /**
     * Create new topic.
     *
     * @class AppTopicCreator
     * @method create
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @param alias {string} -  Topic class alias name.
     * @param options {any} - Topic options.
     * @return {Topic} - Topic.
     */
    static create(topicParameters: TopicParameters, alias: string, options?: any): Topic;
}
/**
 * Create new app topic.
 *
 * @function createTopic
 * @param topicParameters {TopicParameters} - Topic parameters.
 * @param alias {string} -  Topic class alias name.
 * @param options {any} - Topic options.
 * @return {Topic} - New app topic.
 */
export declare function createTopic(topicParameters: TopicParameters, alias: string, options?: any): Topic;
