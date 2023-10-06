/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, MessageProducerInformation } from '../../types/appmessagetype';
import { AppMessageProducer } from './appmessageproducer';
/**
 * App message producer creator.
 *
 * @class AppMessageProducerCreator
 */
export declare class AppMessageProducerCreator {
    /**
     * Initialise message producer creator.
     *
     * @class AppMessageProducerCreator
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean;
    /**
     * List of message producer objects
     *
     * @class AppMessageProducerCreator
     * @property messageProducers
     * @type {object}
     */
    static producers: object;
    /**
     * Initialise message producer creator.
     *
     * @class AppMessageProducerCreator
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean;
    /**
     * Create new message producer instance.
     *
     * @class AppMessageProducerCreator
     * @method new
     * @param alias {string} - Producer class alias name.
     * @param options {any} - Producer's options.
     * @return {AppMessageProducer} - Message producer instance.
     */
    static new(alias: string, options?: any): AppMessageProducer;
    /**
     * Create new message producer information.
     *
     * @class AppMessageProducerCreator
     * @method createProducerInformation
     * @param messageParameter {MessageParameter} - Message parameters.
     * @param options {any} - Producer's options.
     * @return {MessageProducerInformation} - Message producer information.
     */
    static create(messageParameter: MessageParameter, options?: any): MessageProducerInformation;
}
/**
 * Create producer informmation.
 *
 * @function createProducerInformation
 * @param messageParameter {MessageParameter} - Message parameters.
 * @param options {any} - Producer's options.
 * @return {MessageProducerInformation} - Producer information.
 */
export declare function createProducerInformation(messageParameter: MessageParameter, options?: any): MessageProducerInformation;
