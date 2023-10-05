/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, GenericHeader, GenericHeaderOf, AppMessageHeaderOptions,
    SubscriptionMessageHeader, Subscription,
    SubscriptionMessageParameter as MessageParameter
} from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';

/**
 * App subscription message header.
 *
 * @class appsubscriptionmessageheader
 */
export class appsubscriptionmessageheader extends AppMessageHeaderKind {
    /**
     * Create new app subscription message header.
     *
     * @class appsubscriptionmessageheader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        // App message base header type is Request.
        this.messageBaseHeaderType = AppMessageType.Request;
        this.messageType = AppMessageType.Subscription;
    }

    /**
     * Create new subscription header.
     *
     * @class appsubscriptionmessageheader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {SubscriptionMessageHeader} - New subscription header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: SubscriptionMessageHeader = {} as SubscriptionMessageHeader;
            header.startSubscribingDateTime = this.dateToString(messageParameter &&
                messageParameter.startSubscribingDateTime);
            header.endSubscribingDateTime = this.dateToString(messageParameter &&
                messageParameter.endSubscribingDateTime);
            header.subscription = (messageParameter &&
                messageParameter.subscription) || Subscription.General; // Default is General
            return header as GenericHeaderOf<SubscriptionMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Convert date value to string.
     *
     * @class appsubscriptionmessageheader
     * @method dateToString
     * @param date {any} - Date. 
     * @return {string} - Date string.
     */
    protected dateToString(date: any): string {
        try {
            if (date) {
                return typeof date == "string" ? date :
                    (date instanceof Date && !isNaN(date.valueOf())) ?
                        date.toISOString() : undefined;
            }
        }
        catch (e) {
            throw e;
        }
        return undefined;
    }

}
