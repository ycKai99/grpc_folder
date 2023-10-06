/*!
 * fisappmessage transformerjs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message } from '../types/appmessagetype';
import { AppMessageTransformer } from './appmessagetransformer';
import * as Transformers from './transformers';
export declare type DefaultModule = typeof Transformers;
/**
 * App message transformer creator.
 *
 * @class AppMessageTransformerCreator
 */
export declare class AppMessageTransformerCreator {
    /**
     * Initialise message transformer creator.
     *
     * @class AppMessageTransformerCreator
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean;
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
    protected static initialise(): boolean;
    /**
     * Create new message transformer instance.
     *
     * @class AppMessageTransformerCreator
     * @method new
     * @param alias {string} -  Transformer class alias name.
     * @param options {any} - Transformer options.
     * @return {AppMessageTransformer} - App message transformer instance.
     */
    static new(alias: string, options?: any): AppMessageTransformer;
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
    static transform(message: Message, options?: any): object;
}
/**
 * Transform message.
 *
 * @function transform
 * @param message {Message} - Message parameters.
 * @param options {any} - Transformer options.
 * @return {object} - Output object.
 */
export declare function transform(message: Message, options?: any): object;
