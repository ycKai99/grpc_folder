"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
//import { Message, MessageHeader, Header, AppMessageType, TypeOfMessage } from '../fis/fismessagetype';
const appmessagetype_1 = require("../types/appmessagetype");
const appmessageschema_1 = require("../message/common/appmessageschema");
const schema = require("../schema/FisAppMessageSchema.json");
const appmessageutil_1 = require("../message/common/appmessageutil");
/**
 * Test App message schema.
 *
 */
// console.log(AppMessageSchema.schema);
console.log(appmessageschema_1.AppMessageSchema.schema.definitions.MessageHeader.required);
// let schema = require("../../" + Config.schemaDefinitionPath());
console.log(schema.definitions.MessageHeader.properties.messageDataLocation.$ref);
console.log(schema.definitions.MessageHeader.required);
console.log(schema.definitions.Message);
console.log("Request Message Header commaon: " + schema.definitions.RequestHeader.allOf[0].$ref.split('/').pop());
console.log("Request Message Header commaon properties:\n" + JSON.stringify(schema.definitions[schema.definitions.RequestHeader.allOf[0].$ref.split('/').pop()], null, 2));
console.log("Request Message Header: " + schema.definitions.RequestHeader.allOf[1].$ref.split('/').pop());
console.log("Request Message Header properties:\n" + JSON.stringify(schema.definitions[schema.definitions.RequestHeader.allOf[1].$ref.split('/').pop()], null, 2));
// schema.definitions.RequestMessageHeader.
// Check if object of type?
// Using Object keys
// There are probably a lot of ways, for example using the Array.prototype.filter():
// let a1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
// let a2 = ['a', 'b', 'c', 'd'];
let a1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
let a2 = ['a', 'b', 'd', 'c'];
let missing = a1.filter(item => a2.indexOf(item) < 0);
console.log(missing); // ["e", "f", "g"]
// Is type2 of type1?
let type1 = ['a', 'b', 'd', 'c'];
let type2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(type1.filter(item => type2.indexOf(item) < 0)); // []
// Check Message type
let m = { header: {} };
console.log("Message:\n" + JSON.stringify(schema.definitions.Message, null, 2));
console.log("m:\n" + JSON.stringify(m, null, 2));
console.log("Is m a message? " + (schema.definitions.Message.required.filter(item => Object.keys(m).indexOf(item) < 0).length === 0));
console.log("AppMessageUtil - Is m a message? " + appmessageutil_1.AppMessageUtil.isMessage(m));
let m1 = { header: {}, data: null, custom: null };
console.log("m1:\n" + JSON.stringify(m1, null, 2));
console.log("Is m1 a message? " + (schema.definitions.Message.required.filter(item => Object.keys(m1).indexOf(item) < 0).length === 0));
console.log("AppMessageUtil - Is m1 a message? " + appmessageutil_1.AppMessageUtil.isMessage(m1));
console.log("AppMessageUtil - Is m1 header a message header? " + appmessageutil_1.AppMessageUtil.isMessageHeader(m1.header));
let h = {
    messageType: appmessagetype_1.AppMessageType.Command,
    messageID: "123",
    messageName: "",
    dateCreated: "",
    isAggregate: false,
    messageProducerInformation: null,
    security: {},
    others: {},
    // resquestTimeOut: 0,               // RequestMessage
    // requestExecutionMode: 0,         // RequestMessage
    // command: null,                    // CommandMessage
    // query: null,                     // QueryMessage
    subscription: null,
    requestMessageRespondTo: null,
    // responseStatus: "",                // ResponseStatusMessage
    responseException: "",
    // ResponseSubscriptionMessage
    // notificationType: "",            // NotificationMessage
    // notificationNature:"",              // NotificationMessage
    // microserviceTopic: null             // MicroserviceNotificationMessage
    fisMessageHeader: null,
    end: ""
};
let m2 = { header: h, data: {} };
console.log("m2:\n" + JSON.stringify(m2, null, 2));
console.log("AppMessageUtil - Is m2 a message? " + appmessageutil_1.AppMessageUtil.isMessage(m2));
console.log("AppMessageUtil - Is m2 header a message header? " + appmessageutil_1.AppMessageUtil.isMessageHeader(m2.header));
let testType = appmessagetype_1.TypeOfMessage.SubscriptionMessage;
console.log("AppMessageUtil - Is m2 a %s?, %s ", testType, appmessageutil_1.AppMessageUtil.isOfType(m2, testType));
// Test filter
let messages = [m2];
let type = appmessagetype_1.TypeOfMessage.RequestMessage;
// let type: FilterType = [TypeOfMessage.RequestMessage, TypeOfMessage.ResponseMessage];
console.log("AppMessageUtil - Message filter by type %s\nResult: %s", JSON.stringify(type, null, 2), JSON.stringify(appmessageutil_1.AppMessageUtil.filterByType(messages, type), null, 2));
// let id:string = "123";
let id = ["123", "456"];
console.log("AppMessageUtil - Message filter by message Id %s\nResult: %s", JSON.stringify(id, null, 2), JSON.stringify(appmessageutil_1.AppMessageUtil.filterByMessageId(messages, id), null, 2));
//  let messageType: FilterMessgeType = AppMessageType.Response;
let messageType = [appmessagetype_1.AppMessageType.Response, appmessagetype_1.AppMessageType.Command];
console.log("AppMessageUtil - Message filter by message type %s\nResult: %s", JSON.stringify(messageType, null, 2), JSON.stringify(appmessageutil_1.AppMessageUtil.filterByMessageType(messages, messageType), null, 2));
// let options: FilterOption;
// let options: FilterOption = {};
// let options: FilterOption = { type: TypeOfMessage.ResponseMessage };
// let options: FilterOption = { type: [TypeOfMessage.RequestMessage, TypeOfMessage.ResponseMessage] };
// let options: FilterOption = { id: "123" }; //{ id: ["123", "456"] };
// let options: FilterOption = { type: TypeOfMessage.RequestMessage, id: "123" }; //{ id: ["123", "456"] };
// let options: FilterOption = { messageTypes:  AppMessageType.Command }; //{ id: ["123", "456"] };
let options = { id: "123", messageTypes: appmessagetype_1.AppMessageType.Command }; //{ id: ["123", "456"] };
// let options: FilterOption = { type: TypeOfMessage.RequestMessage, TypeOfMessage.ResponseMessage] };
console.log("AppMessageUtil - Message filter %s\nResult: %s", JSON.stringify(options, null, 2), JSON.stringify(appmessageutil_1.AppMessageUtil.filter(messages, options), null, 2));
// // You have two options, using the Object.keys() and then forEach, or use for/in:
// class stationGuide {
//     station1: any;
//     station2: any;
//     station3: any;
//     constructor() {
//         this.station1 = null;
//         this.station2 = null;
//         this.station3 = null;
//     }
// }
// let a = new stationGuide();
// Object.keys(a).forEach(key => console.log(key));
// for (let key in a) {
//     console.log(key);
// }
//# sourceMappingURL=appmessageschematest.js.map