"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMicroserviceNotificationTopic = void 0;
const apptopictype_1 = require("./apptopictype");
const apptopickind_1 = require("./apptopickind");
class AppMicroserviceNotificationTopic extends apptopickind_1.AppTopicKind {
    constructor() {
        super();
        this.baseTopicType = apptopictype_1.TopicType.Microservice;
    }
    createTopic(topicParameters) {
        return {};
    }
}
exports.AppMicroserviceNotificationTopic = AppMicroserviceNotificationTopic;
//# sourceMappingURL=appmicroservicenotificationtopic.js.map