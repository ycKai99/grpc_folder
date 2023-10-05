"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FisQuery = exports.FisCommand = exports.FisMessageType = exports.Subscription = exports.Query = exports.Command = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["Base"] = "Base";
    MessageType["Command"] = "Command";
    MessageType["MicroserviceNotification"] = "MicroserviceNotification";
    MessageType["Notification"] = "Notification";
    MessageType["Query"] = "Query";
    MessageType["Request"] = "Request";
    MessageType["Response"] = "Response";
    MessageType["ResponseData"] = "ResponseData";
    MessageType["ResponseException"] = "ResponseException";
    MessageType["ResponseStatus"] = "ResponseStatus";
    MessageType["ResponseSubscription"] = "ResponseSubscription";
    MessageType["Subscription"] = "Subscription";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var Command;
(function (Command) {
    Command["New"] = "New";
    Command["Update"] = "Update";
    Command["Delete"] = "Delete";
    Command["SetFieldValue"] = "SetFieldValue";
    Command["Save"] = "Save";
    Command["Cancel"] = "Cancel";
    Command["Commit"] = "Commit";
})(Command = exports.Command || (exports.Command = {}));
var Query;
(function (Query) {
    Query["General"] = "General";
})(Query = exports.Query || (exports.Query = {}));
var Subscription;
(function (Subscription) {
    Subscription["General"] = "General";
})(Subscription = exports.Subscription || (exports.Subscription = {}));
var FisMessageType;
(function (FisMessageType) {
    FisMessageType["FisBase"] = "FisBase";
    FisMessageType["FisCommand"] = "FisCommand";
    FisMessageType["FisQuery"] = "FisQuery";
    FisMessageType["FisRequest"] = "FisRequest";
    FisMessageType["FisResponse"] = "FisResponse";
})(FisMessageType = exports.FisMessageType || (exports.FisMessageType = {}));
var FisCommand;
(function (FisCommand) {
    FisCommand["Retrieve"] = "Retrieve";
    FisCommand["Modify"] = "Modify";
    FisCommand["SetColumn"] = "SetColumn";
})(FisCommand = exports.FisCommand || (exports.FisCommand = {}));
var FisQuery;
(function (FisQuery) {
    FisQuery["Retrieve"] = "Retrieve";
})(FisQuery = exports.FisQuery || (exports.FisQuery = {}));
//# sourceMappingURL=testenumschema.js.map