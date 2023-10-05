"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTopic = exports.AppTopicCreator = void 0;
const Topics = require("./topics");
const moduleloader_1 = require("../utils/moduleloader");
const config_1 = require("../config/config");
class AppTopicCreator {
    static initialise() {
        if (this.__initialised) {
        }
        else {
            this.topics = Object.assign(Object.assign({}, Topics), (0, moduleloader_1.load)(config_1.Config.messageTopicModule()));
        }
        return true;
    }
    static new(alias, options) {
        try {
            return new this.topics[alias](options);
        }
        catch (e) {
            throw "Topic alias name '" + alias + "' not found.\n" + e;
        }
    }
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
AppTopicCreator.__initialised = AppTopicCreator.initialise();
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