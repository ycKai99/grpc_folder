import { Command, Query, RequestMessage, QueryMessage, NotificationType, ProducerType, Subscription, SubscriptionMessage, ResponseMessage, CommandMessage, ResponseStatus, ExceptionType, ResponseExceptionMessage } from '../dependencies/dependencies';
import { AppMessageType } from '../dependencies/dependencies';
import { NotificationMessage } from '../dependencies/dependencies';
export declare class FisCreateMessageUtility {
    protected thisUserAppId: string;
    protected requesterID: string;
    protected PRODUCER: {
        type: ProducerType;
        origin: {
            userApplication: {
                userAppId: string;
                userAppName: string;
            };
        };
    };
    constructor(UserAppId: string, UserAppName?: string, producer?: ProducerType);
    getApplicationId(): string;
    getQueryMessage(ucpId: string, query: Query, data: any, messageName?: string): QueryMessage;
    generateRequest(message: RequestMessage | NotificationMessage): RequestMessage;
    getResponseMessage(ucpId: string, data: any, responseToMessage: RequestMessage, messageName?: string, responseMessageType?: AppMessageType, schemaName?: string): ResponseMessage;
    getResponseDataMessage(ucpId: string, data: any, responseToMessage: RequestMessage, messageName?: string, responseMessageType?: AppMessageType, schemaName?: string): ResponseMessage;
    getResponseSummaryMessage(ucpId: string, data: any, responseToMessage: RequestMessage, messageName?: string, responseMessageType?: AppMessageType, schemaName?: string): ResponseMessage;
    getResponseStatusMessage(ucpId: string, data: any, responseToMessage: RequestMessage, thisResponseStatus: ResponseStatus, messageName?: string, responseMessageType?: AppMessageType, schemaName?: string): ResponseMessage;
    getResponseExceptionMessage(ucpId: string, data: any, responseToMessage?: RequestMessage, thisResponseStatus?: ResponseStatus, thisExceptionType?: ExceptionType, messageName?: string, responseMessageType?: AppMessageType, schemaName?: string): ResponseExceptionMessage;
    private setUserAppSettings;
    getUserAppId(): string;
    getDPmessage(message: any): any;
    getLoginMessage(): CommandMessage;
    getLogoutMessage(ucpId: string): CommandMessage;
    getCommandMessage(ucpId: string, command: Command, data?: any, messageName?: string): CommandMessage;
    getCommandMessage_ext(ucpId: string, command: string, serviceId: string, data?: any, messageName?: string): CommandMessage;
    getQueryMessage_ext(ucpId: string, query: string, serviceId: string, data?: any, messageName?: string): QueryMessage;
    getQueryMessageForGraphQL(ucpId: string, query: string, messageName?: string): QueryMessage;
    getNotificationMessage(ucpId: string, data?: any, messageName?: string, notificationType?: NotificationType): NotificationMessage;
    /**
     * message to subscribe server message
     * @param ucpId
     * @param category category of message, e.g. property_change
     */
    getSubscriptionMessage(ucpId: string, messageName: string, subscription: Subscription, data?: unknown): SubscriptionMessage;
    /**
     * message to subscribe server notification
     * @param ucpId
     * @param category category of notification, e.g. property_change
     */
    getSubscribeNotifMessage(ucpId: string, category: string, messageName?: string, lastReceivedMessageCreatedDate?: Date, lastSubscriptionId?: string): SubscriptionMessage;
    /**
     * message to subscribe server notifications
     * @param ucpId
     * @param category category of Notifications, e.g. property_change
     */
    getSubscribeLoginMessage(ucpId: string): SubscriptionMessage;
    /**
     * message object to unsubscribe server
     * @param ucpId
     * @param subscriptionId
     */
    getUnsubscribeNotifMessage(ucpId: string, subscriptionId: string): SubscriptionMessage;
    /**
     * Extract UCPId from response message
     * @param message is a response message.
     */
    getUCPId(message: ResponseMessage): string;
}
