"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppTopic = exports.AppTopicBase = void 0;
const apptopicvalidation_1 = require("./apptopicvalidation");
const idgenerator_1 = require("../utils/idgenerator");
class AppTopicBase {
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
    validate(topic) {
        try {
            return (0, apptopicvalidation_1.validateTopicBase)(topic);
        }
        catch (e) {
            throw e;
        }
    }
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
    generateId() {
        try {
            return (0, idgenerator_1.generateNewId)(idgenerator_1.Uuid);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppTopicBase = AppTopicBase;
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