/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericHeader, AppMessageHeaderOptions, SubscriptionMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App subscription message header.
 *
 * @class appsubscriptionmessageheader
 */
export declare class appsubscriptionmessageheader extends AppMessageHeaderKind {
    /**
     * Create new app subscription message header.
     *
     * @class appsubscriptionmessageheader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new subscription header.
     *
     * @class appsubscriptionmessageheader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {SubscriptionMessageHeader} - New subscription header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
    /**
     * Convert date value to string.
     *
     * @class appsubscriptionmessageheader
     * @method dateToString
     * @param date {any} - Date.
     * @return {string} - Date string.
     */
    protected dateToString(date: any): string;
}
