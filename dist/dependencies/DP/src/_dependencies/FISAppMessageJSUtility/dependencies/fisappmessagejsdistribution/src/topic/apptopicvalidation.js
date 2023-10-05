"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTopicBase = exports.validateTopic = void 0;
function validateTopic(topic) {
    try {
        return true;
    }
    catch (e) {
        throw e;
    }
}
exports.validateTopic = validateTopic;
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