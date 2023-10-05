import { MessageParameter, Command, Query, Subscription } from '../../types/appmessagetype';
export interface RequestMessageParameter extends MessageParameter {
    resquestTimeOut?: number;
    requestExecutionMode?: number;
}
export interface CommandMessageParameter extends RequestMessageParameter {
    command: Command;
}
export interface QueryMessageParameter extends RequestMessageParameter {
    query: Query;
}
export interface SubscriptionMessageParameter extends RequestMessageParameter {
    subscription: Subscription;
    startSubscribingDateTime: Date | string;
    endSubscribingDateTime: Date | string;
}
