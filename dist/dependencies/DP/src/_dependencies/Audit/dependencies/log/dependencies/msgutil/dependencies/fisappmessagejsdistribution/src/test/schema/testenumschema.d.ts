export type FisMessageTypeAll = MessageType & FisMessageType;
export type FisCommandEnum = Command | FisCommand;
export type FisQueryEnum = Query | FisQuery;
export interface Testenumschema {
    [k: string]: unknown;
}
export declare enum MessageType {
    Base = "Base",
    Command = "Command",
    MicroserviceNotification = "MicroserviceNotification",
    Notification = "Notification",
    Query = "Query",
    Request = "Request",
    Response = "Response",
    ResponseData = "ResponseData",
    ResponseException = "ResponseException",
    ResponseStatus = "ResponseStatus",
    ResponseSubscription = "ResponseSubscription",
    Subscription = "Subscription"
}
export declare enum Command {
    New = "New",
    Update = "Update",
    Delete = "Delete",
    SetFieldValue = "SetFieldValue",
    Save = "Save",
    Cancel = "Cancel",
    Commit = "Commit"
}
export declare enum Query {
    General = "General"
}
export declare enum Subscription {
    General = "General"
}
export declare enum FisMessageType {
    FisBase = "FisBase",
    FisCommand = "FisCommand",
    FisQuery = "FisQuery",
    FisRequest = "FisRequest",
    FisResponse = "FisResponse"
}
export declare enum FisCommand {
    Retrieve = "Retrieve",
    Modify = "Modify",
    SetColumn = "SetColumn"
}
export declare enum FisQuery {
    Retrieve = "Retrieve"
}
