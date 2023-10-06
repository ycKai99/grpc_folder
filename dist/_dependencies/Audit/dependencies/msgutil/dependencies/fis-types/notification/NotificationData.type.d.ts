import { ExceptionData } from '../exception/ExceptionData';
export declare type NotificationData = {
    type?: string;
    message: string;
    appId?: string;
    url?: string;
};
export declare type NotificationException = NotificationData & ExceptionData;
export declare type NotificationMicroserviceData = NotificationData & {
    msMessage?: {};
    uiMessage?: {};
    scope?: {};
};
export declare type DatabaseNotificationData = NotificationData & {
    InstanceID: string;
    EntityTypeID: string;
    EntityTypeName: string;
    ID: string;
    Code: string;
    Operation: string;
    ReceivedDate: Date;
};
