"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppTopicKind = void 0;
const apptopictype_1 = require("./apptopictype");
const apptopiccreator_1 = require("./apptopiccreator");
const apptopicvalidation_1 = require("./apptopicvalidation");
class AppTopicKind {
    constructor() {
        this.baseTopicType = apptopictype_1.TopicType.Base;
    }
    create(topicParameters) {
        try {
            this.topic = Object.assign(Object.assign({}, (0, apptopiccreator_1.createTopic)(topicParameters, this.baseTopicType)), this.createTopic(topicParameters));
            this.validate(this.topic);
            return this.topic;
        }
        catch (e) {
            throw "App topic is not valid. " + e;
        }
    }
    validate(topic) {
        try {
            return (0, apptopicvalidation_1.validateTopic)(topic);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppTopicKind = AppTopicKind;
//# sourceMappingURL=apptopickind.js.map