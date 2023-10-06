"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.AppMessageCreator = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../types/appmessagetype");
const Messages = require("./messages");
const moduleloader_1 = require("../utils/moduleloader");
const config_1 = require("../config/config");
/**
 * App message creator.
 *
 * @class AppMessageCreator
 */
class AppMessageCreator {
    /**
     * Initialise message creator.
     *
     * @class AppMessageCreator
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
        if (this.__initialised) {
        }
        else {
            // Load additional message modules
            this.messages = Object.assign(Object.assign({}, Messages), moduleloader_1.load(config_1.Config.messageModule()));
        }
        return true;
    }
    /**
     * Create new message instance.
     *
     * @class AppMessageCreator
     * @method new
     * @param alias {string} -  Message class alias name.
     * @param options {any} - Message options.
     * @return {AppMessage} - App message instance.
     */
    static new(alias, options) {
        try {
            return new this.messages[alias](options);
        }
        catch (e) {
            throw "Message alias name '" + alias + "' not found.\n" + e;
        }
    }
    /**
     * Create new message.
     *
     * @class AppMessageCreator
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @param alias {string} -  Message class alias name.
     * @param options {any} - Message options.
     * @return {Message} - Message.
     */
    static create(messageParameter, alias, options) {
        try {
            return this.new(alias ||
                (messageParameter && messageParameter.messageType), options).create(messageParameter);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageCreator = AppMessageCreator;
/**
 * Initialise message creator.
 *
 * @class AppMessageCreator
 * @property __initialised
 * @type {boolean}
 */
AppMessageCreator.__initialised = AppMessageCreator.initialise();
/**
 * Create new app message.
 *
 * @function createMessage
 * @param messageParameter {MessageParameter} - Message parameters.
 * @param alias {string} -  Message class alias name.
 * @param options {any} - Message options.
 * @return {Message} - New app message.
 */
function createMessage(messageParameter, alias, options) {
    try {
        return AppMessageCreator.create(messageParameter, alias, options);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessage = createMessage;
console.log(JSON.stringify(createMessage({
    messageType: appmessagetype_1.AppMessageType.Command,
    messageName: "Test message",
    isAggregate: false,
    security: {
        ucpId: "ucp123",
        applicationLogInID: "FIS",
        applicationUserName: "FIS"
    },
    producer: {
        type: appmessagetype_1.ProducerType.UI,
        origin: {
            userApplication: {
                userAppId: "FIS",
                userAppName: "FIS"
            }
        }
    },
    dataLocation: { isEmbaded: true },
    dataFormat: { dataFormat: appmessagetype_1.DataFormat.Json },
    data: {}
}, appmessagetype_1.AppMessageType.Command), null, 2));
//# sourceMappingURL=mctest.js.map