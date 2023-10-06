"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMicroserviceNotificationTopic = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apptopictype_1 = require("./apptopictype");
const apptopickind_1 = require("./apptopickind");
/**
 * App microservice notification topic.
 *
 * @class AppMicroserviceNotificationTopic
 */
class AppMicroserviceNotificationTopic extends apptopickind_1.AppTopicKind {
    /**
     * Create new app microservice notification topic.
     *
     * @class AppMicroserviceNotificationTopic
     * @method constructor
     */
    constructor() {
        super();
        // App base topic type is Microservice.
        this.baseTopicType = apptopictype_1.TopicType.Microservice;
    }
    /**
     * Create new app microservice notification topic.
     *
     * @class AppMicroserviceNotificationTopic
     * @method createTopic
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @return {GenericTopic} - App microservice notification topic.
     */
    createTopic(topicParameters) {
        return {};
    }
}
exports.AppMicroserviceNotificationTopic = AppMicroserviceNotificationTopic;
//# sourceMappingURL=appmicroservicenotificationtopic.js.map