export type MessageType = AppMessageType;
export type MessageProducerInformation = ProducerInformationUi | ProducerInformationAppServer | ProducerInformationSystemServer;
export type RequestHeader = MessageHeader & RequestMessageHeader;
export type ResponseHeader = MessageHeader & ResponseMessageHeader;
export type NotificationHeader = MessageHeader & NotificationMessageHeader;
export type CommandHeader = RequestHeader & CommandMessageHeader;
export type QueryHeader = RequestHeader & QueryMessageHeader;
export type SubscriptionHeader = RequestHeader & SubscriptionMessageHeader;
export type ResponseStatusHeader = ResponseHeader & ResponseStatusMessageHeader;
export type ResponseExceptionHeader = ResponseHeader & ResponseStatusHeader & ResponseExceptionMessageHeader;
export type MicroserviceNotifcationHeader = NotificationHeader & MicroserviceNotificationMessageHeader;
export type NotifcationExceptionHeader = MessageHeader & NotificationHeader & NotificationExceptionMessageHeader;
export type UserInterfaceControlPanelFunctionsEnum = UserInterfaceControlCommonFunctions & UserInterfaceControlPanelFunctions & {
    [k: string]: unknown;
};
export type UserInterfaceControlCommandFunctionsEnum = UserInterfaceControlCommonFunctions & UserInterfaceControlCommandFunctions;
export type UserInterfaceControlFieldFunctionsEnum = UserInterfaceControlCommonFunctions & UserInterfaceControlFieldFunctions;
export interface FisAppMessage {
    header: MessageHeader;
    data: unknown;
}
export interface MessageHeader {
    messageType: MessageType;
    messageID: string;
    messageName: string;
    dateCreated: string;
    isAggregate: boolean;
    messageProducerInformation: MessageProducerInformation;
    security: MessageSecurity;
    messageDataLocation?: ExternalMessageLocation;
    messageDataFormat?: MessageFormat;
    requesterId?: string;
    instanceId?: string;
    userId?: string;
    serviceId?: string;
    dataSourceTiming?: string;
    [k: string]: unknown;
}
export interface ProducerInformationUi {
    origin: MessageProducerInformationBase;
    components: UserInterfaceComponentTypes;
}
export interface MessageProducerInformationBase {
    programID?: string;
    programName?: string;
    messageFactoryType?: FactoryType;
    appArchitectureTiers?: AppArchitectureTiers;
    userApplication: UserApplication;
}
export interface UserApplication {
    userAppId: string;
    userAppName: string;
}
export interface ProducerInformationAppServer {
    origin: MessageProducerInformationBase;
    components: FisAppServerComponents;
}
export interface ProducerInformationSystemServer {
    origin: MessageProducerInformationBase;
    components: SystemServers;
}
export interface MessageSecurity {
    socialNetworkLoginID?: string;
    ucpId?: string;
    socialNetworkUserName?: string;
    applicationLogInID?: string;
    applicationUserName?: string;
}
export interface ExternalMessageLocation {
    isEmbaded: boolean;
    url?: string;
    accessId?: string;
    accessPassword?: string;
    fileName?: string;
    remoteInstanceId?: string;
}
export interface MessageFormat {
    dataFormat: DataFormat;
    fileFormat?: FileFormat;
    schemaType?: SchemaType;
    schema?: Schema;
    mediaType?: MediaType;
}
export interface Schema {
    name?: string;
}
export interface Message {
    header: MessageHeader;
    data: unknown;
}
export interface BaseMessage {
    header: MessageHeader;
    data: unknown;
}
export interface RequestMessage {
    header: RequestHeader;
    data: unknown;
}
export interface RequestMessageHeader {
    responseRequirement?: ResponseRequirement;
    resquestTimeOut: number;
    requestExecutionMode: number;
}
export interface ResponseRequirement {
    responseDeliveryMode?: MessageDeliveryMode;
    responseDataFormat?: MessageFormat;
    externalResponseLocation?: ExternalMessageLocation;
}
export interface MessageDeliveryMode {
    timing: Timing;
    channelId?: string;
}
export interface ResponseMessage {
    header: ResponseHeader;
    data: unknown;
}
export interface ResponseMessageHeader {
    requestMessageRespondTo: RequestMessage;
}
export interface NotificationMessage {
    header: NotificationHeader;
    data: unknown;
}
export interface NotificationMessageHeader {
    notificationType: NotificationType;
    notificationNature: NotificationNature;
}
export interface CommandMessage {
    header: CommandHeader;
    data: unknown;
}
export interface CommandMessageHeader {
    command: Command;
}
export interface QueryMessage {
    header: QueryHeader;
    data: unknown;
}
export interface QueryMessageHeader {
    query: Query;
}
export interface SubscriptionMessage {
    header: SubscriptionHeader;
    data: unknown;
}
export interface SubscriptionMessageHeader {
    subscription: Subscription;
    startSubscribingDateTime?: string;
    endSubscribingDateTime?: string;
}
export interface ResponseDataMessage {
    header: ResponseHeader;
    data: unknown;
}
export interface ResponseSummaryMessage {
    header: ResponseHeader;
    data: unknown;
}
export interface ResponseStatusMessage {
    header: ResponseStatusHeader;
    data: unknown;
}
export interface ResponseStatusMessageHeader {
    responseStatus: ResponseStatus;
}
export interface ResponseExceptionMessage {
    header: ResponseExceptionHeader;
    data: unknown;
}
export interface ResponseExceptionMessageHeader {
    exception: Exception;
}
export interface Exception {
    exceptionType?: ExceptionType;
    exceptionMessage?: string;
}
export interface MicroserviceNotificationMessage {
    header: MicroserviceNotifcationHeader;
    data: Message;
}
export interface MicroserviceNotificationMessageHeader {
    microserviceTopic: MicroserviceTopic;
}
export interface MicroserviceTopic {
    topicId: string;
    topicCode: string;
    topicName: string;
}
export interface NotificationExceptionMessageHeader {
    exception: Exception;
}
export interface BackOfficeApplication {
    backOfficeAppId: string;
    backOfficeAppName: string;
    [k: string]: unknown;
}
export interface MessageFilter {
    MessageFilterCondition?: Message;
}
export interface UIEventMessage {
    message?: NotificationMessageHeader & {
        eventType: UIEventType;
        sourceComponent?: string;
        sourceComponentControlType?: string;
    };
}
export interface UIVisualControlAttributes {
    [k: string]: unknown;
}
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
export declare enum FactoryType {
    MessageCreator = "MessageCreator",
    MircroServiceProducerTopic = "MircroServiceProducerTopic",
    MircroServiceConsumerTopic = "MircroServiceConsumerTopic"
}
export declare enum AppArchitectureTiers {
    FisUserInterface = "FisUserInterface",
    FisApplicationServer = "FisApplicationServer",
    SystemServers = "SystemServers"
}
export declare enum UserInterfaceComponentTypes {
    Presentation = "Presentation",
    GlobalStore = "GlobalStore",
    DomainProxy = "DomainProxy",
    Component = "Component"
}
export declare enum FisAppServerComponents {
    UserClientProxy = "UserClientProxy",
    NetworkController = "NetworkController",
    BackOfficeApplication = "BackOfficeApplication",
    MircroServiceHandler = "MircroServiceHandler",
    QueryModule = "QueryModule",
    NotificationManager = "NotificationManager",
    GlobalStore = "GlobalStore"
}
export declare enum SystemServers {
    OperatingSystem = "OperatingSystem",
    Webservers = "Webservers",
    Database = "Database",
    ApplicationStake = "ApplicationStake",
    QuerySystem = "QuerySystem",
    Network = "Network",
    MicroserviceServer = "MicroserviceServer"
}
export declare enum DataFormat {
    Json = "Json",
    Xml = "Xml",
    Blob = "Blob",
    Dtf = "Dtf"
}
export declare enum FileFormat {
    Pdf = "Pdf",
    Text = "Text",
    Html = "Html",
    PrintFile = "PrintFile"
}
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
export declare enum Timing {
    Interactive = "Interactive",
    Batch = "Batch"
}
export declare enum NotificationType {
    UserActivity = "UserActivity",
    BusinessEvent = "BusinessEvent",
    AppServerEvent = "AppServerEvent",
    NetworkSystemEvent = "NetworkSystemEvent",
    SystemServerEvent = "SystemServerEvent"
}
export declare enum NotificationNature {
    Exception = "Exception",
    ActionRequired = "ActionRequired",
    ForInformation = "ForInformation"
}
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
export declare enum Subscription {
    General = "General"
}
export declare enum ResponseStatus {
    AcknowledgeReceived = "AcknowledgeReceived",
    PendingExecution = "PendingExecution",
    ExecutionInProgress = "ExecutionInProgress",
    ExecutiionCompletePercentage = "ExecutiionCompletePercentage",
    ExecutionCompleted = "ExecutionCompleted",
    ExecutionException = "ExecutionException"
}
export declare enum ExceptionType {
    ValidationFailed = "ValidationFailed",
    InvalidRequest = "InvalidRequest",
    UnauthorisedRequest = "UnauthorisedRequest",
    InvalidNotification = "InvalidNotification",
    UnauthorisedNotification = "UnauthorisedNotification",
    ServerUnavailable = "ServerUnavailable"
}
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
export declare enum UserInterfaceControlTypes {
    Panel = "Panel",
    Command = "Command",
    Field = "Field"
}
export declare enum UserInterfaceControlCommonFunctions {
    Enable = "Enable",
    Disable = "Disable",
    Hide = "Hide",
    Unhide = "Unhide",
    Selected = "Selected",
    ShowOptions = "ShowOptions",
    ShowDescriptions = "ShowDescriptions"
}
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
export declare enum RequestStatus {
    RequestReceived = "RequestReceived",
    RequestInProcess = "RequestInProcess",
    RequestCancelled = "RequestCancelled",
    RequestEnded = "RequestEnded",
    ProcessingRequestFailed = "ProcessingRequestFailed",
    ProcessingRequestSuccessful = "ProcessingRequestSuccessful"
}
export declare enum UIEventType {
    MouseAction = "MouseAction",
    ValueChanged = "ValueChanged"
}
