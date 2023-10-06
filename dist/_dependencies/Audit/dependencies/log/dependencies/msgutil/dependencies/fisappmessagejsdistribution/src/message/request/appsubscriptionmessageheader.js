"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appsubscriptionmessageheader = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessageheaderkind_1 = require("../common/appmessageheaderkind");
/**
 * App subscription message header.
 *
 * @class appsubscriptionmessageheader
 */
class appsubscriptionmessageheader extends appmessageheaderkind_1.AppMessageHeaderKind {
    /**
     * Create new app subscription message header.
     *
     * @class appsubscriptionmessageheader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options) {
        super(options);
        // App message base header type is Request.
        this.messageBaseHeaderType = apprequestmessagetype_1.AppMessageType.Request;
        this.messageType = apprequestmessagetype_1.AppMessageType.Subscription;
    }
    /**
     * Create new subscription header.
     *
     * @class appsubscriptionmessageheader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {SubscriptionMessageHeader} - New subscription header.
     */
    createHeader(messageParameter) {
        try {
            let header = {};
            header.startSubscribingDateTime = this.dateToString(messageParameter &&
                messageParameter.startSubscribingDateTime);
            header.endSubscribingDateTime = this.dateToString(messageParameter &&
                messageParameter.endSubscribingDateTime);
            header.subscription = (messageParameter &&
                messageParameter.subscription) || apprequestmessagetype_1.Subscription.General; // Default is General
            return header;
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
    dateToString(date) {
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
exports.appsubscriptionmessageheader = appsubscriptionmessageheader;
//# sourceMappingURL=appsubscriptionmessageheader.js.map