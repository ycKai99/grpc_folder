"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIEventType = exports.RequestStatus = exports.UserInterfaceControlFieldFunctions = exports.UserInterfaceControlCommandFunctions = exports.UserInterfaceControlPanelFunctions = exports.UserInterfaceControlCommonFunctions = exports.UserInterfaceControlTypes = exports.TypeOfMessage = exports.ExceptionType = exports.ResponseStatus = exports.Subscription = exports.Query = exports.Command = exports.NotificationNature = exports.NotificationType = exports.Timing = exports.MediaType = exports.SchemaType = exports.FileFormat = exports.DataFormat = exports.SystemServers = exports.FisAppServerComponents = exports.UserInterfaceComponentTypes = exports.AppArchitectureTiers = exports.FactoryType = exports.AppMessageType = void 0;
var AppMessageType;
(function (AppMessageType) {
    AppMessageType["Base"] = "Base";
    AppMessageType["Request"] = "Request";
    AppMessageType["Command"] = "Command";
    AppMessageType["Query"] = "Query";
    AppMessageType["Subscription"] = "Subscription";
    AppMessageType["Response"] = "Response";
    AppMessageType["ResponseData"] = "ResponseData";
    AppMessageType["ResponseStatus"] = "ResponseStatus";
    AppMessageType["ResponseSummary"] = "ResponseSummary";
    AppMessageType["ResponseException"] = "ResponseException";
    AppMessageType["Notification"] = "Notification";
    AppMessageType["MicroserviceNotification"] = "MicroserviceNotification";
    AppMessageType["NotificationException"] = "NotificationException";
})(AppMessageType = exports.AppMessageType || (exports.AppMessageType = {}));
var FactoryType;
(function (FactoryType) {
    FactoryType["MessageCreator"] = "MessageCreator";
    FactoryType["MircroServiceProducerTopic"] = "MircroServiceProducerTopic";
    FactoryType["MircroServiceConsumerTopic"] = "MircroServiceConsumerTopic";
})(FactoryType = exports.FactoryType || (exports.FactoryType = {}));
var AppArchitectureTiers;
(function (AppArchitectureTiers) {
    AppArchitectureTiers["FisUserInterface"] = "FisUserInterface";
    AppArchitectureTiers["FisApplicationServer"] = "FisApplicationServer";
    AppArchitectureTiers["SystemServers"] = "SystemServers";
})(AppArchitectureTiers = exports.AppArchitectureTiers || (exports.AppArchitectureTiers = {}));
var UserInterfaceComponentTypes;
(function (UserInterfaceComponentTypes) {
    UserInterfaceComponentTypes["Presentation"] = "Presentation";
    UserInterfaceComponentTypes["GlobalStore"] = "GlobalStore";
    UserInterfaceComponentTypes["DomainProxy"] = "DomainProxy";
    UserInterfaceComponentTypes["Component"] = "Component";
})(UserInterfaceComponentTypes = exports.UserInterfaceComponentTypes || (exports.UserInterfaceComponentTypes = {}));
var FisAppServerComponents;
(function (FisAppServerComponents) {
    FisAppServerComponents["UserClientProxy"] = "UserClientProxy";
    FisAppServerComponents["NetworkController"] = "NetworkController";
    FisAppServerComponents["BackOfficeApplication"] = "BackOfficeApplication";
    FisAppServerComponents["MircroServiceHandler"] = "MircroServiceHandler";
    FisAppServerComponents["QueryModule"] = "QueryModule";
    FisAppServerComponents["NotificationManager"] = "NotificationManager";
    FisAppServerComponents["GlobalStore"] = "GlobalStore";
})(FisAppServerComponents = exports.FisAppServerComponents || (exports.FisAppServerComponents = {}));
var SystemServers;
(function (SystemServers) {
    SystemServers["OperatingSystem"] = "OperatingSystem";
    SystemServers["Webservers"] = "Webservers";
    SystemServers["Database"] = "Database";
    SystemServers["ApplicationStake"] = "ApplicationStake";
    SystemServers["QuerySystem"] = "QuerySystem";
    SystemServers["Network"] = "Network";
    SystemServers["MicroserviceServer"] = "MicroserviceServer";
})(SystemServers = exports.SystemServers || (exports.SystemServers = {}));
var DataFormat;
(function (DataFormat) {
    DataFormat["Json"] = "Json";
    DataFormat["Xml"] = "Xml";
    DataFormat["Blob"] = "Blob";
    DataFormat["Dtf"] = "Dtf";
})(DataFormat = exports.DataFormat || (exports.DataFormat = {}));
var FileFormat;
(function (FileFormat) {
    FileFormat["Pdf"] = "Pdf";
    FileFormat["Text"] = "Text";
    FileFormat["Html"] = "Html";
    FileFormat["PrintFile"] = "PrintFile";
})(FileFormat = exports.FileFormat || (exports.FileFormat = {}));
var SchemaType;
(function (SchemaType) {
    SchemaType["FisFieldValue"] = "FisFieldValue";
    SchemaType["FisMetadata"] = "FisMetadata";
    SchemaType["GraphQL"] = "GraphQL";
    SchemaType["JsonSchema"] = "JsonSchema";
    SchemaType["Soap"] = "Soap";
    SchemaType["Wsdl"] = "Wsdl";
})(SchemaType = exports.SchemaType || (exports.SchemaType = {}));
var MediaType;
(function (MediaType) {
    MediaType["Audio"] = "Audio";
    MediaType["Video"] = "Video";
    MediaType["Image"] = "Image";
    MediaType["Text"] = "Text";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var Timing;
(function (Timing) {
    Timing["Interactive"] = "Interactive";
    Timing["Batch"] = "Batch";
})(Timing = exports.Timing || (exports.Timing = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["UserActivity"] = "UserActivity";
    NotificationType["BusinessEvent"] = "BusinessEvent";
    NotificationType["AppServerEvent"] = "AppServerEvent";
    NotificationType["NetworkSystemEvent"] = "NetworkSystemEvent";
    NotificationType["SystemServerEvent"] = "SystemServerEvent";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var NotificationNature;
(function (NotificationNature) {
    NotificationNature["Exception"] = "Exception";
    NotificationNature["ActionRequired"] = "ActionRequired";
    NotificationNature["ForInformation"] = "ForInformation";
})(NotificationNature = exports.NotificationNature || (exports.NotificationNature = {}));
var Command;
(function (Command) {
    Command["Start"] = "Start";
    Command["Login"] = "Login";
    Command["Stop"] = "Stop";
    Command["Logout"] = "Logout";
    Command["New"] = "New";
    Command["Update"] = "Update";
    Command["Delete"] = "Delete";
    Command["SetFieldValue"] = "SetFieldValue";
    Command["Save"] = "Save";
    Command["Cancel"] = "Cancel";
    Command["Commit"] = "Commit";
    Command["Retrieve"] = "Retrieve";
    Command["Modify"] = "Modify";
    Command["SetColumn"] = "SetColumn";
    Command["ItemChanged"] = "ItemChanged";
    Command["SetItem"] = "SetItem";
    Command["CancelChanges"] = "CancelChanges";
    Command["Distribute"] = "Distribute";
    Command["Post"] = "Post";
    Command["AppendRow"] = "AppendRow";
    Command["InsertRow"] = "InsertRow";
    Command["DeleteRow"] = "DeleteRow";
    Command["Execute"] = "Execute";
})(Command = exports.Command || (exports.Command = {}));
var Query;
(function (Query) {
    Query["General"] = "General";
    Query["GetMetadata"] = "GetMetadata";
    Query["Count"] = "Count";
    Query["Retrieve"] = "Retrieve";
    Query["GetData"] = "GetData";
    Query["GetColumn"] = "GetColumn";
    Query["GetAliases"] = "GetAliases";
    Query["GetColumnNames"] = "GetColumnNames";
    Query["GetEditStatus"] = "GetEditStatus";
    Query["RowCount"] = "RowCount";
})(Query = exports.Query || (exports.Query = {}));
var Subscription;
(function (Subscription) {
    Subscription["General"] = "General";
})(Subscription = exports.Subscription || (exports.Subscription = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["AcknowledgeReceived"] = "AcknowledgeReceived";
    ResponseStatus["PendingExecution"] = "PendingExecution";
    ResponseStatus["ExecutionInProgress"] = "ExecutionInProgress";
    ResponseStatus["ExecutiionCompletePercentage"] = "ExecutiionCompletePercentage";
    ResponseStatus["ExecutionCompleted"] = "ExecutionCompleted";
    ResponseStatus["ExecutionException"] = "ExecutionException";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
var ExceptionType;
(function (ExceptionType) {
    ExceptionType["ValidationFailed"] = "ValidationFailed";
    ExceptionType["InvalidRequest"] = "InvalidRequest";
    ExceptionType["UnauthorisedRequest"] = "UnauthorisedRequest";
    ExceptionType["InvalidNotification"] = "InvalidNotification";
    ExceptionType["UnauthorisedNotification"] = "UnauthorisedNotification";
    ExceptionType["ServerUnavailable"] = "ServerUnavailable";
})(ExceptionType = exports.ExceptionType || (exports.ExceptionType = {}));
var TypeOfMessage;
(function (TypeOfMessage) {
    TypeOfMessage["Message"] = "Message";
    TypeOfMessage["RequestMessage"] = "RequestMessage";
    TypeOfMessage["CommandMessage"] = "CommandMessage";
    TypeOfMessage["QueryMessage"] = "QueryMessage";
    TypeOfMessage["SubscriptionMessage"] = "SubscriptionMessage";
    TypeOfMessage["ResponseMessage"] = "ResponseMessage";
    TypeOfMessage["ResponseDataMessage"] = "ResponseDataMessage";
    TypeOfMessage["ResponseStatusMessage"] = "ResponseStatusMessage";
    TypeOfMessage["ResponseSummaryMessage"] = "ResponseSummaryMessage";
    TypeOfMessage["ResponseExceptionMessage"] = "ResponseExceptionMessage";
    TypeOfMessage["NotificationMessage"] = "NotificationMessage";
    TypeOfMessage["MicroserviceNotificationMessage"] = "MicroserviceNotificationMessage";
    TypeOfMessage["NotificationExceptionMessage"] = "NotificationExceptionMessage";
})(TypeOfMessage = exports.TypeOfMessage || (exports.TypeOfMessage = {}));
var UserInterfaceControlTypes;
(function (UserInterfaceControlTypes) {
    UserInterfaceControlTypes["Panel"] = "Panel";
    UserInterfaceControlTypes["Command"] = "Command";
    UserInterfaceControlTypes["Field"] = "Field";
})(UserInterfaceControlTypes = exports.UserInterfaceControlTypes || (exports.UserInterfaceControlTypes = {}));
var UserInterfaceControlCommonFunctions;
(function (UserInterfaceControlCommonFunctions) {
    UserInterfaceControlCommonFunctions["Enable"] = "Enable";
    UserInterfaceControlCommonFunctions["Disable"] = "Disable";
    UserInterfaceControlCommonFunctions["Hide"] = "Hide";
    UserInterfaceControlCommonFunctions["Unhide"] = "Unhide";
    UserInterfaceControlCommonFunctions["Selected"] = "Selected";
    UserInterfaceControlCommonFunctions["ShowOptions"] = "ShowOptions";
    UserInterfaceControlCommonFunctions["ShowDescriptions"] = "ShowDescriptions";
})(UserInterfaceControlCommonFunctions = exports.UserInterfaceControlCommonFunctions || (exports.UserInterfaceControlCommonFunctions = {}));
var UserInterfaceControlPanelFunctions;
(function (UserInterfaceControlPanelFunctions) {
    UserInterfaceControlPanelFunctions["Open"] = "OPEN";
    UserInterfaceControlPanelFunctions["Close"] = "CLOSE";
    UserInterfaceControlPanelFunctions["ScrollUp"] = "SCROLL-UP";
    UserInterfaceControlPanelFunctions["ScrollDown"] = "SCROLL-DOWN";
    UserInterfaceControlPanelFunctions["ScrollRight"] = "SCROLL-RIGHT";
    UserInterfaceControlPanelFunctions["ScrollLeft"] = "SCROLL-LEFT";
    UserInterfaceControlPanelFunctions["Maximise"] = "MAXIMISE";
    UserInterfaceControlPanelFunctions["Minimise"] = "MINIMISE";
    UserInterfaceControlPanelFunctions["OpenChild"] = "OPEN-CHILD";
    UserInterfaceControlPanelFunctions["CloseChild"] = "CLOSE-CHILD";
    UserInterfaceControlPanelFunctions["CommandSelected"] = "COMMAND-SELECTED";
    UserInterfaceControlPanelFunctions["PropertyChanges"] = "PROPERTY-CHANGED";
    UserInterfaceControlPanelFunctions["SetTitle"] = "SET-TITLE";
})(UserInterfaceControlPanelFunctions = exports.UserInterfaceControlPanelFunctions || (exports.UserInterfaceControlPanelFunctions = {}));
var UserInterfaceControlCommandFunctions;
(function (UserInterfaceControlCommandFunctions) {
    UserInterfaceControlCommandFunctions["Execute"] = "EXECUTE";
    UserInterfaceControlCommandFunctions["ShowDetails"] = "SHOW-DETAILS";
    UserInterfaceControlCommandFunctions["ShowChildCommand"] = "SHOW-CHILD-COMMAND";
    UserInterfaceControlCommandFunctions["Enable"] = "ENABLE";
    UserInterfaceControlCommandFunctions["Disable"] = "DISABLE";
})(UserInterfaceControlCommandFunctions = exports.UserInterfaceControlCommandFunctions || (exports.UserInterfaceControlCommandFunctions = {}));
var UserInterfaceControlFieldFunctions;
(function (UserInterfaceControlFieldFunctions) {
    UserInterfaceControlFieldFunctions["ValueChanged"] = "ValueChanged";
    UserInterfaceControlFieldFunctions["Undo"] = "Undo";
    UserInterfaceControlFieldFunctions["Redo"] = "Redo";
    UserInterfaceControlFieldFunctions["SetValue"] = "SetValue";
})(UserInterfaceControlFieldFunctions = exports.UserInterfaceControlFieldFunctions || (exports.UserInterfaceControlFieldFunctions = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["RequestReceived"] = "RequestReceived";
    RequestStatus["RequestInProcess"] = "RequestInProcess";
    RequestStatus["RequestCancelled"] = "RequestCancelled";
    RequestStatus["RequestEnded"] = "RequestEnded";
    RequestStatus["ProcessingRequestFailed"] = "ProcessingRequestFailed";
    RequestStatus["ProcessingRequestSuccessful"] = "ProcessingRequestSuccessful";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
var UIEventType;
(function (UIEventType) {
    UIEventType["MouseAction"] = "MouseAction";
    UIEventType["ValueChanged"] = "ValueChanged";
})(UIEventType = exports.UIEventType || (exports.UIEventType = {}));
//# sourceMappingURL=fisappmessageschema.js.map