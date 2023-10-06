"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionMessage = exports.appsubscriptionmessage = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const apprequestmessagetype_1 = require("./apprequestmessagetype");
const appmessagekind_1 = require("../common/appmessagekind");
/**
 * App subscription message.
 *
 * @class appsubscriptionmessage
 */
class appsubscriptionmessage extends appmessagekind_1.AppMessageKind {
    /**
     * Create new app subscription message.
     *
     * @class appsubscriptionmessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options.
     */
    constructor(options) {
        super(options);
        this.messageType = apprequestmessagetype_1.AppMessageType.Subscription;
    }
    /**
     * Create new subscription message.
     *
     * @class appsubscriptionmessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {SubscriptionMessage} - New subscription message.
     */
    createMessage(messageParameter) {
        try {
            this.subscriptionMessage = {};
            return this.subscriptionMessage;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.appsubscriptionmessage = appsubscriptionmessage;
/**
 * Create new App subscription message.
 *
 * @function createSubscriptionMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {Message} - App subscription message.
 */
function createSubscriptionMessage(messageParameter) {
    try {
        return new appsubscriptionmessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createSubscriptionMessage = createSubscriptionMessage;
//# sourceMappingURL=appsubscriptionmessage.js.map