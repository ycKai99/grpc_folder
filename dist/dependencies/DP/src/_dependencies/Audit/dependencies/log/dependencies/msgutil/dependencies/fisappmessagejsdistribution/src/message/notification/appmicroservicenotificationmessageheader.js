"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMicroserviceNotificationMessageHeader = void 0;
const appnotificationmessagetype_1 = require("./appnotificationmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
const apptopiccreator_1 = require("../../topic/apptopiccreator");
const apptopictype_1 = require("../../topic/apptopictype");
class AppMicroserviceNotificationMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    constructor(options) {
        super(options);
        this.messageBaseHeaderType = appnotificationmessagetype_1.AppMessageType.Notification;
        this.messageType = appnotificationmessagetype_1.AppMessageType.MicroserviceNotification;
    }
    createHeader(messageParameter) {
        try {
            let header = {};
            let topicParameters = (messageParameter && messageParameter.topicParameter);
            header.microserviceTopic = (0, apptopiccreator_1.createTopic)(topicParameters, apptopictype_1.TopicType.MicroserviceNotification);
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMicroserviceNotificationMessageHeader = AppMicroserviceNotificationMessageHeader;
//# sourceMappingURL=appmicroservicenotificationmessageheader.js.map