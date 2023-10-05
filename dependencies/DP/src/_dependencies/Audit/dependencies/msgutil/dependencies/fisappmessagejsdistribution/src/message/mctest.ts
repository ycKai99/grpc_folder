
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageType, AppMessageType, MessageParameter, ProducerType, DataFormat } from '../types/appmessagetype';
import { AppMessage } from './common/appmessage';
import * as Messages from './messages';
import { load } from '../utils/moduleloader';
import { Config } from '../config/config';

export type DefaultModule = typeof Messages;

/**
 * App message creator.
 *
 * @class AppMessageCreator
 */
export class AppMessageCreator {
    /**
     * Initialise message creator.
     * 
     * @class AppMessageCreator
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean = AppMessageCreator.initialise();

    /**
     * List of message objects
     * 
     * @class AppMessageCreator
     * @property messages
     * @type {object}
     */
    static messages: object;

    /**
     * Initialise message creator.
     *
     * @class AppMessageCreator
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean {
        if (this.__initialised) {

        }
        else {
            // Load additional message modules
            this.messages = {
                ...Messages,
                ...load(Config.messageModule()) as object
            };
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
    public static new(alias: MessageType, options?: any): AppMessage {
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
    public static create(messageParameter: MessageParameter,
        alias?: MessageType, options?: any): Message {
        try {
            return this.new(alias ||
                (messageParameter && messageParameter.messageType),
                options).create(messageParameter);
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new app message.
 *
 * @function createMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @param alias {string} -  Message class alias name.
 * @param options {any} - Message options. 
 * @return {Message} - New app message.
 */
export function createMessage(messageParameter: MessageParameter,
    alias?: MessageType, options?: any): Message {
    try {
        return AppMessageCreator.create(messageParameter, alias, options);
    }
    catch (e) {
        throw e;
    }
}

console.log(JSON.stringify(
createMessage({
    messageType: AppMessageType.Command,
    messageName: "Test message",
    isAggregate: false,
    security: {
        ucpId: "ucp123",
        applicationLogInID: "FIS",
        applicationUserName: "FIS"
    },
    producer: {
        type: ProducerType.UI,
        origin: {
            userApplication: {
                userAppId: "FIS",
                userAppName: "FIS"
            }
        }
    },
    dataLocation: {isEmbaded:true},
    dataFormat: {dataFormat:DataFormat.Json },
    data: {}
},
AppMessageType.Command), null, 2));