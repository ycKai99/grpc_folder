/*!
 * fisapptopicjs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Topic, TopicBase } from './apptopictype';

/**
 * App topic validations.
 *
 */

/**
 * Validate app topic.
 *
 * @function validateTopic
 * @param topic {Topic} - Topic. 
 * @return {boolean} - True = success, false = error.
 */
export function validateTopic(topic: Topic): boolean {
    try {
        return true;
    }
    catch (e) {
        throw e;
    }
}

/**
 * App topic base validations.
 *
 */

/**
 * Validate app topic base .
 *
 * @function validateTopicBase
 * @param topic {TopicBase} - Topic. 
 * @return {boolean} - True = success, false = error.
 */
export function validateTopicBase(topic: TopicBase): boolean {
    try {
        if (!topic) {
            throw "Topic is unknown.";
        }
        else if (Object.keys(topic).length < 1) {
            throw "Topic is empty.";
        }
        else if (!topic.topicId || topic.topicId.trim().length < 1) {
            throw "'Topic Id' is unknown or blank.";
        }
        else if (!topic.topicCode) {
            throw "'Topic code' is unknown.";
        }
        else if (!topic.topicName || topic.topicName.trim().length < 1) {
            throw "'Topic Name' is unknown or blank.";
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}
