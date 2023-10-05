
/*!
 * fisapptopicjs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, TopicParameters } from './apptopictype';
import { AppTopic } from './apptopic';
import * as Topics from './topics';
import { load } from '../utils/moduleloader';
import { Config } from '../config/config';

export type DefaultModule = typeof Topics;

/**
 * App topic creator.
 *
 * @class AppTopicCreator
 */
export class AppTopicCreator {
    /**
     * Initialise topic creator.
     * 
     * @class AppTopicCreator
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean = AppTopicCreator.initialise();

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
    protected static initialise(): boolean {
        if (this.__initialised) {

        }
        else {
            // Load additional topic modules
            this.topics = {
                ...Topics,
                ...load(Config.messageTopicModule()) as object
            };
        }
        return true;
    }

    /**
     * Create new topic instance.
     *
     * @class AppTopicCreator
     * @method new
     * @param alias {string} -  Topic class alias name.
     * @param options {any} - Topic options. 
     * @return {AppTopic} - App topic instance.
     */
    public static new(alias: string, options?: any): AppTopic {
        try {
            return new this.topics[alias](options);
        }
        catch (e) {
            throw "Topic alias name '" + alias + "' not found.\n" + e;
        }
    }

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
    public static create(topicParameters: TopicParameters,
        alias: string, options?: any): Topic {
        try {
            return this.new(alias, options).create(topicParameters);
        }
        catch (e) {
            throw e;
        }
    }
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
export function createTopic(topicParameters: TopicParameters,
    alias: string, options?: any): Topic {
    try {
        return AppTopicCreator.create(topicParameters, alias, options);
    }
    catch (e) {
        throw e;
    }
}
