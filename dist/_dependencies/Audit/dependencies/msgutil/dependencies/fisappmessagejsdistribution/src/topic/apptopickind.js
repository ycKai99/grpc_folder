"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppTopicKind = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apptopictype_1 = require("./apptopictype");
const apptopiccreator_1 = require("./apptopiccreator");
const apptopicvalidation_1 = require("./apptopicvalidation");
/**
 * Abstract App topic kind.
 *
 * @class AppTopicKind
 */
class AppTopicKind {
    /**
     * Create new app topic.
     *
     * @class AppTopicKind
     * @method constructor
     */
    constructor() {
        // App base topic type. Default is Base
        this.baseTopicType = apptopictype_1.TopicType.Base;
    }
    /**
     * Create new app topic.
     *
     * @class AppTopicKind
     * @method create
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @return {Topic} - App topic.
     */
    create(topicParameters) {
        try {
            this.topic = Object.assign(Object.assign({}, apptopiccreator_1.createTopic(topicParameters, this.baseTopicType)), this.createTopic(topicParameters));
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
    validate(topic) {
        try {
            return apptopicvalidation_1.validateTopic(topic);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppTopicKind = AppTopicKind;
//# sourceMappingURL=apptopickind.js.map