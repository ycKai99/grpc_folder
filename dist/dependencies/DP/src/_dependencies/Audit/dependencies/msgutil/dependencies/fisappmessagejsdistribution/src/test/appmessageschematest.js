"use strict";
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagetype_1 = require("../types/appmessagetype");
const appmessageschema_1 = require("../message/common/appmessageschema");
const schema = require("../schema/FisAppMessageSchema.json");
const appmessageutil_1 = require("../message/common/appmessageutil");
console.log(appmessageschema_1.AppMessageSchema.schema.definitions.MessageHeader.required);
console.log(schema.definitions.MessageHeader.properties.messageDataLocation.$ref);
console.log(schema.definitions.MessageHeader.required);
console.log(schema.definitions.Message);
console.log("Request Message Header commaon: " + schema.definitions.RequestHeader.allOf[0].$ref.split('/').pop());
console.log("Request Message Header commaon properties:\n" + JSON.stringify(schema.definitions[schema.definitions.RequestHeader.allOf[0].$ref.split('/').pop()], null, 2));
console.log("Request Message Header: " + schema.definitions.RequestHeader.allOf[1].$ref.split('/').pop());
console.log("Request Message Header properties:\n" + JSON.stringify(schema.definitions[schema.definitions.RequestHeader.allOf[1].$ref.split('/').pop()], null, 2));
let a1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
let a2 = ['a', 'b', 'd', 'c'];
let missing = a1.filter(item => a2.indexOf(item) < 0);
console.log(missing);
let type1 = ['a', 'b', 'd', 'c'];
let type2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(type1.filter(item => type2.indexOf(item) < 0));
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
    subscription: null,
    requestMessageRespondTo: null,
    responseException: "",
    fisMessageHeader: null,
    end: ""
};
let m2 = { header: h, data: {} };
console.log("m2:\n" + JSON.stringify(m2, null, 2));
console.log("AppMessageUtil - Is m2 a message? " + appmessageutil_1.AppMessageUtil.isMessage(m2));
console.log("AppMessageUtil - Is m2 header a message header? " + appmessageutil_1.AppMessageUtil.isMessageHeader(m2.header));
let testType = appmessagetype_1.TypeOfMessage.SubscriptionMessage;
console.log("AppMessageUtil - Is m2 a %s?, %s ", testType, appmessageutil_1.AppMessageUtil.isOfType(m2, testType));
let messages = [m2];
let type = appmessagetype_1.TypeOfMessage.RequestMessage;
console.log("AppMessageUtil - Message filter by type %s\nResult: %s", JSON.stringify(type, null, 2), JSON.stringify(appmessageutil_1.AppMessageUtil.filterByType(messages, type), null, 2));
let id = ["123", "456"];
console.log("AppMessageUtil - Message filter by message Id %s\nResult: %s", JSON.stringify(id, null, 2), JSON.stringify(appmessageutil_1.AppMessageUtil.filterByMessageId(messages, id), null, 2));
let messageType = [appmessagetype_1.AppMessageType.Response, appmessagetype_1.AppMessageType.Command];
console.log("AppMessageUtil - Message filter by message type %s\nResult: %s", JSON.stringify(messageType, null, 2), JSON.stringify(appmessageutil_1.AppMessageUtil.filterByMessageType(messages, messageType), null, 2));
let options = { id: "123", messageTypes: appmessagetype_1.AppMessageType.Command };
console.log("AppMessageUtil - Message filter %s\nResult: %s", JSON.stringify(options, null, 2), JSON.stringify(appmessageutil_1.AppMessageUtil.filter(messages, options), null, 2));
//# sourceMappingURL=appmessageschematest.js.map