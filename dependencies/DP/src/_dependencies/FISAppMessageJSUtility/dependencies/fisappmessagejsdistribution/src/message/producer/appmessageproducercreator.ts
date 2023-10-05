
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, MessageProducerInformation } from '../../types/appmessagetype';
import { AppMessageProducer } from './appmessageproducer';
import * as Producers from './producers';
import { load } from '../../utils/moduleloader';
import { Config } from '../../config/config';

/**
 * App message producer creator.
 *
 * @class AppMessageProducerCreator
 */
export class AppMessageProducerCreator {
    /**
     * Initialise message producer creator.
     * 
     * @class AppMessageProducerCreator
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean = AppMessageProducerCreator.initialise();

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
    protected static initialise(): boolean {
        if (this.__initialised) {

        }
        else {
            // Load additional message producer modules
            this.producers = {
                ...Producers,
                ...load(Config.messageProducerModule()) as object
            };
        }
        return true;
    }

    /**
     * Create new message producer instance.
     *
     * @class AppMessageProducerCreator
     * @method new
     * @param alias {string} - Producer class alias name.
     * @param options {any} - Producer's options. 
     * @return {AppMessageProducer} - Message producer instance.
     */
    public static new(alias: string, options?: any): AppMessageProducer {
        try {
            return new this.producers[alias](options);
        }
        catch (e) {
            throw "Producer alias name '" + alias + "' not found.\n" + e;
        }
    }

    /**
     * Create new message producer information.
     *
     * @class AppMessageProducerCreator
     * @method createProducerInformation
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @param options {any} - Producer's options. 
     * @return {MessageProducerInformation} - Message producer information.
     */
    public static create(messageParameter: MessageParameter,
        options?: any): MessageProducerInformation {
        try {
            return this.new(
                (messageParameter && messageParameter.producer && messageParameter.producer.type),
                options).create(messageParameter);
        }
        catch (e) {
            throw e;
        }
    }
}


/**
 * Create producer informmation.
 *
 * @function createProducerInformation
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @param options {any} - Producer's options. 
 * @return {MessageProducerInformation} - Producer information.
 */
export function createProducerInformation(messageParameter: MessageParameter,
    options?: any): MessageProducerInformation {
    try {
        return AppMessageProducerCreator.create(messageParameter, options);
    }
    catch (e) {
        throw "Cannot set origin location(as in app architeture components) " +
        "where this message is created.\n" + e;
    }
}
