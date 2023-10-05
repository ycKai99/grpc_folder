export type FactoryTypeEnum = "MessageCreator" | "MircroServiceProducerTopic" | "MircroServiceConsumerTopic";
export type AppArchitectureTiersEnum = "FisUserInterface" | "FisApplicationServer" | "SystemServers";
export type UserInterfaceComponentTypesEnum = "Presentation" | "GlobalStore" | "DomainProxy" | "Component";
export type FisAppServerComponentsEnum = "UserClientProxy" | "NetworkController" | "BackOfficeApplication" | "MircroServiceHandler" | "QueryModule" | "NotificaationManager" | "GlobalStore";
export type SystemServers = "OperatingSystem" | "Webservers" | "Database" | "ApplicationStake" | "QuerySystem" | "Network" | "MicroserviceServer";
export type NotificationType = "UserActivity" | "BusinessEvent" | "AppServerEvent" | "NetworkSystemEvent" | "SystemServerEvent";
export type NotificationNature = "Exception" | "ActionRequired" | "ForInformation";
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
    message?: {
        requestMessage?: RequestMessage;
    } | {
        responseMessage?: ResponseMessage;
    } | {
        notificationMessage?: NotificationMessage;
    };
}
export interface RequestMessage {
    requestMessageHeader?: RequestMessageHeader;
    requestMessageData?: unknown;
}
export interface RequestMessageHeader {
    messageHeader: MessageHeader;
    responseRequirement?: {
        responseDeliveryMode?: MessageDeliveryMode;
        responseDataFormat?: MessageFormat;
        externalResponseLocation?: ExternalMessageLocation;
    };
    resquestTimeOut?: number;
    requestExecutionMode?: number;
}
export interface MessageHeader {
    messageID: string;
    messageName: string;
    dateCreated: string;
    isAggregate: boolean;
    messageProducerInformation: MessageProducerInformation;
    security: {
        socialNetworkLoginID?: string;
        ucpId?: string;
        socialNetworkUserName?: string;
        applicationLogInID?: string;
        applicationUserName?: string;
    };
    messagedataLocation?: ExternalMessageLocation;
    messageDataFormat?: MessageFormat;
}
export interface MessageProducerInformation {
    messageProducerInformation?: {
        uiMessage?: {
            messageOriginBase: MessageProducerInformationBase;
            UIArchitectureComponents: UserInterfaceComponentTypesEnum;
        };
    } | {
        fisAppServerMessage?: {
            messageOriginBase?: MessageProducerInformationBase;
            AppServerComponents?: FisAppServerComponentsEnum;
        };
    } | {
        systemServersMessage?: {
            messageOriginBase: MessageProducerInformationBase;
            systemServers: SystemServers;
        };
    };
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
export interface MessageDeliveryMode {
    timing: "Interactive" | "Batch";
    channelId?: string;
}
export interface ResponseMessage {
    responseMessageHeader?: ResponseMessageHeader;
    responseMessageData?: unknown;
}
export interface ResponseMessageHeader {
    messageHeader: MessageHeader;
    requestMessageRespondTo: RequestMessage;
}
export interface NotificationMessage {
    notificationMessageHeader: NotificationMessageHeader;
    notificationMessageData: unknown;
}
export interface NotificationMessageHeader {
    messageHeader: MessageHeader;
    notificationType: NotificationType;
    notificationNature: NotificationNature;
}
export interface CommandMessage {
    commandMessageHeader: CommandMessageHeader;
    commandMessageData: unknown;
}
export interface CommandMessageHeader {
    requestMessageHeader: RequestMessageHeader;
    command: CommandEnum;
}
export interface QueryMessage {
    queryMessageHeader: QueryMessageHeader;
    queryMessageData: unknown;
}
export interface QueryMessageHeader {
    requestMessageHeader: RequestMessageHeader;
    query: QueryEnum;
}
export interface SubscriptionMessage {
    subscriptionMessageHeader: SubscriptionMessageHeader;
    subscriptionMessageData: unknown;
}
export interface SubscriptionMessageHeader {
    requestMessageHeader: RequestMessageHeader;
    subscription: SubscriptionEnum;
    startSubscribingDateTime?: string;
    endSubscribingDateTime?: string;
}
export interface ResponseDataMessage {
    reponseMessage: ResponseMessage;
    responseDataMessageData: {
        [k: string]: unknown;
    };
}
export interface ResponseStatusMessage {
    responseStatusMessageHeader: ResponseStatusMessageHeader;
    ResponseStatusMessageData: {
        [k: string]: unknown;
    };
}
export interface ResponseStatusMessageHeader {
    responseMessageHeader: ResponseMessageHeader;
    NewProperty: ResponseStatusEnum;
}
export interface ResponseExceptionMessage {
    responseExceptionMessageHeader: ResponseExceptionMessageHeader;
    responseExceptionMessageData: unknown;
}
export interface ResponseExceptionMessageHeader {
    responseMessageHeader: ResponseMessageHeader;
    responseException: ResponseExceptionEnum;
}
export interface ResponseSubscriptionMessage {
    ResponseSubscriptionMessage: {
        ReponseMessage: ResponseMessage;
    } & {
        SubscribedMessageData: Message;
    };
    responseSubscriptionMessageData?: ResponseSubscriptionMessageData;
}
export interface ResponseSubscriptionMessageData {
    subscribedMessage: Message;
}
export interface MicroserviceNotificationMessage {
    microserviceNotifcationMessageHeader: MicroserviceNotifcationMessageHeader;
    microserviceNotifcationMessageData?: Message;
}
export interface MicroserviceNotifcationMessageHeader {
    notificationMessageHeader?: NotificationMessageHeader;
    micrroServicetopic: {
        topicId: string;
        topicCode: string;
        topicName: string;
    };
}
export interface ResponseSubscriptionMessageHeader {
    responseMessageHeader: ResponseMessageHeader;
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
    fisTmCommandMessageHeader: FisTmCommandMessageHeader;
    fisTmCommandData: unknown;
}
export interface FisTmCommandMessageHeader {
    fisRequestMessageHeader: FisTmRequestMessageHeader;
    command: FisCommand;
}
export interface FisTmRequestMessageHeader {
    requestMessageHeader: RequestMessageHeader;
    fisTmInformation: FisTmInformation;
}
export interface FisTmQueryMessage {
    fisTmQueryMessageHeader: FisTmQueryMessageHeader;
    fisTmQueryMessageData: unknown;
}
export interface FisTmQueryMessageHeader {
    fisTmRequestMessageHeader: FisTmRequestMessageHeader;
    query: FisTmQueryEnum;
}
export interface FisTmResponseMessage {
    fisTmResponseMessageHeader: FisTmResponseMessageHeader;
    fisTmResponseMessageData: unknown;
}
export interface FisTmResponseMessageHeader {
    responseMessageHeader: ResponseMessageHeader;
    NewProperty: FisTmInformation;
}
