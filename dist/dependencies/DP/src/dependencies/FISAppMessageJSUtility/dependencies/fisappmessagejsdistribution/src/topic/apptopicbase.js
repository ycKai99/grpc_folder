"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppTopic = exports.AppTopicBase = void 0;
const apptopicvalidation_1 = require("./apptopicvalidation");
const idgenerator_1 = require("../utils/idgenerator");
/**
 * App topic base.
 *
 * @class AppTopicBase
 */
class AppTopicBase {
    /**
     * Create new app topic base.
     *
     * @class AppTopicBase
     * @method create
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @return {Topic} - App topic.
     */
    create(topicParameters) {
        try {
            this.topic = this.createTopic(topicParameters);
            this.validate(this.topic);
            return this.topic;
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
    validate(topic) {
        try {
            return apptopicvalidation_1.validateTopicBase(topic);
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
    createTopic(topicParameters) {
        try {
            let topic = {};
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
    generateId() {
        try {
            return idgenerator_1.generateNewId(idgenerator_1.Uuid);
            // return new Uuid().generateId();
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppTopicBase = AppTopicBase;
/**
 * Create new app topic base.
 *
 * @class AppTopicBase
 * @method createAppTopic
 * @param topicParameters {TopicParameters} - Topic parameters.
 * @return {TopicBase} - App topic.
 */
function createAppTopic(topicParameters) {
    try {
        return new AppTopicBase().create(topicParameters);
    }
    catch (e) {
        throw e;
    }
}
exports.createAppTopic = createAppTopic;
//# sourceMappingURL=apptopicbase.js.map