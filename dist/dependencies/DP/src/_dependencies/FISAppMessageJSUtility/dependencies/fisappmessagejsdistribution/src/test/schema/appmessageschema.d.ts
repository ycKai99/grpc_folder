export type RequestHeader = MessageHeader & RequestMessageHeader;
export type MessageProducerInformation = ProducerInformationUi | ProducerInformationAppServer | ProducerInformationSystemServer;
export type FactoryTypeEnum = "MessageCreator" | "MircroServiceProducerTopic" | "MircroServiceConsumerTopic";
export type AppArchitectureTiersEnum = "FisUserInterface" | "FisApplicationServer" | "SystemServers";
export type UserInterfaceComponentTypesEnum = "Presentation" | "GlobalStore" | "DomainProxy" | "Component";
export type FisAppServerComponentsEnum = "UserClientProxy" | "NetworkController" | "BackOfficeApplication" | "MircroServiceHandler" | "QueryModule" | "NotificaationManager" | "GlobalStore";
export type SystemServers = "OperatingSystem" | "Webservers" | "Database" | "ApplicationStake" | "QuerySystem" | "Network" | "MicroserviceServer";
export type NotificationType = "UserActivity" | "BusinessEvent" | "AppServerEvent" | "NetworkSystemEvent" | "SystemServerEvent";
export type NotificationNature = "Exception" | "ActionRequired" | "ForInformation";
export type CommandHeader = RequestHeader & CommandMessageHeader;
export type CommandEnum = "New" | "Update" | "Delete" | "SetFieldValue" | "Save" | "Cancel" | "Commit";
export type QueryEnum = "General";
export type SubscriptionEnum = "General";
export type ResponseStatusEnum = "AcknowledgeReceived" | "PendingExecution" | "ExecutionInProgress" | "ExecutiionCompletePercentage" | "ExecutionCompleted";
export type ResponseExceptionEnum = "ValidationFailed" | "InvalidRequest" | "UnAuthorisedRequest";
export type UserInterfaceControlTypes = "Panel" | "Command" | "Field";
export type UserInterfaceControlsCommonFunctions = "Enable" | "Disable" | "Hide" | "Unhide" | "Selected" | "ShowOptions" | "ShowDescriptions";
export type UserInterfaceControlsPanelFunctions = UserInterfaceControlsCommonFunctions & ("OPEN" | "CLOSE" | "SCROLL-UP" | "SCROLL-DOWN" | "SCROLL-RIGHT" | "SCROLL-LEFT" | "MAXIMISE" | "MINIMISE" | "OPEN-CHILD" | "CLOSE-CHILD" | "COMMAND-SELECTED" | "PROPERTY-CHANGED" | "SET-TITLE");
export type UserInterfaceControlCommandFunctionsEnum = UserInterfaceControlsCommonFunctions & ("EXECUTE" | "SHOW-DETAILS" | "SHOW-CHILD-COMMAND" | "ENABLE" | "DISABLE");
export type UserInterfaceControlFieldFunctionsEnum = UserInterfaceControlsCommonFunctions & ("ValueChanged" | "Undo" | "Redo" | "SetValue");
export type RequestStatuse = "RequestReceived" | "RequestInProcess" | "RequestCancelled" | "RequestEnded" | "ProcessingRequestFailed" | "ProcessingRequestSuccessful";
export type FisTmInformation = string;
export type FisCommand = "New" | "Retrieve" | "Modify" | "setColumn";
export type FisTmQueryEnum = unknown;
export interface FisAppMessage {
    FisAppMessage: Message;
}
export interface Message {
    header: unknown;
    data: unknown;
}
export interface RequestMessage {
    header: RequestHeader;
    data: unknown;
}
export interface MessageHeader {
    messageID: string;
    messageName: string;
    dateCreated: string;
    isAggregate: boolean;
    messageProducerInformation: MessageProducerInformation;
    security: MessageSecurity;
    messagedataLocation?: ExternalMessageLocation;
    messageDataFormat?: MessageFormat;
}
export interface ProducerInformationUi {
    origin: MessageProducerInformationBase;
    components: UserInterfaceComponentTypesEnum;
}
export interface MessageProducerInformationBase {
    programID?: string;
    programName?: string;
    messageFactoryType?: FactoryTypeEnum;
    appArchitectureTiers?: AppArchitectureTiersEnum;
    userApplication: UserApplication;
}
export interface UserApplication {
    userAppId: string;
    userAppName: string;
}
export interface ProducerInformationAppServer {
    origin: MessageProducerInformationBase;
    components: FisAppServerComponentsEnum;
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
}
export interface MessageFormat {
    dataFormat: "Json" | "Xml" | "Blob" | "Dtf";
    fileFormat?: "Pdf" | "Text" | "Html" | "PrintFile";
    schemaType?: "FisFieldValue" | "FisMetada" | "GraphQl" | "JsonSchema" | "Soap" | "Wsdl";
    mediaType?: "Audio" | "Video" | "Image" | "Text";
}
export interface RequestMessageHeader {
    responseRequirement: {
        responseDeliveryMode?: MessageDeliveryMode;
        responseDataFormat?: MessageFormat;
        externalResponseLocation?: ExternalMessageLocation;
    };
    resquestTimeOut?: number;
    requestExecutionMode?: number;
}
export interface MessageDeliveryMode {
    timing: "Interactive" | "Batch";
    channelId?: string;
}
export interface ResponseMessage {
    header: ResponseMessageHeader;
    data: unknown;
}
export interface ResponseMessageHeader {
    messageHeader: MessageHeader;
    requestMessageRespondTo: RequestMessage;
}
export interface NotificationMessage {
    header: NotificationMessageHeader;
    data: unknown;
}
export interface NotificationMessageHeader {
    messageHeader: MessageHeader;
    notificationType: NotificationType;
    notificationNature: NotificationNature;
}
export interface CommandMessage {
    header: CommandHeader;
    data: unknown;
}
export interface CommandMessageHeader {
    command: CommandEnum;
}
export interface QueryMessage {
    header: QueryMessageHeader;
    data: unknown;
}
export interface QueryMessageHeader {
    messageHeader: RequestHeader;
    query: QueryEnum;
}
export interface SubscriptionMessage {
    header: SubscriptionMessageHeader;
    data: unknown;
}
export interface SubscriptionMessageHeader {
    messageHeader: RequestHeader;
    subscription: SubscriptionEnum;
    startSubscribingDateTime?: string;
    endSubscribingDateTime?: string;
}
export interface ResponseDataMessage {
    header: ResponseMessageHeader;
    data: unknown;
}
export interface ResponseStatusMessage {
    header: ResponseStatusMessageHeader;
    data: unknown;
}
export interface ResponseStatusMessageHeader {
    messageHeader: ResponseMessageHeader;
    NewProperty: ResponseStatusEnum;
}
export interface ResponseExceptionMessage {
    header: ResponseExceptionMessageHeader;
    data: unknown;
}
export interface ResponseExceptionMessageHeader {
    messageHeader: ResponseMessageHeader;
    responseException: ResponseExceptionEnum;
}
export interface ResponseSubscriptionMessage {
    header: ResponseMessageHeader;
    data: Message;
}
export interface MicroserviceNotificationMessage {
    header: MicroserviceNotifcationMessageHeader;
    data: Message;
}
export interface MicroserviceNotifcationMessageHeader {
    messageHeader: NotificationMessageHeader;
    micrroServicetopic: {
        topicId: string;
        topicCode: string;
        topicName: string;
    };
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
    UIEventMessage?: NotificationMessageHeader & {
        UIEventType: "MouseAction" | "ValueChanged" | "???";
        SourceComponent?: string;
        SourceComponentControlType?: string;
    };
}
export interface UIVisualControlAttributes {
    [k: string]: unknown;
}
export interface FisTmCommandMessage {
    header: FisTmCommandMessageHeader;
    data: unknown;
}
export interface FisTmCommandMessageHeader {
    messageHeader: FisTmRequestMessageHeader;
    command: FisCommand;
}
export interface FisTmRequestMessageHeader {
    messageHeader: RequestHeader;
    fisTmInformation: FisTmInformation;
}
export interface FisTmQueryMessage {
    header: FisTmQueryMessageHeader;
    data: unknown;
}
export interface FisTmQueryMessageHeader {
    messageHeader: FisTmRequestMessageHeader;
    query: FisTmQueryEnum;
}
export interface FisTmResponseMessage {
    header: FisTmResponseMessageHeader;
    data: unknown;
}
export interface FisTmResponseMessageHeader {
    messageHeader: ResponseMessageHeader;
    NewProperty: FisTmInformation;
}
