"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMicroserviceNotificationMessageHeader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appnotificationmessagetype_1 = require("./appnotificationmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
const apptopiccreator_1 = require("../../topic/apptopiccreator");
const apptopictype_1 = require("../../topic/apptopictype");
/**
 * App microservice notification message header.
 *
 * @class AppMicroserviceNotificationMessageHeader
 */
class AppMicroserviceNotificationMessageHeader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app microservice notification message header.
     *
     * @class AppMicroserviceNotificationMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        // App message base header type is Notification.
        this.messageBaseHeaderType = appnotificationmessagetype_1.AppMessageType.Notification;
        this.messageType = appnotificationmessagetype_1.AppMessageType.MicroserviceNotification;
    }
    /**
     * Create new microservice notification header.
     *
     * @class AppMicroserviceNotificationMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MicroserviceNotificationMessageHeader} - New microservice notification header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            let topicParameters = (messageParameter && messageParameter.topicParameter);
            header.microserviceTopic = apptopiccreator_1.createTopic(topicParameters, apptopictype_1.TopicType.MicroserviceNotification);
            return header;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMicroserviceNotificationMessageHeader = AppMicroserviceNotificationMessageHeader;
//# sourceMappingURL=appmicroservicenotificationmessageheader.js.map