/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MicroserviceNotificationMessage, MicroserviceNotificationMessageParameter as MessageParameter, AppMessageHeaderOptions } from './appnotificationmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
/**
 * App microservice notification message.
 *
 * @class AppMicroserviceNotificationMessage
 */
export declare class AppMicroserviceNotificationMessage extends AppMessageKind {
    /**
     * Create new app microservice notification message.
     *
     * @class AppMicroserviceNotificationMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * App microservice notification Message.
     *
     * @class AppMicroserviceNotificationMessage
     * @property microserviceNotificationMessage
     * @type {MicroserviceNotificationMessage} - App microservice notification Message.
     */
    protected microserviceNotificationMessage: MicroserviceNotificationMessage;
    /**
     * Create new microservice notification message.
     *
     * @class AppMicroserviceNotificationMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MicroserviceNotificationMessage} - New microservice notification message.
     */
    protected createMessage(messageParameter: MessageParameter): MicroserviceNotificationMessage;
}
/**
 * Create new App microservice notification message.
 *
 * @function createMicroserviceNotificationMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App microservice notification message.
 */
export declare function createMicroserviceNotificationMessage(messageParameter: MessageParameter): Message;
