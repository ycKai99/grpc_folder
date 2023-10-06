"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageHeader = exports.AppMessageHeaderCreator = void 0;
const MessageHeaders = require("./messageheaders");
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
class AppMessageHeaderCreator {
    /**
     * Initialise message header creator.
     *
     * @class AppMessageHeaderCreator
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
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
            this.messageHeaders = Object.assign({}, MessageHeaders);
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
    static new(alias, options) {
        try {
            this.initialise(); // 20201228 -Fixed Angular Webpack not support dynamic require
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
    static create(messageParameter, options) {
        try {
            return this.new((messageParameter && messageParameter.messageType), options).create(messageParameter);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageHeaderCreator = AppMessageHeaderCreator;
/**
 * Create new app message header.
 *
 * @function createMessageHeader
 * @param messageParameter {MessageParameter} - Message parameters.
 * @param options {any} - Message header options.
 * @return {Header} - New app message header.
 */
function createMessageHeader(messageParameter, options) {
    try {
        return AppMessageHeaderCreator.create(messageParameter, options);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessageHeader = createMessageHeader;
//# sourceMappingURL=appmessageheadercreator.js.map