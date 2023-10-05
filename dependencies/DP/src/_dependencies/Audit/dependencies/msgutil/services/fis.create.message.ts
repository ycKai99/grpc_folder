/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import {
  Command,
  Query,
  DataFormat,
  RequestMessage,
  MessageType,
  QueryMessage,
  MessageParameter,
  NotificationHeader,
  NotificationNature,
  NotificationType,
  ProducerType,
  Subscription,
  SubscriptionMessage,
  ResponseMessage,
  ServerUCP,
  CommandMessage,
  SchemaType,
  ResponseStatusMessageParameter,
  ResponseStatus,
  ResponseExceptionMessageParameter,
  ExceptionType,
  ResponseExceptionMessage,
} from '../dependencies/dependencies';

import {
  AppMessageType,
  AppMessageCreator,
} from '../dependencies/dependencies';

import {
  CommandMessageParameter,
  QueryMessageParameter,
  SubscriptionMessageParameter,
  NotificationMessage,
  ResponseMessageParameter,
  NotificationMessageParameter,
} from '../dependencies/dependencies';

import {process} from '../environments/environment'

// Setup and show current environment
// const dotEnvSetup = require('dotenv').config(); 

interface UacpRequest extends Record<string, any> {
  ucpId?: string;
  serviceId?: string;
  operation?: any;
  payload?: any;
  isStream?: boolean;
  messageType?: string;
  messageName?: string;
  subscriptionCategory?: string;
}

export class FisCreateMessageUtility { 
  protected thisUserAppId = ''; // Required
  protected requesterID = 'ObserverModule-' + new Date().getUTCMinutes(); // Required
  protected PRODUCER = {
    type: ProducerType.UI,
    origin: {
      userApplication: {
        userAppId: this.thisUserAppId,
        userAppName: 'client',
      },
    },
  };

  constructor(
    UserAppId: string,
    UserAppName: string = '',
    producer: ProducerType = ProducerType.UI,
  ) {
    // Initial setting
    this.setUserAppSettings(UserAppId, UserAppName, producer); // Must set to something meaningful
  }

  public getApplicationId() {
    return this.thisUserAppId;
  }

  public getQueryMessage(
    ucpId: string,
    query: Query,
    data: any,
    messageName?: string,
  ): QueryMessage {
    let messageParm: QueryMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: AppMessageType.Query,
      messageName: messageName ? messageName : 'Query',
      data: data,
      isAggregate: false,
      dataLocation: { isEmbaded: true },
      dataFormat: { dataFormat: DataFormat.Json },
      query: query || Query.General,
    } as QueryMessageParameter;

    return AppMessageCreator.create(messageParm) as QueryMessage;
  }

  public generateRequest(
    message: RequestMessage | NotificationMessage,
  ): RequestMessage {
    let returnMessage: RequestMessage;

    if ((message.header.messageType = AppMessageType.Request)) {
      returnMessage = <RequestMessage>message;
    } else {
      let currentMessage = <NotificationMessage>message;

      returnMessage = this.getCommandMessage(
        currentMessage.header.security.ucpId,
        Command.Execute,
        currentMessage,
        'New notification requested to server',
      );
    }

    return returnMessage;
  }

  public getResponseMessage(
    ucpId: string,
    data: any,
    responseToMessage: RequestMessage,
    messageName?: string,
    responseMessageType?: AppMessageType,
    schemaName?: string,
  ): ResponseMessage {
    let messageParm: ResponseMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: responseMessageType || AppMessageType.Response,
      messageName: messageName ? messageName : 'Response',
      data: data,
      isAggregate: false,
      dataLocation: { isEmbaded: true },
      dataFormat: {
        dataFormat: DataFormat.Json,
        schemaType: SchemaType.JsonSchema,
        schema: {
          name: schemaName || '',
        },
      },
      requestMessageRespondTo: this.generateRequest(responseToMessage),
    } as ResponseMessageParameter;

    return AppMessageCreator.create(messageParm) as ResponseMessage;
  }

  public getResponseDataMessage(
    ucpId: string,
    data: any,
    responseToMessage: RequestMessage,
    messageName?: string,
    responseMessageType?: AppMessageType,
    schemaName?: string,
  ): ResponseMessage {
    let messageParm: ResponseMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: responseMessageType || AppMessageType.ResponseData,
      messageName: messageName ? messageName : 'Response Data',
      data: data,
      isAggregate: false,
      dataLocation: { isEmbaded: true },
      dataFormat: {
        dataFormat: DataFormat.Json,
        schemaType: SchemaType.JsonSchema,
        schema: {
          name: schemaName || '',
        },
      },
      requestMessageRespondTo: this.generateRequest(responseToMessage),
    } as ResponseMessageParameter;

    return AppMessageCreator.create(messageParm) as ResponseMessage;
  }

  public getResponseSummaryMessage(
    ucpId: string,
    data: any,
    responseToMessage: RequestMessage,
    messageName?: string,
    responseMessageType?: AppMessageType,
    schemaName?: string,
  ): ResponseMessage {
    let messageParm: ResponseStatusMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: responseMessageType || AppMessageType.ResponseSummary,
      messageName: messageName ? messageName : 'Response Summary',
      data: data,
      isAggregate: false,
      dataLocation: { isEmbaded: true },
      dataFormat: {
        dataFormat: DataFormat.Json,
        schemaType: SchemaType.JsonSchema,
        schema: {
          name: schemaName || 'responseSummary',
        },
      },
      requestMessageRespondTo: this.generateRequest(responseToMessage),
    } as ResponseStatusMessageParameter;

    return AppMessageCreator.create(messageParm) as ResponseMessage;
  }

  public getResponseStatusMessage(
    ucpId: string,
    data: any,
    responseToMessage: RequestMessage,
    thisResponseStatus: ResponseStatus,
    messageName?: string,
    responseMessageType?: AppMessageType,
    schemaName?: string,
  ): ResponseMessage {
    let messageParm: ResponseStatusMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: responseMessageType || AppMessageType.ResponseStatus,
      messageName: messageName ? messageName : 'Response Status',
      data: data,
      isAggregate: false,
      dataLocation: { isEmbaded: true },
      dataFormat: {
        dataFormat: DataFormat.Json,
        schemaType: SchemaType.JsonSchema,
        schema: {
          name: schemaName || 'responseStatus',
        },
      },
      requestMessageRespondTo: this.generateRequest(responseToMessage),
      responseStatus: thisResponseStatus,
    } as ResponseStatusMessageParameter;

    return AppMessageCreator.create(messageParm) as ResponseMessage;
  }

  public getResponseExceptionMessage(
    ucpId: string,
    data: any,
    responseToMessage?: RequestMessage,
    thisResponseStatus?: ResponseStatus,
    thisExceptionType?: ExceptionType,
    messageName?: string,
    responseMessageType?: AppMessageType,
    schemaName?: string,
  ): ResponseExceptionMessage {
    let messageParm: ResponseExceptionMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: responseMessageType || AppMessageType.ResponseException,
      messageName: messageName ? messageName : 'Response Exception',
      data: data,
      isAggregate: false,
      dataLocation: { isEmbaded: true },
      dataFormat: {
        dataFormat: DataFormat.Json,
        schemaType: SchemaType.JsonSchema,
        schema: {
          name: schemaName || 'responseException',
        },
      },
      responseStatus: thisResponseStatus,
      responseException: thisExceptionType,
    } as ResponseExceptionMessageParameter;

    // Optional field
    if (responseToMessage) {
      messageParm.requestMessageRespondTo =
        this.generateRequest(responseToMessage);
    }

    return AppMessageCreator.create(messageParm) as ResponseExceptionMessage;
  }

  private setUserAppSettings(
    userAppId: string,
    userAppName?: string,
    producerType?: ProducerType,
  ) {
    this.thisUserAppId = userAppId;

    let thisUserAppName: string = userAppName || 'Client';
    let thisProducerType: ProducerType = producerType || ProducerType.UI;

    this.PRODUCER.type = thisProducerType;
    this.PRODUCER.origin.userApplication.userAppId = userAppId;
    this.PRODUCER.origin.userApplication.userAppName = thisUserAppName;
  }

  public getUserAppId() {
    return this.thisUserAppId;
  }

  public getDPmessage(message: any) {
    return message;
  }

  public getLoginMessage(): CommandMessage {
    let messageParm: CommandMessageParameter = {
      security: { ucpId: 'abc' }, // ucpId is compulsory for all messages. This is set by server. Client waits server's UCP.
      producer: this.PRODUCER,
      messageType: AppMessageType.Command,
      messageName: 'Login', // Short description
      command: Command.Start,
      data: {
        // at the moment only this credential will work
        authenticationType: 'google',
        email: 'legit@gmail.com',
        timeout: process.env.loginTimeoutMinutes || 24*60, // In minutes. Default set to 24 hour = 24h*60min
      },
      requesterId: this.requesterID,
    } as CommandMessageParameter;
 
    return AppMessageCreator.create(messageParm) as CommandMessage;
  }

  public getLogoutMessage(ucpId: string): CommandMessage {
    let messageParm: CommandMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: AppMessageType.Command,
      messageName: 'Logout', // Short description of this message.
      command: Command.Logout,
      data: {},
      requesterId: this.requesterID,
    } as CommandMessageParameter;

    return AppMessageCreator.create(messageParm) as CommandMessage;
  }

  public getCommandMessage(
    ucpId: string,
    command: Command,
    data?: any,
    messageName?: string,
  ): CommandMessage {
    if (!data) {
      data = {};
    }

    // Required for service ID
    let serviceId = data['serviceId'] || '';

    let messageParm: CommandMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: AppMessageType.Command,
      messageName: messageName ? messageName : 'Command',
      command: command,
      serviceId: serviceId,
      data: data,
    } as CommandMessageParameter;

    return AppMessageCreator.create(messageParm) as CommandMessage;
  }

  public getCommandMessage_ext(
    ucpId: string,
    command: string,
    serviceId: string,
    data?: any,
    messageName?: string,
  ): CommandMessage {
    if (!data) {
      data = {};
    }

    // Required for service ID
    data['serviceId'] = serviceId;

    let messageParm: CommandMessageParameter = {
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      messageType: AppMessageType.Command,
      messageName: messageName ? messageName : 'Command',
      command: command,
      serviceId: serviceId,
      data: data,
    } as CommandMessageParameter;

    return AppMessageCreator.create(messageParm) as CommandMessage;
  }

  public getQueryMessage_ext(
    ucpId: string,
    query: string,
    serviceId: string,
    data?: any,
    messageName?: string,
  ): QueryMessage {
    // Required for service ID
    data['serviceId'] = serviceId;

    let messageParm: QueryMessageParameter = {
      isAggregate: false,
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      query: query || Query.GetData,
      dataFormat: {
        dataFormat: DataFormat.Json,
      },
      dataLocation: {
        isEmbaded: true,
      },
      messageType: AppMessageType.Query,
      messageName: messageName ? messageName : 'Query',
      data: data,
      userId: 'FIS',
      instanceId: '',
      serviceId: serviceId,
      dataSourceTiming: '',
    } as QueryMessageParameter;

    return AppMessageCreator.create(messageParm) as QueryMessage;
  }

  public getQueryMessageForGraphQL(
    ucpId: string,
    query: string,
    messageName?: string,
  ): QueryMessage {
    let messageParm: QueryMessageParameter = {
      isAggregate: false,
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      query: query,
      dataFormat: {
        dataFormat: DataFormat.Json,
        schemaType: SchemaType.GraphQL,
        schema: {
          name: 'dataTypeFormat',
        },
      },
      dataLocation: {
        isEmbaded: true,
      },
      messageType: AppMessageType.Query,
      messageName: messageName ? messageName : 'Query',
      data: query,
      userId: 'FIS',
      instanceId: '',
      dataSourceTiming: '',
    } as QueryMessageParameter;

    return AppMessageCreator.create(messageParm) as QueryMessage;
  }

  public getNotificationMessage(
    ucpId: string,
    data?: any,
    messageName?: string,
    notificationType?: NotificationType,
  ): NotificationMessage {
    let messageParm: NotificationMessageParameter = {
      isAggregate: false,
      security: { ucpId: ucpId },
      producer: this.PRODUCER,
      dataFormat: {
        dataFormat: DataFormat.Json,
        schemaType: SchemaType.JsonSchema,
        schema: {
          name: 'NotificationData',
        },
      },
      dataLocation: {
        isEmbaded: true,
      },
      messageType: AppMessageType.Notification,
      messageName: messageName ? messageName : 'Notify',
      data: data,
      notificationType: notificationType || NotificationType.UserActivity,
      notificationNature: NotificationNature.ForInformation,
    } as NotificationMessageParameter;

    return AppMessageCreator.create(messageParm) as NotificationMessage;
  }

  /**
   * message to subscribe server message
   * @param ucpId
   * @param category category of message, e.g. property_change
   */
  public getSubscriptionMessage(
    ucpId: string,
    messageName: string,
    subscription: Subscription,
    data: unknown = {},
  ) {
    let messageParam: SubscriptionMessageParameter = {
      security: {
        ucpId: ucpId,
      },
      producer: this.PRODUCER,
      messageType: AppMessageType.Subscription,
      messageName: messageName ? messageName : 'Subscription',
      subscription: subscription || Subscription.General,
      data: data,
    } as unknown as SubscriptionMessageParameter;

    let subscriptionmessage = AppMessageCreator.create(
      messageParam,
    ) as SubscriptionMessage;

    return subscriptionmessage;
  }

  /**
   * message to subscribe server notification
   * @param ucpId
   * @param category category of notification, e.g. property_change
   */
  public getSubscribeNotifMessage(
    ucpId: string,
    category: string,
    messageName?: string,
    lastReceivedMessageCreatedDate?: Date,
    lastSubscriptionId?: string
  ): SubscriptionMessage {
    let messageParam: SubscriptionMessageParameter = {
      security: {
        ucpId: ucpId,
      },
      producer: this.PRODUCER,
      messageType: AppMessageType.Subscription,
      messageName: messageName ? messageName : 'Subscription',
      subscription: Subscription.General,
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
    } as unknown as SubscriptionMessageParameter;

    // Added last receive message date option
    if(lastReceivedMessageCreatedDate)
    {
      messageParam.data.query.FisCommands.__args['lastReceivedMessageCreatedDate'] = lastReceivedMessageCreatedDate;
    }

    // Added last subscriptionId option
    if(lastSubscriptionId)
    {
      messageParam.data.query.FisCommands.__args['lastSubscriptionId'] = lastSubscriptionId;
    }

    let subscriptionmessage = AppMessageCreator.create(
      messageParam,
    ) as SubscriptionMessage;

    return subscriptionmessage;
  }

  /**
   * message to subscribe server notifications
   * @param ucpId
   * @param category category of Notifications, e.g. property_change
   */
  public getSubscribeLoginMessage(ucpId: string): SubscriptionMessage {
    let messageParam: SubscriptionMessageParameter = {
      security: {
        ucpId: ucpId,
      },
      producer: this.PRODUCER,
      messageType: AppMessageType.Subscription,
      messageName: 'subscribe_to_success_login',
      subscription: Subscription.General,
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
    } as SubscriptionMessageParameter;

    return AppMessageCreator.create(messageParam) as SubscriptionMessage;
  }

  /**
   * message object to unsubscribe server
   * @param ucpId
   * @param subscriptionId
   */
  public getUnsubscribeNotifMessage(
    ucpId: string,
    subscriptionId: string,
  ): SubscriptionMessage {
    let messageParam: SubscriptionMessageParameter = {
      isAggregate: false,
      security: {
        ucpId: ucpId,
      },
      producer: this.PRODUCER,
      messageType: AppMessageType.Subscription,
      messageName: 'unsubscribe_property_change',
      subscription: Subscription.General,
      data: {
        action: 'unsubscribe',
        subscriptionId,
      },
    } as SubscriptionMessageParameter;

    return AppMessageCreator.create(messageParam) as SubscriptionMessage;
  }

  /**
   * Extract UCPId from response message
   * @param message is a response message.
   */
  public getUCPId(message: ResponseMessage): string {
    try {
      let responsemessage: ResponseMessage = message; // Type checking
      let data: ServerUCP = responsemessage.data as ServerUCP;
      let ucpId = data['ucpId'] || data['ServerUCP']['ucpId'];
      return ucpId;
    } catch (e) {
      console.log('Error reading UCPId from response message');
      console.log(message);
    }
  }
}
