"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMicroserviceNotificationMessage = exports.AppMicroserviceNotificationMessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appnotificationmessagetype_1 = require("./appnotificationmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App microservice notification message.
 *
 * @class AppMicroserviceNotificationMessage
 */
class AppMicroserviceNotificationMessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app microservice notification message.
     *
     * @class AppMicroserviceNotificationMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = appnotificationmessagetype_1.AppMessageType.MicroserviceNotification;
    }
    /**
     * Create new microservice notification message.
     *
     * @class AppMicroserviceNotificationMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MicroserviceNotificationMessage} - New microservice notification message.
     */
    createMessage(messageParameter) {
        try {
            this.microserviceNotificationMessage = {};
            return this.microserviceNotificationMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMicroserviceNotificationMessage = AppMicroserviceNotificationMessage;
/**
 * Create new App microservice notification message.
 *
 * @function createMicroserviceNotificationMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App microservice notification message.
 */
function createMicroserviceNotificationMessage(messageParameter) {
    try {
        return new AppMicroserviceNotificationMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createMicroserviceNotificationMessage = createMicroserviceNotificationMessage;
//# sourceMappingURL=appmicroservicenotificationmessage.js.map