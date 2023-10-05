
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageType, MessageParameter } from '../types/appmessagetype';
import { AppMessage } from './common/appmessage';
import * as Messages from './messages';
// 20201228 -Fixed Angular Webpack not support dynamic require
// import { load } from '../utils/moduleloader';
// import { Config } from '../config/config';
//import * as MessagesExtend from '../messages.config';
// End 20201228 -Fixed Angular Webpack not support dynamic require

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
    // 20201228 -Fixed Angular Webpack not support dynamic require
    // protected static __initialised: boolean = AppMessageCreator.initialise();
    protected static __initialised: boolean;
    // End 20201228 -Fixed Angular Webpack not support dynamic require

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
            // 20201228 -Fixed Angular Webpack not support dynamic require
            // Load additional message modules
            // Angular Webpack does not suipport require using string based variable
            // Cause Module not found.
            // this.messages = {
            //     ...Messages,
            //     ...load(Config.messageModule()) as object
            // };
            this.messages = {
                ...Messages,
                //...MessagesExtend
            };
            this.__initialised = true;
            // End 20201228 -Fixed Angular Webpack not support dynamic require
        }
        return true;
    }

    /**
     * Create new message instance.
     *
     * @class AppMessageCreator
     * @method new
     * @param alias {MessageType, } -  Message class alias name.
     * @param options {any} - Message options. 
     * @return {AppMessage} - App message instance.
     */
    public static new(alias: MessageType, options?: any): AppMessage {
        try {
            this.initialise();  // 20201228 -Fixed Angular Webpack not support dynamic require
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
     * @param options {any} - Message options. 
     * @return {Message} - Message.
     */
    public static create(messageParameter: MessageParameter,
        options?: any): Message {
        try {
            return this.new(
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
 * @param options {any} - Message options. 
 * @return {Message} - New app message.
 */
export function createMessage(messageParameter: MessageParameter,
    options?: any): Message {
    try {
        return AppMessageCreator.create(messageParameter, options);
    }
    catch (e) {
        throw e;
    }
}
