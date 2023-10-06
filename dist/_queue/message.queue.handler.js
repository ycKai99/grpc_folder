"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProviderMessageQueueHandler_ext = exports.responseMessageQueueHandler = exports.requestMessageQueueHandler = exports.serviceProviderMessageQueueHandler = exports.userSessionsMessageQueueHandler = exports.notificationMessageQueueHandler = exports.MessageInQueueInterface = exports.MessageQueueHandlerClass = exports.MessageQueueState = void 0;
const common_1 = require("@nestjs/common");
const observer_module_1 = require("../observer.module");
const export_1 = require("../_dependencies/DP/src/interface/export");
var MessageQueueState;
(function (MessageQueueState) {
    MessageQueueState["Start"] = "Start";
    MessageQueueState["Ignored"] = "Ignored";
    MessageQueueState["QueueForProcess"] = "QueueForProcess";
    MessageQueueState["Completed"] = "Completed";
})(MessageQueueState = exports.MessageQueueState || (exports.MessageQueueState = {}));
let MessageQueueHandlerClass = class MessageQueueHandlerClass {
    constructor() {
        this.isLogAllMessages = null;
        this.queue = {}; // Default queue
        this.queueDebug = {}; // Debug queue
        this.dataUtil = new export_1.FisReadDataUtility();
        this.messageType = new export_1.MessageTypeProfile();
        this.dataType = new export_1.DataTypeProfile();
    }
    /**
    * Add a message to queue at key.
    *
    * @param {string} key The key to insert the message
    * @param {BaseMessage} message Message format compliants to FisApp
    * @param {string[]} filterByResponseDataTypes An array of strings of data types names that you want to retain.
    */
    addQueue(key, message, filterByResponseDataTypes) {
        let isAddToDefaultQueue = false;
        let isAddToDebugQueue = false;
        this.messageType.name = null;
        this.dataType.name = "any";
        let typeName = message.header.messageType;
        // Check isLogAllMessages and set the setting
        if (!this.isLogAllMessages) {
            this.isLogAllMessages = (observer_module_1.isLogAllMessages == "YES");
        }
        // Only able to typed response header type at the moment
        if (typeName == export_1.AppMessageType.Response
            || typeName == export_1.AppMessageType.ResponseData
            || typeName == export_1.AppMessageType.ResponseStatus
            || typeName == export_1.AppMessageType.ResponseSummary) {
            let responseMessage = message;
            if (responseMessage.data["header"] && responseMessage.data["header"]["messageType"] && responseMessage.data["header"]["messageType"] == export_1.AppMessageType.Notification) {
                let newNotificationMessage = responseMessage.data;
                this.dataUtil.readDataType(newNotificationMessage, null, this.messageType, this.dataType);
            }
            else {
                this.dataUtil.readDataType(responseMessage.header.requestMessageRespondTo, responseMessage, this.messageType, this.dataType);
            }
        }
        // For default queue, check if data is typed
        if (this.dataType.name != null
            && filterByResponseDataTypes && filterByResponseDataTypes.length > 0) {
            // Check if existed in filtered list
            const result = filterByResponseDataTypes.find(element => {
                return element.toLowerCase() === this.dataType.name.toLowerCase();
            });
            // If existed, add to default queue
            if (result) {
                isAddToDefaultQueue = true;
            }
        }
        else {
            // else just add to queue
            isAddToDefaultQueue = true;
        }
        // For debug queue, check if not in default queue
        if (!isAddToDefaultQueue) {
            // If log everything, then put to debug queue
            if (this.isLogAllMessages) {
                isAddToDebugQueue = true;
            }
        }
        // Process and add to one of the queues
        if (isAddToDefaultQueue || isAddToDebugQueue) {
            let times = 1;
            let state = MessageQueueState.Start;
            // if existed in default queue
            if (this.checkExisted(key)) {
                times = this.queue[key].times + 1;
                state = this.queue[key].state;
            }
            // if existed in debug queue
            else {
                if (this.queueDebug[key]) {
                    times = this.queueDebug[key].times + 1;
                    state = this.queueDebug[key].state;
                }
            }
            // get data
            let messageData = message;
            while (messageData['data']['data']) {
                messageData = messageData['data'];
            }
            // Create new message
            let newMessage = {
                message: message,
                data: messageData['data'],
                date: "",
                times: times,
                state: state,
                processTag: "Standard Process"
            };
            // Check dateCreated and set to mmessage date
            if (message.header && message.header.dateCreated) {
                newMessage.date = message.header.dateCreated;
            }
            // Add to queue
            if (isAddToDefaultQueue) {
                this.queue[key] = newMessage;
            }
            // Add to queue
            if (isAddToDebugQueue) {
                this.queueDebug[key] = newMessage;
            }
        }
    }
    checkExisted(key) {
        let returnBool = true;
        if (!this.queue[key])
            returnBool = false;
        return returnBool;
    }
    getQueue(key) {
        return this.queue[key] || null;
    }
    getQueueMessages() {
        return this.queue;
    }
    getQueueMessage(key) {
        let returnValue;
        if (this.queue[key])
            if (this.queue[key]["message"])
                returnValue = this.queue[key]["message"];
        return returnValue;
    }
};
MessageQueueHandlerClass = __decorate([
    common_1.Injectable()
], MessageQueueHandlerClass);
exports.MessageQueueHandlerClass = MessageQueueHandlerClass;
;
class MessageInQueueInterface {
    constructor() {
        this.processTag = "Standard Process";
    }
}
exports.MessageInQueueInterface = MessageInQueueInterface;
exports.notificationMessageQueueHandler = new MessageQueueHandlerClass();
exports.userSessionsMessageQueueHandler = new MessageQueueHandlerClass();
exports.serviceProviderMessageQueueHandler = new MessageQueueHandlerClass();
exports.requestMessageQueueHandler = new MessageQueueHandlerClass();
exports.responseMessageQueueHandler = new MessageQueueHandlerClass();
exports.serviceProviderMessageQueueHandler_ext = new MessageQueueHandlerClass();
//# sourceMappingURL=message.queue.handler.js.map