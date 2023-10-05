export type Message = RequestMessage | ResponseMessage | NotificationMessage;
export type FactoryTypeEnum = "MessageCreator" | "MircroServiceProducerTopic" | "MircroServiceConsumerTopic";
export type AppArchitectureTiersEnum = "FisUserInterface" | "FisApplicationServer" | "SystemServers";
export type UserInterfaceComponentTypesEnum = "Presentation" | "GlobalStore" | "DomainProxy" | "Component";
export type FisAppServerComponentsEnum = "UserClientProxy" | "NetworkController" | "BackOfficeApplication" | "MircroServiceHandler" | "QueryModule" | "NotificaationManager" | "GlobalStore";
export type SystemServers = "OperatingSystem" | "Webservers" | "Database" | "ApplicationStake" | "QuerySystem" | "Network" | "MicroserviceServer";
export type NotificationType = "UserActivity" | "BusinessEvent" | "AppServerEvent" | "NetworkSystemEvent" | "SystemServerEvent";
export type NotificationNature = "Exception" | "ActionRequired" | "ForInformation";
export interface FisAppMessage {
    FisAppMessage: Message;
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
