"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTopic = exports.AppTopicCreator = void 0;
const Topics = require("./topics");
const moduleloader_1 = require("../utils/moduleloader");
const config_1 = require("../config/config");
/**
 * App topic creator.
 *
 * @class AppTopicCreator
 */
class AppTopicCreator {
    /**
     * Initialise topic creator.
     *
     * @class AppTopicCreator
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
        if (this.__initialised) {
        }
        else {
            // Load additional topic modules
            this.topics = Object.assign(Object.assign({}, Topics), moduleloader_1.load(config_1.Config.messageTopicModule()));
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
    static new(alias, options) {
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
    static create(topicParameters, alias, options) {
        try {
            return this.new(alias, options).create(topicParameters);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppTopicCreator = AppTopicCreator;
/**
 * Initialise topic creator.
 *
 * @class AppTopicCreator
 * @property __initialised
 * @type {boolean}
 */
AppTopicCreator.__initialised = AppTopicCreator.initialise();
/**
 * Create new app topic.
 *
 * @function createTopic
 * @param topicParameters {TopicParameters} - Topic parameters.
 * @param alias {string} -  Topic class alias name.
 * @param options {any} - Topic options.
 * @return {Topic} - New app topic.
 */
function createTopic(topicParameters, alias, options) {
    try {
        return AppTopicCreator.create(topicParameters, alias, options);
    }
    catch (e) {
        throw e;
    }
}
exports.createTopic = createTopic;
//# sourceMappingURL=apptopiccreator.js.map