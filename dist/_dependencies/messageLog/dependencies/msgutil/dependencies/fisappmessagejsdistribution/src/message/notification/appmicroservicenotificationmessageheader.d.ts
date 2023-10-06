/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericHeader, AppMessageHeaderOptions, MicroserviceNotificationMessageParameter as MessageParameter } from './appnotificationmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App microservice notification message header.
 *
 * @class AppMicroserviceNotificationMessageHeader
 */
export declare class AppMicroserviceNotificationMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app microservice notification message header.
     *
     * @class AppMicroserviceNotificationMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new microservice notification header.
     *
     * @class AppMicroserviceNotificationMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MicroserviceNotificationMessageHeader} - New microservice notification header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
