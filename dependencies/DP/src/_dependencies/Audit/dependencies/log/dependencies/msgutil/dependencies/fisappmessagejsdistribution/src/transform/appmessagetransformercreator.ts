
/*!
 * fisappmessage transformerjs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message } from '../types/appmessagetype';
import { AppMessageTransformer } from './appmessagetransformer';
import * as Transformers from './transformers';
// 20201228 -Fixed Angular Webpack not support dynamic require
// import { load } from '../utils/moduleloader';
// import { Config } from '../config/config';
import * as TransformersExtend from '../transformers.config';
// End 20201228 -Fixed Angular Webpack not support dynamic require

export type DefaultModule = typeof Transformers;

/**
 * App message transformer creator.
 *
 * @class AppMessageTransformerCreator
 */
export class AppMessageTransformerCreator {
    /**
     * Initialise message transformer creator.
     * 
     * @class AppMessageTransformerCreator
     * @property __initialised
     * @type {boolean}
     */
    // 20201228 -Fixed Angular Webpack not support dynamic require
    // protected static __initialised: boolean = AppMessageTransformerCreator.initialise();
    protected static __initialised: boolean;
    // End 20201228 -Fixed Angular Webpack not support dynamic require

    /**
     * List of message transformer objects
     * 
     * @class AppMessageTransformerCreator
     * @property message transformers
     * @type {object}
     */
    static transformers: object;

    /**
     * Initialise message transformer creator.
     *
     * @class AppMessageTransformerCreator
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean {
        if (this.__initialised) {

        }
        else {
            // 20201228 -Fixed Angular Webpack not support dynamic require
            // Load additional message transformer modules
            // Angular Webpack does not suipport require using string based variable
            // Cause Module not found.
            // this.transformers = {
            //     ...Transformers,
            //     ...load(Config.messageTransformerModule()) as object
            // };
            this.transformers = {
                ...Transformers,
                ...TransformersExtend
            };
            this.__initialised = true;
            // End 20201228 -Fixed Angular Webpack not support dynamic require
        }
        return true;
    }

    /**
     * Create new message transformer instance.
     *
     * @class AppMessageTransformerCreator
     * @method new
     * @param alias {string} -  Transformer class alias name.
     * @param options {any} - Transformer options. 
     * @return {AppMessageTransformer} - App message transformer instance.
     */
    public static new(alias: string, options?: any): AppMessageTransformer {
        try {
            this.initialise();  // 20201228 -Fixed Angular Webpack not support dynamic require
            return new this.transformers[alias](options);
        }
        catch (e) {
            throw "Transformer alias name '" + alias + "' not found.\n" + e;
        }
    }

    /**
     * Transform message.
     *
     * @class AppMessageTransformerCreator
     * @method transform
     * @param message {Message} - Message. 
     * @param alias {string} -  Transformer class alias name.
     * @param options {any} - Transformer options. 
     * @return {object} - Output object.
     */
    public static transform(message: Message, options?: any): object {
        try {
            return this.new(
                (message && message.header && message.header.messageType),
                options).transform(message);
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Transform message.
 *
 * @function transform
 * @param message {Message} - Message parameters. 
 * @param options {any} - Transformer options. 
 * @return {object} - Output object.
 */
export function transform(message: Message, options?: any): object {
    try {
        return AppMessageTransformerCreator.transform(message, options);
    }
    catch (e) {
        throw e;
    }
}
