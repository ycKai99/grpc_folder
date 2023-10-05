/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, SubscriptionMessage, AppMessageHeaderOptions,
    SubscriptionMessageParameter as MessageParameter
} from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App subscription message.
 *
 * @class appsubscriptionmessage
 */
export class appsubscriptionmessage extends AppMessageKind {
    /**
     * Create new app subscription message.
     *
     * @class appsubscriptionmessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Subscription;
    }

    /**
     * App subscription Message.
     * 
     * @class appsubscriptionmessage
     * @property subscriptionMessage
     * @type {SubscriptionMessage} - App subscription Message.
     */
    protected subscriptionMessage: SubscriptionMessage;

    /**
     * Create new subscription message.
     *
     * @class appsubscriptionmessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {SubscriptionMessage} - New subscription message.
     */
    protected createMessage(messageParameter: MessageParameter): SubscriptionMessage {
        try {
            this.subscriptionMessage = {} as SubscriptionMessage;
            return this.subscriptionMessage;
        }
        catch (e) {
            throw e;
        }
    }

}

/**
 * Create new App subscription message.
 *
 * @function createSubscriptionMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App subscription message.
 */
export function createSubscriptionMessage(messageParameter: MessageParameter): Message {
    try {
        return new appsubscriptionmessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}

