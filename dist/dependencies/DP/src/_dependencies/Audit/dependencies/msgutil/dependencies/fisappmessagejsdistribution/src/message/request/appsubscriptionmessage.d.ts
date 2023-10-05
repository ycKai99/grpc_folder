import { Message, SubscriptionMessage, AppMessageHeaderOptions, SubscriptionMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';
export declare class appsubscriptionmessage extends AppMessageKind {
    constructor(options?: AppMessageHeaderOptions);
    protected subscriptionMessage: SubscriptionMessage;
    protected createMessage(messageParameter: MessageParameter): SubscriptionMessage;
}
export declare function createSubscriptionMessage(messageParameter: MessageParameter): Message;
