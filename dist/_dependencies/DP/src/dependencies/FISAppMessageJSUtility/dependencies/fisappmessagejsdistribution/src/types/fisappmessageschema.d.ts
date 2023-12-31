/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
/**
 * Message type. To identify different types of message.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageType".
 */
export declare type MessageType = AppMessageType;
/**
 * Origin location ( as in app architeture components) where this message is created. Note that as message is passed to a component, a new message may be created to wrap around the first message.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageProducerInformation".
 */
export declare type MessageProducerInformation = ProducerInformationUi | ProducerInformationAppServer | ProducerInformationSystemServer;
/**
 * A Request can be a Command or a Query. Abstract definition and can not existing by itself. Name of request only appear at concrete type.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "RequestHeader".
 */
export declare type RequestHeader = MessageHeader & RequestMessageHeader;
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseHeader".
 */
export declare type ResponseHeader = MessageHeader & ResponseMessageHeader;
/**
 * Base notification message Header. Notification is at time named as event.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "NotificationHeader".
 */
export declare type NotificationHeader = MessageHeader & NotificationMessageHeader;
/**
 * A Request can be a Command. Abstract definition and can not existing by itself. Name of request only appear at concrete type.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "CommandHeader".
 */
export declare type CommandHeader = RequestHeader & CommandMessageHeader;
/**
 * A Request can be a Query. Abstract definition and can not existing by itself. Name of request only appear at concrete type.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "QueryHeader".
 */
export declare type QueryHeader = RequestHeader & QueryMessageHeader;
/**
 * Request to subscribe notifications (or events). Note that notification can be emitted from UI, Business Domain, Databases and other application tiers. Regardless, the notification and subscription each has format used consistently across all application tiers. What events to subscribes are provided in the message data section.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "SubscriptionHeader".
 */
export declare type SubscriptionHeader = RequestHeader & SubscriptionMessageHeader;
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseStatusHeader".
 */
export declare type ResponseStatusHeader = ResponseHeader & ResponseStatusMessageHeader;
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseExceptionHeader".
 */
export declare type ResponseExceptionHeader = ResponseHeader & ResponseStatusHeader & ResponseExceptionMessageHeader;
/**
 * All messages sent over microservice is in fisapp context considered as Notification messages
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MicroserviceNotifcationHeader".
 */
export declare type MicroserviceNotifcationHeader = NotificationHeader & MicroserviceNotificationMessageHeader;
/**
 * All messages sent over microservice is in fisapp context considered as Notification messages
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "NotifcationExceptionHeader".
 */
export declare type NotifcationExceptionHeader = MessageHeader & NotificationHeader & NotificationExceptionMessageHeader;
/**
 * Visual control events to be mapped to this panel functions. Extend from common functions
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UserInterfaceControlPanelFunctionsEnum".
 */
export declare type UserInterfaceControlPanelFunctionsEnum = UserInterfaceControlCommonFunctions & UserInterfaceControlPanelFunctions & {
    [k: string]: unknown;
};
/**
 * Logical Command controls functions.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UserInterfaceControlCommandFunctionsEnum".
 */
export declare type UserInterfaceControlCommandFunctionsEnum = UserInterfaceControlCommonFunctions & UserInterfaceControlCommandFunctions;
/**
 * Logical field controls functions.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UserInterfaceControlFieldFunctionsEnum".
 */
export declare type UserInterfaceControlFieldFunctionsEnum = UserInterfaceControlCommonFunctions & UserInterfaceControlFieldFunctions;
export interface FisAppMessage {
    header: MessageHeader;
    data: unknown;
}
/**
 * Common information for all messages. Usually used by the Controller to direct message to an appropriate handler (or service).
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageHeader".
 */
export interface MessageHeader {
    messageType: MessageType;
    /**
     * Unique identifier of every message.
     * Every message has a internally unique identifier within FisApp environment.
     * This value is generated at the originator of the message and which in most cases is the message factory
     */
    messageID: string;
    /**
     * Short description of this message. Value can be auto populated by factory.
     */
    messageName: string;
    /**
     * The date time that the message was created by the factory
     */
    dateCreated: string;
    /**
     * Whether the message data is an aggregate of messages.If true then the aggregate messages are contained in the MessageData section as array of messages.
     */
    isAggregate: boolean;
    messageProducerInformation: MessageProducerInformation;
    security: MessageSecurity;
    messageDataLocation?: ExternalMessageLocation;
    messageDataFormat?: MessageFormat;
    /**
     * Requester Id that sends the message and used to identify an Fis application in Fis Back office server. If requesterId is not provided, it would use ucpId as requesterId.
     */
    requesterId?: string;
    /**
     * A FisApp generated reference ID to an instantiated service in Fis Back office server. Can be null if not applicable.
     */
    instanceId?: string;
    userId?: string;
    /**
     * FIS service to invoke(mandatory).
     */
    serviceId?: string;
    /**
     * Data source timing. i.e. EDIT(get data from editing cache).
     */
    dataSourceTiming?: string;
    [k: string]: unknown;
}
/**
 * Producer information is UI.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ProducerInformationUi".
 */
export interface ProducerInformationUi {
    origin: MessageProducerInformationBase;
    components: UserInterfaceComponentTypes;
}
/**
 * Location of source program that generated this message
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageProducerInformationBase".
 */
export interface MessageProducerInformationBase {
    programID?: string;
    programName?: string;
    messageFactoryType?: FactoryType;
    appArchitectureTiers?: AppArchitectureTiers;
    userApplication: UserApplication;
}
/**
 * Applications as login by user. Is a logical application with a  collection of programs to perform some related business functions. It referrrs to one or more back office applications under the User-BackOffice relationship entity. Example, FisPayment, PlantationFiledApp, FisSalesForce.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UserApplication".
 */
export interface UserApplication {
    userAppId: string;
    userAppName: string;
}
/**
 * Producer information is App Server.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ProducerInformationAppServer".
 */
export interface ProducerInformationAppServer {
    origin: MessageProducerInformationBase;
    components: FisAppServerComponents;
}
/**
 * Producer information is System Server.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ProducerInformationSystemServer".
 */
export interface ProducerInformationSystemServer {
    origin: MessageProducerInformationBase;
    components: SystemServers;
}
/**
 * Authentication and authorization information
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageSecurity".
 */
export interface MessageSecurity {
    /**
     * Social network user id that user log on. can be null and in which case user did not use social network user id to log in but instead directly log on using FisApp user id. Note that a client can be a daemon process and in which case it also has a log in id.
     */
    socialNetworkLoginID?: string;
    /**
     * user application session client proxy. can be null if user has not log in
     */
    ucpId?: string;
    /**
     * name of social network user
     */
    socialNetworkUserName?: string;
    /**
     * FIS User ID.
     */
    applicationLogInID?: string;
    /**
     * name of application user
     */
    applicationUserName?: string;
}
/**
 * Compositable definition. Can be included in message header or message data. For non-embaded data, specific location where data can be read. Applicatiion for all message action type.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageDataLocation".
 */
export interface ExternalMessageLocation {
    isEmbaded: boolean;
    url?: string;
    accessId?: string;
    accessPassword?: string;
    fileName?: string;
    remoteInstanceId?: string;
}
/**
 * Compositable definition. Data message format details which is required in different types of messages. Format can be used (1) defining message when establishing commuincation protocal  (2) defining message data section (3) defining a field in the message data section
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageFormat".
 */
export interface MessageFormat {
    dataFormat: DataFormat;
    fileFormat?: FileFormat;
    schemaType?: SchemaType;
    schema?: Schema;
    mediaType?: MediaType;
}
/**
 * More information on the data schema type.
 */
export interface Schema {
    name?: string;
}
/**
 * Payload data has the actual message sent by producer.
 * @property header - Common information for all messages. Usually used by the Controller to direct message to an appropriate handler (or service).
 * @property data - Data.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "Message".
 */
export interface Message {
    header: MessageHeader;
    data: unknown;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "BaseMessage".
 */
export interface BaseMessage {
    header: MessageHeader;
    data: unknown;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "RequestMessage".
 */
export interface RequestMessage {
    header: RequestHeader;
    data: unknown;
}
/**
 * A Request can be a Command or a Query. Abstract definition and can not existing by itself. Name of request only appear at concrete type.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "RequestMessageHeader".
 */
export interface RequestMessageHeader {
    responseRequirement?: ResponseRequirement;
    /**
     * If not completed within stipulated time (since message created), then cancel request. Time out in milli seconds. 0-no time out.
     */
    resquestTimeOut: number;
    /**
     * To execute after a specified certain time (since message created), 0 as immediate, -1 as batch que
     */
    requestExecutionMode: number;
}
/**
 * Client that request defines what sort of response expected.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseRequirement".
 */
export interface ResponseRequirement {
    responseDeliveryMode?: MessageDeliveryMode;
    responseDataFormat?: MessageFormat;
    externalResponseLocation?: ExternalMessageLocation;
}
/**
 * Compositable definition. How message is to be delivered. Usually though not mendatory is as requested by client. If not specidied then leave to default transport handler. Applicable more for a requesting client message to specify how response messages should be delivered back.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageDeliveryMode".
 */
export interface MessageDeliveryMode {
    timing: Timing;
    /**
     * Identifier for a particular transport channel to use.
     */
    channelId?: string;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseMessage".
 */
export interface ResponseMessage {
    header: ResponseHeader;
    data: unknown;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseMessageHeader".
 */
export interface ResponseMessageHeader {
    requestMessageRespondTo: RequestMessage;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "NotificationMessage".
 */
export interface NotificationMessage {
    header: NotificationHeader;
    data: unknown;
}
/**
 * Base notification message Header. Notification is at time named as event.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "NotificationMessageHeader".
 */
export interface NotificationMessageHeader {
    notificationType: NotificationType;
    notificationNature: NotificationNature;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "CommandMessage".
 */
export interface CommandMessage {
    header: CommandHeader;
    data: unknown;
}
/**
 * A Request can be a Command. Abstract definition and can not existing by itself. Name of request only appear at concrete type.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "CommandMessageHeader".
 */
export interface CommandMessageHeader {
    command: Command;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "QueryMessage".
 */
export interface QueryMessage {
    header: QueryHeader;
    data: unknown;
}
/**
 * A Request can be a Query. Abstract definition and can not existing by itself. Name of request only appear at concrete type.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "QueryMessageHeader".
 */
export interface QueryMessageHeader {
    query: Query;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "SubscriptionMessage".
 */
export interface SubscriptionMessage {
    header: SubscriptionHeader;
    data: unknown;
}
/**
 * Request to subscribe notifications (or events). Note that notification can be emitted from UI, Business Domain, Databases and other application tiers. Regardless, the notification and subscription each has format used consistently across all application tiers. What events to subscribes are provided in the message data section.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "SubscriptionMessageHeader".
 */
export interface SubscriptionMessageHeader {
    subscription: Subscription;
    /**
     * effect date time when to start subscribing. Default is right now.
     */
    startSubscribingDateTime?: string;
    /**
     * effect date time when to end subscribing. Default is year 2999 which means forever.
     */
    endSubscribingDateTime?: string;
}
/**
 * Data returned from successful request operation
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseDataMessage".
 */
export interface ResponseDataMessage {
    header: ResponseHeader;
    data: unknown;
}
/**
 * Summary information or description for the response messages
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseSummaryMessage".
 */
export interface ResponseSummaryMessage {
    header: ResponseHeader;
    data: unknown;
}
/**
 * Data returned from successful request operation
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseStatusMessage".
 */
export interface ResponseStatusMessage {
    header: ResponseStatusHeader;
    data: unknown;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseStatusMessageHeader".
 */
export interface ResponseStatusMessageHeader {
    responseStatus: ResponseStatus;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseExceptionMessage".
 */
export interface ResponseExceptionMessage {
    header: ResponseExceptionHeader;
    data: unknown;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseExceptionMessageHeader".
 */
export interface ResponseExceptionMessageHeader {
    exception: Exception;
}
/**
 * Common exception information
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "Exception".
 */
export interface Exception {
    exceptionType?: ExceptionType;
    exceptionMessage?: string;
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MicroserviceNotificationMessage".
 */
export interface MicroserviceNotificationMessage {
    header: MicroserviceNotifcationHeader;
    data: Message;
}
/**
 * All messages sent over microservice is in fisapp context considered as Notification messages
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MicroserviceNotificationMessageHeader".
 */
export interface MicroserviceNotificationMessageHeader {
    microserviceTopic: MicroserviceTopic;
}
/**
 * Similar in usage to Kafka topic. This literal object is used in NestJS microservice client cp header
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MicroserviceTopic".
 */
export interface MicroserviceTopic {
    topicId: string;
    topicCode: string;
    topicName: string;
}
/**
 * All messages sent over microservice is in fisapp context considered as Notification messages
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "NotificationExceptionMessageHeader".
 */
export interface NotificationExceptionMessageHeader {
    exception: Exception;
}
/**
 * Various ERP system running on the server side. Example FisBackOffice, FisEcommerce etc
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "BackOfficeApplication".
 */
export interface BackOfficeApplication {
    backOfficeAppId: string;
    backOfficeAppName: string;
    [k: string]: unknown;
}
/**
 * Message filter is based on GraphQl query schema concept. Message object with sfield values are the condition filter.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "MessageFilter".
 */
export interface MessageFilter {
    MessageFilterCondition?: Message;
}
/**
 * A general UI React Control Item event message for events such as mouse over, property changed, onclick etc. In the case of UI, the term Notification and Event is used interchangeably. A message will contain only one event (which is passed in the message data section). Should be an Interface Type
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UIEventMessage".
 */
export interface UIEventMessage {
    message?: NotificationMessageHeader & {
        eventType: UIEventType;
        /**
         * The Ng Component that generated the event. For now is just a string. Later make it a reference to a Component schema
         */
        sourceComponent?: string;
        /**
         * The type of control item (MENU, FIELD, WINDOW, LINKS) that generated the event. There should be enum value for types of controls.
         */
        sourceComponentControlType?: string;
    };
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UIVisualControlAttributes".
 */
export interface UIVisualControlAttributes {
    [k: string]: unknown;
}
/**
 * App message type. To identify different types of app base message.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "AppMessageType".
 */
export declare enum AppMessageType {
    Base = "Base",
    Request = "Request",
    Command = "Command",
    Query = "Query",
    Subscription = "Subscription",
    Response = "Response",
    ResponseData = "ResponseData",
    ResponseStatus = "ResponseStatus",
    ResponseSummary = "ResponseSummary",
    ResponseException = "ResponseException",
    Notification = "Notification",
    MicroserviceNotification = "MicroserviceNotification",
    NotificationException = "NotificationException"
}
/**
 * Types of injectable services
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "FactoryTypeEnum".
 */
export declare enum FactoryType {
    MessageCreator = "MessageCreator",
    MircroServiceProducerTopic = "MircroServiceProducerTopic",
    MircroServiceConsumerTopic = "MircroServiceConsumerTopic"
}
/**
 * Highligh level app architecture levels
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "AppArchitectureTiersEnum".
 */
export declare enum AppArchitectureTiers {
    FisUserInterface = "FisUserInterface",
    FisApplicationServer = "FisApplicationServer",
    SystemServers = "SystemServers"
}
/**
 * Major UI components
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UserInterfaceComponentTypesEnum".
 */
export declare enum UserInterfaceComponentTypes {
    Presentation = "Presentation",
    GlobalStore = "GlobalStore",
    DomainProxy = "DomainProxy",
    Component = "Component"
}
/**
 * Major components of Fis Application server
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "FisAppServerComponentsEnum".
 */
export declare enum FisAppServerComponents {
    UserClientProxy = "UserClientProxy",
    NetworkController = "NetworkController",
    BackOfficeApplication = "BackOfficeApplication",
    MircroServiceHandler = "MircroServiceHandler",
    QueryModule = "QueryModule",
    NotificationManager = "NotificationManager",
    GlobalStore = "GlobalStore"
}
/**
 * System softwares. Windows, NodeJs, NestJS, MicroserviceServers etc
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "SystemServersEnum".
 */
export declare enum SystemServers {
    OperatingSystem = "OperatingSystem",
    Webservers = "Webservers",
    Database = "Database",
    ApplicationStake = "ApplicationStake",
    QuerySystem = "QuerySystem",
    Network = "Network",
    MicroserviceServer = "MicroserviceServer"
}
/**
 * Applicable for report query.
 */
export declare enum DataFormat {
    Json = "Json",
    Xml = "Xml",
    Blob = "Blob",
    Dtf = "Dtf"
}
/**
 * File type in which the message is kept. Usually correcspond to the file extension
 */
export declare enum FileFormat {
    Pdf = "Pdf",
    Text = "Text",
    Html = "Html",
    PrintFile = "PrintFile"
}
/**
 * The data schema type.
 */
export declare enum SchemaType {
    FisFieldValue = "FisFieldValue",
    FisMetadata = "FisMetadata",
    GraphQL = "GraphQL",
    JsonSchema = "JsonSchema",
    Soap = "Soap",
    Wsdl = "Wsdl"
}
export declare enum MediaType {
    Audio = "Audio",
    Video = "Video",
    Image = "Image",
    Text = "Text"
}
/**
 * Interactive message exchange or batch delayed. Interactive reponse is immediate by individually message continuous streaming. Batched messages are collected for one delivery.
 */
export declare enum Timing {
    Interactive = "Interactive",
    Batch = "Batch"
}
/**
 * For UI Events, MS Events, NestJS Events, FIS Events
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "NotificationTypeEnum".
 */
export declare enum NotificationType {
    UserActivity = "UserActivity",
    BusinessEvent = "BusinessEvent",
    AppServerEvent = "AppServerEvent",
    NetworkSystemEvent = "NetworkSystemEvent",
    SystemServerEvent = "SystemServerEvent"
}
/**
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "NotificationNatureEnum".
 */
export declare enum NotificationNature {
    Exception = "Exception",
    ActionRequired = "ActionRequired",
    ForInformation = "ForInformation"
}
/**
 * List of commands
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "CommandEnum".
 */
export declare enum Command {
    Start = "Start",
    Login = "Login",
    Stop = "Stop",
    Logout = "Logout",
    New = "New",
    Update = "Update",
    Delete = "Delete",
    SetFieldValue = "SetFieldValue",
    Save = "Save",
    Cancel = "Cancel",
    Commit = "Commit",
    Retrieve = "Retrieve",
    Modify = "Modify",
    SetColumn = "SetColumn",
    ItemChanged = "ItemChanged",
    SetItem = "SetItem",
    CancelChanges = "CancelChanges",
    Distribute = "Distribute",
    Post = "Post",
    AppendRow = "AppendRow",
    InsertRow = "InsertRow",
    DeleteRow = "DeleteRow",
    Execute = "Execute"
}
/**
 * Query request.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "QueryEnum".
 */
export declare enum Query {
    General = "General",
    GetMetadata = "GetMetadata",
    Count = "Count",
    Retrieve = "Retrieve",
    GetData = "GetData",
    GetColumn = "GetColumn",
    GetAliases = "GetAliases",
    GetColumnNames = "GetColumnNames",
    GetEditStatus = "GetEditStatus",
    RowCount = "RowCount"
}
/**
 * Request to subscribe messages
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "SubscriptionEnum".
 */
export declare enum Subscription {
    General = "General"
}
/**
 * Response on status of request performance.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ResponseStatusEnum".
 */
export declare enum ResponseStatus {
    AcknowledgeReceived = "AcknowledgeReceived",
    PendingExecution = "PendingExecution",
    ExecutionInProgress = "ExecutionInProgress",
    ExecutiionCompletePercentage = "ExecutiionCompletePercentage",
    ExecutionCompleted = "ExecutionCompleted",
    ExecutionException = "ExecutionException"
}
/**
 * Response exception types
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "ExceptionEnum".
 */
export declare enum ExceptionType {
    ValidationFailed = "ValidationFailed",
    InvalidRequest = "InvalidRequest",
    UnauthorisedRequest = "UnauthorisedRequest",
    InvalidNotification = "InvalidNotification",
    UnauthorisedNotification = "UnauthorisedNotification",
    ServerUnavailable = "ServerUnavailable"
}
/**
 * Type of message.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "TypeOfMessage".
 */
export declare enum TypeOfMessage {
    Message = "Message",
    RequestMessage = "RequestMessage",
    CommandMessage = "CommandMessage",
    QueryMessage = "QueryMessage",
    SubscriptionMessage = "SubscriptionMessage",
    ResponseMessage = "ResponseMessage",
    ResponseDataMessage = "ResponseDataMessage",
    ResponseStatusMessage = "ResponseStatusMessage",
    ResponseSummaryMessage = "ResponseSummaryMessage",
    ResponseExceptionMessage = "ResponseExceptionMessage",
    NotificationMessage = "NotificationMessage",
    MicroserviceNotificationMessage = "MicroserviceNotificationMessage",
    NotificationExceptionMessage = "NotificationExceptionMessage"
}
/**
 * Mapping of visual controls to logical control types. Buttons and Menu items are consider logically as a Command control.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UserInterfaceControlTypesEnum".
 */
export declare enum UserInterfaceControlTypes {
    Panel = "Panel",
    Command = "Command",
    Field = "Field"
}
/**
 * Common functions that appeats in all logical controls.
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "UserInterfaceControlCommonFunctionsEnum".
 */
export declare enum UserInterfaceControlCommonFunctions {
    Enable = "Enable",
    Disable = "Disable",
    Hide = "Hide",
    Unhide = "Unhide",
    Selected = "Selected",
    ShowOptions = "ShowOptions",
    ShowDescriptions = "ShowDescriptions"
}
/**
 * Visual control events to be mapped to this panel functions
 */
export declare enum UserInterfaceControlPanelFunctions {
    Open = "OPEN",
    Close = "CLOSE",
    ScrollUp = "SCROLL-UP",
    ScrollDown = "SCROLL-DOWN",
    ScrollRight = "SCROLL-RIGHT",
    ScrollLeft = "SCROLL-LEFT",
    Maximise = "MAXIMISE",
    Minimise = "MINIMISE",
    OpenChild = "OPEN-CHILD",
    CloseChild = "CLOSE-CHILD",
    CommandSelected = "COMMAND-SELECTED",
    PropertyChanges = "PROPERTY-CHANGED",
    SetTitle = "SET-TITLE"
}
export declare enum UserInterfaceControlCommandFunctions {
    Execute = "EXECUTE",
    ShowDetails = "SHOW-DETAILS",
    ShowChildCommand = "SHOW-CHILD-COMMAND",
    Enable = "ENABLE",
    Disable = "DISABLE"
}
export declare enum UserInterfaceControlFieldFunctions {
    ValueChanged = "ValueChanged",
    Undo = "Undo",
    Redo = "Redo",
    SetValue = "SetValue"
}
/**
 * Possible statuses of a Request
 *
 * This interface was referenced by `FisAppMessage`'s JSON-Schema
 * via the `definition` "RequestStatusEnum".
 */
export declare enum RequestStatus {
    RequestReceived = "RequestReceived",
    RequestInProcess = "RequestInProcess",
    RequestCancelled = "RequestCancelled",
    RequestEnded = "RequestEnded",
    ProcessingRequestFailed = "ProcessingRequestFailed",
    ProcessingRequestSuccessful = "ProcessingRequestSuccessful"
}
/**
 * ?? to define various UI notification type.
 */
export declare enum UIEventType {
    MouseAction = "MouseAction",
    ValueChanged = "ValueChanged"
}
