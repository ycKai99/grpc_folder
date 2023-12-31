"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTopicBase = exports.validateTopic = void 0;
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
function validateTopic(topic) {
    try {
        return true;
    }
    catch (e) {
        throw e;
    }
}
exports.validateTopic = validateTopic;
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
function validateTopicBase(topic) {
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
exports.validateTopicBase = validateTopicBase;
//# sourceMappingURL=apptopicvalidation.js.map