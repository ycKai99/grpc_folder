/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, GenericHeader, AppMessageHeaderOptions } from './appnotificationmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App notification message header.
 *
 * @class AppNotificationMessageHeader
 */
export declare class AppNotificationMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app notification message header.
     *
     * @class AppNotificationMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new notification header.
     *
     * @class AppNotificationMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {NotificationMessageHeader} - New notification header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
