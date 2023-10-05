import { ExceptionData } from '../exception/ExceptionData';
export type NotificationData = {
    type?: string;
    message: string;
    appId?: string;
    url?: string;
};
export type NotificationException = NotificationData & ExceptionData;
export type NotificationMicroserviceData = NotificationData & {
    msMessage?: {};
    uiMessage?: {};
    scope?: {};
};
export type DatabaseNotificationData = NotificationData & {
    InstanceID: string;
    EntityTypeID: string;
    EntityTypeName: string;
    ID: string;
    Code: string;
    Operation: string;
    ReceivedDate: Date;
};
