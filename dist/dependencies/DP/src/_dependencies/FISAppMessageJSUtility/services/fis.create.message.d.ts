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
    getSubscriptionMessage(ucpId: string, messageName: string, subscription: Subscription, data?: unknown): SubscriptionMessage;
    getSubscribeNotifMessage(ucpId: string, category: string, messageName?: string, lastReceivedMessageCreatedDate?: Date, lastSubscriptionId?: string): SubscriptionMessage;
    getSubscribeLoginMessage(ucpId: string): SubscriptionMessage;
    getUnsubscribeNotifMessage(ucpId: string, subscriptionId: string): SubscriptionMessage;
    getUCPId(message: ResponseMessage): string;
}
