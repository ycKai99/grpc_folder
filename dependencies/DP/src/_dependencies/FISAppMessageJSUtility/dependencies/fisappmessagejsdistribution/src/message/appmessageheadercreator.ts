
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageType, Header, MessageParameter } from '../types/appmessagetype';
import { AppMessageHeader } from './common/appmessageheader';
import * as MessageHeaders from './messageheaders';
// 20201228 -Fixed Angular Webpack not support dynamic require
// import { load } from '../utils/moduleloader';
// import { Config } from '../config/config';
//import * as MessageHeadersExtend from '../messagesheader.config';
// End 20201228 -Fixed Angular Webpack not support dynamic require

/**
 * App message header creator.
 *
 * @class AppMessageHeaderCreator
 */
export class AppMessageHeaderCreator {
    /**
     * Initialise message header creator.
     * 
     * @class AppMessageHeaderCreator
     * @property __initialised
     * @type {boolean}
     */
    // 20201228 -Fixed Angular Webpack not support dynamic require
    // protected static __initialised: boolean = AppMessageHeaderCreator.initialise();
    protected static __initialised: boolean;
    // End 20201228 -Fixed Angular Webpack not support dynamic require

    /**
     * List of message header objects
     * 
     * @class AppMessageHeaderCreator
     * @property messageHeaders
     * @type {object}
     */
    static messageHeaders: object;

    /**
     * Initialise message header creator.
     *
     * @class AppMessageHeaderCreator
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean {
        if (this.__initialised) {

        }
        else {
            // 20201228 -Fixed Angular Webpack not support dynamic require
            // Load additional message header modules
            // Angular Webpack does not suipport require using string based variable
            // Cause Module not found.
            // this.messageHeaders = {
            //     ...MessageHeaders,
            //     ...load(Config.messageHeaderModule()) as object
            // };
            this.messageHeaders = {
                ...MessageHeaders,
                //...MessageHeadersExtend
            };
            this.__initialised = true;
            // End 20201228 -Fixed Angular Webpack not support dynamic require
        }
        return true;
    }

    /**
     * Create new message header instance.
     *
     * @class AppMessageHeaderCreator
     * @method new
     * @param alias {MessageType} - Message header class alias name.
     * @param options {any} - Message header options. 
     * @return {AppMessageHeader} - Message .
     */
    public static new(alias: MessageType, options?: any): AppMessageHeader {
        try {
            this.initialise();  // 20201228 -Fixed Angular Webpack not support dynamic require
            return new this.messageHeaders[alias](options);
        }
        catch (e) {
            throw "Message header: Alias name '" + alias + "' not found.\n" + e;
        }
    }

    /**
     * Create new message header.
     *
     * @class AppMessageHeaderCreator
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @param options {any} - Message header options. 
     * @return {Header} - Message header.
     */
    public static create(messageParameter: MessageParameter,
        options?: any): Header {
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
 * Create new app message header.
 *
 * @function createMessageHeader
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @param options {any} - Message header options. 
 * @return {Header} - New app message header.
 */
export function createMessageHeader(messageParameter: MessageParameter,
    options?: any): Header {
    try {
        return AppMessageHeaderCreator.create(messageParameter, options);
    }
    catch (e) {
        throw e;
    }
}

