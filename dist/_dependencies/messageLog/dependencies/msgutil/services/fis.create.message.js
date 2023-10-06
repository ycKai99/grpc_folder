"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FisCreateMessageUtility = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
const dependencies_1 = require("../dependencies/dependencies");
const dependencies_2 = require("../dependencies/dependencies");
const environment_1 = require("../environments/environment");
class FisCreateMessageUtility {
    constructor(UserAppId, UserAppName = '', producer = dependencies_1.ProducerType.UI) {
        this.thisUserAppId = ''; // Required
        this.requesterID = 'ObserverModule-' + new Date().getUTCMinutes(); // Required
        this.PRODUCER = {
            type: dependencies_1.ProducerType.UI,
            origin: {
                userApplication: {
                    userAppId: this.thisUserAppId,
                    userAppName: 'client',
                },
            },
        };
        // Initial setting
        this.setUserAppSettings(UserAppId, UserAppName, producer); // Must set to something meaningful
    }
    getApplicationId() {
        return this.thisUserAppId;
    }
    getQueryMessage(ucpId, query, data, messageName) {
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Query,
            messageName: messageName ? messageName : 'Query',
            data: data,
            isAggregate: false,
            dataLocation: { isEmbaded: true },
            dataFormat: { dataFormat: dependencies_1.DataFormat.Json },
            query: query || dependencies_1.Query.General,
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    generateRequest(message) {
        let returnMessage;
        if ((message.header.messageType = dependencies_2.AppMessageType.Request)) {
            returnMessage = message;
        }
        else {
            let currentMessage = message;
            returnMessage = this.getCommandMessage(currentMessage.header.security.ucpId, dependencies_1.Command.Execute, currentMessage, 'New notification requested to server');
        }
        return returnMessage;
    }
    getResponseMessage(ucpId, data, responseToMessage, messageName, responseMessageType, schemaName) {
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: responseMessageType || dependencies_2.AppMessageType.Response,
            messageName: messageName ? messageName : 'Response',
            data: data,
            isAggregate: false,
            dataLocation: { isEmbaded: true },
            dataFormat: {
                dataFormat: dependencies_1.DataFormat.Json,
                schemaType: dependencies_1.SchemaType.JsonSchema,
                schema: {
                    name: schemaName || '',
                },
            },
            requestMessageRespondTo: this.generateRequest(responseToMessage),
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getResponseDataMessage(ucpId, data, responseToMessage, messageName, responseMessageType, schemaName) {
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: responseMessageType || dependencies_2.AppMessageType.ResponseData,
            messageName: messageName ? messageName : 'Response Data',
            data: data,
            isAggregate: false,
            dataLocation: { isEmbaded: true },
            dataFormat: {
                dataFormat: dependencies_1.DataFormat.Json,
                schemaType: dependencies_1.SchemaType.JsonSchema,
                schema: {
                    name: schemaName || '',
                },
            },
            requestMessageRespondTo: this.generateRequest(responseToMessage),
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getResponseSummaryMessage(ucpId, data, responseToMessage, messageName, responseMessageType, schemaName) {
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: responseMessageType || dependencies_2.AppMessageType.ResponseSummary,
            messageName: messageName ? messageName : 'Response Summary',
            data: data,
            isAggregate: false,
            dataLocation: { isEmbaded: true },
            dataFormat: {
                dataFormat: dependencies_1.DataFormat.Json,
                schemaType: dependencies_1.SchemaType.JsonSchema,
                schema: {
                    name: schemaName || 'responseSummary',
                },
            },
            requestMessageRespondTo: this.generateRequest(responseToMessage),
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getResponseStatusMessage(ucpId, data, responseToMessage, thisResponseStatus, messageName, responseMessageType, schemaName) {
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: responseMessageType || dependencies_2.AppMessageType.ResponseStatus,
            messageName: messageName ? messageName : 'Response Status',
            data: data,
            isAggregate: false,
            dataLocation: { isEmbaded: true },
            dataFormat: {
                dataFormat: dependencies_1.DataFormat.Json,
                schemaType: dependencies_1.SchemaType.JsonSchema,
                schema: {
                    name: schemaName || 'responseStatus',
                },
            },
            requestMessageRespondTo: this.generateRequest(responseToMessage),
            responseStatus: thisResponseStatus,
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getResponseExceptionMessage(ucpId, data, responseToMessage, thisResponseStatus, thisExceptionType, messageName, responseMessageType, schemaName) {
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: responseMessageType || dependencies_2.AppMessageType.ResponseException,
            messageName: messageName ? messageName : 'Response Exception',
            data: data,
            isAggregate: false,
            dataLocation: { isEmbaded: true },
            dataFormat: {
                dataFormat: dependencies_1.DataFormat.Json,
                schemaType: dependencies_1.SchemaType.JsonSchema,
                schema: {
                    name: schemaName || 'responseException',
                },
            },
            responseStatus: thisResponseStatus,
            responseException: thisExceptionType,
        };
        // Optional field
        if (responseToMessage) {
            messageParm.requestMessageRespondTo =
                this.generateRequest(responseToMessage);
        }
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    setUserAppSettings(userAppId, userAppName, producerType) {
        this.thisUserAppId = userAppId;
        let thisUserAppName = userAppName || 'Client';
        let thisProducerType = producerType || dependencies_1.ProducerType.UI;
        this.PRODUCER.type = thisProducerType;
        this.PRODUCER.origin.userApplication.userAppId = userAppId;
        this.PRODUCER.origin.userApplication.userAppName = thisUserAppName;
    }
    getUserAppId() {
        return this.thisUserAppId;
    }
    getDPmessage(message) {
        return message;
    }
    getLoginMessage() {
        let messageParm = {
            security: { ucpId: 'abc' },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Command,
            messageName: 'Login',
            command: dependencies_1.Command.Start,
            data: {
                // at the moment only this credential will work
                authenticationType: 'google',
                email: 'legit@gmail.com',
                timeout: environment_1.process.env.loginTimeoutMinutes || 24 * 60, // In minutes. Default set to 24 hour = 24h*60min
            },
            requesterId: this.requesterID,
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getLogoutMessage(ucpId) {
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Command,
            messageName: 'Logout',
            command: dependencies_1.Command.Logout,
            data: {},
            requesterId: this.requesterID,
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getCommandMessage(ucpId, command, data, messageName) {
        if (!data) {
            data = {};
        }
        // Required for service ID
        let serviceId = data['serviceId'] || '';
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Command,
            messageName: messageName ? messageName : 'Command',
            command: command,
            serviceId: serviceId,
            data: data,
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getCommandMessage_ext(ucpId, command, serviceId, data, messageName) {
        if (!data) {
            data = {};
        }
        // Required for service ID
        data['serviceId'] = serviceId;
        let messageParm = {
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Command,
            messageName: messageName ? messageName : 'Command',
            command: command,
            serviceId: serviceId,
            data: data,
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getQueryMessage_ext(ucpId, query, serviceId, data, messageName) {
        // Required for service ID
        data['serviceId'] = serviceId;
        let messageParm = {
            isAggregate: false,
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            query: query || dependencies_1.Query.GetData,
            dataFormat: {
                dataFormat: dependencies_1.DataFormat.Json,
            },
            dataLocation: {
                isEmbaded: true,
            },
            messageType: dependencies_2.AppMessageType.Query,
            messageName: messageName ? messageName : 'Query',
            data: data,
            userId: 'FIS',
            instanceId: '',
            serviceId: serviceId,
            dataSourceTiming: '',
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getQueryMessageForGraphQL(ucpId, query, messageName) {
        let messageParm = {
            isAggregate: false,
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            query: query,
            dataFormat: {
                dataFormat: dependencies_1.DataFormat.Json,
                schemaType: dependencies_1.SchemaType.GraphQL,
                schema: {
                    name: 'dataTypeFormat',
                },
            },
            dataLocation: {
                isEmbaded: true,
            },
            messageType: dependencies_2.AppMessageType.Query,
            messageName: messageName ? messageName : 'Query',
            data: query,
            userId: 'FIS',
            instanceId: '',
            dataSourceTiming: '',
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    getNotificationMessage(ucpId, data, messageName, notificationType) {
        let messageParm = {
            isAggregate: false,
            security: { ucpId: ucpId },
            producer: this.PRODUCER,
            dataFormat: {
                dataFormat: dependencies_1.DataFormat.Json,
                schemaType: dependencies_1.SchemaType.JsonSchema,
                schema: {
                    name: 'NotificationData',
                },
            },
            dataLocation: {
                isEmbaded: true,
            },
            messageType: dependencies_2.AppMessageType.Notification,
            messageName: messageName ? messageName : 'Notify',
            data: data,
            notificationType: notificationType || dependencies_1.NotificationType.UserActivity,
            notificationNature: dependencies_1.NotificationNature.ForInformation,
        };
        return dependencies_2.AppMessageCreator.create(messageParm);
    }
    /**
     * message to subscribe server message
     * @param ucpId
     * @param category category of message, e.g. property_change
     */
    getSubscriptionMessage(ucpId, messageName, subscription, data = {}) {
        let messageParam = {
            security: {
                ucpId: ucpId,
            },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Subscription,
            messageName: messageName ? messageName : 'Subscription',
            subscription: subscription || dependencies_1.Subscription.General,
            data: data,
        };
        let subscriptionmessage = dependencies_2.AppMessageCreator.create(messageParam);
        return subscriptionmessage;
    }
    /**
     * message to subscribe server notification
     * @param ucpId
     * @param category category of notification, e.g. property_change
     */
    getSubscribeNotifMessage(ucpId, category, messageName, lastReceivedMessageCreatedDate, lastSubscriptionId) {
        let messageParam = {
            security: {
                ucpId: ucpId,
            },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Subscription,
            messageName: messageName ? messageName : 'Subscription',
            subscription: dependencies_1.Subscription.General,
            data: {
                action: 'subscribe',
                query: {
                    FisCommands: {
                        __args: {
                            where: { category: category || 'property_change' },
                        },
                    },
                },
            },
        };
        // Added last receive message date option
        if (lastReceivedMessageCreatedDate) {
            messageParam.data.query.FisCommands.__args['lastReceivedMessageCreatedDate'] = lastReceivedMessageCreatedDate;
        }
        // Added last subscriptionId option
        if (lastSubscriptionId) {
            messageParam.data.query.FisCommands.__args['lastSubscriptionId'] = lastSubscriptionId;
        }
        let subscriptionmessage = dependencies_2.AppMessageCreator.create(messageParam);
        return subscriptionmessage;
    }
    /**
     * message to subscribe server notifications
     * @param ucpId
     * @param category category of Notifications, e.g. property_change
     */
    getSubscribeLoginMessage(ucpId) {
        let messageParam = {
            security: {
                ucpId: ucpId,
            },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Subscription,
            messageName: 'subscribe_to_success_login',
            subscription: dependencies_1.Subscription.General,
            data: {
                action: 'subscribe',
                query: {
                    Events: {
                        __args: {
                            where: { messageName: 'Success Login' },
                        },
                    },
                },
            },
        };
        return dependencies_2.AppMessageCreator.create(messageParam);
    }
    /**
     * message object to unsubscribe server
     * @param ucpId
     * @param subscriptionId
     */
    getUnsubscribeNotifMessage(ucpId, subscriptionId) {
        let messageParam = {
            isAggregate: false,
            security: {
                ucpId: ucpId,
            },
            producer: this.PRODUCER,
            messageType: dependencies_2.AppMessageType.Subscription,
            messageName: 'unsubscribe_property_change',
            subscription: dependencies_1.Subscription.General,
            data: {
                action: 'unsubscribe',
                subscriptionId,
            },
        };
        return dependencies_2.AppMessageCreator.create(messageParam);
    }
    /**
     * Extract UCPId from response message
     * @param message is a response message.
     */
    getUCPId(message) {
        try {
            let responsemessage = message; // Type checking
            let data = responsemessage.data;
            let ucpId = data['ucpId'] || data['ServerUCP']['ucpId'];
            return ucpId;
        }
        catch (e) {
            console.log('Error reading UCPId from response message');
            console.log(message);
        }
    }
}
exports.FisCreateMessageUtility = FisCreateMessageUtility;
//# sourceMappingURL=fis.create.message.js.map