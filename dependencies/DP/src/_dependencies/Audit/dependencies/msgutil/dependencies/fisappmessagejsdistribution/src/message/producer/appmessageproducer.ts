/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    MessageProducerInformation, MessageProducerInformationBase,
    MessageParameter, Component
} from '../../types/appmessagetype';
import { createMessageUserApplication } from '../common/appmessageuserapplication';

/**
 * Validate app message origin.
 *
 * @function validate
 * @param origin {MessageProducerInformationBase} - Message origin. 
 * @return {boolean} - True = success, false = error.
 */
export function validateOrigin(origin: MessageProducerInformationBase): boolean {
    try {
        if (!origin) {
            throw "Message origin is undefined or null.";
        }
        else if (Object.keys(origin).length < 1) {
            throw "Message origin is empty.";
        }
        // else if (!origin.programID || origin.programID.trim().length < 1) {
        //     throw "'Program Id' is unknown or blank.";
        // }
    }
    catch (e) {
        throw e;
    }
    return true;
}

/**
 * App message producer.
 *
 * @interface AppMessageProducer
 */
export interface AppMessageProducer {
    /**
     * App message producer.
     *
     * @interface AppMessageProducer
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {Message} - App message.
     */
    create(messageParameter: MessageParameter): MessageProducerInformation;
}

/**
 * App message producer kind of information.
 *
 * @class AppMessageProducerKind
 */
export abstract class AppMessageProducerKind implements AppMessageProducer {
    /**
     * App message producer information.
     * 
     * @property messageProducerInformation
     * @type {MessageProducerInformation}
     */
    protected messageProducerInformation: MessageProducerInformation;

    /**
     * Create new message producer information.
     *
     * @class AppMessageProducerKind
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {MessageProducerInformation} - Message producer information.
     */
    public create(messageParameter: MessageParameter): MessageProducerInformation {
        try {
            this.messageProducerInformation = this.createProducer(messageParameter);
            this.messageProducerInformation.origin = this.createOrigin(messageParameter);
            this.messageProducerInformation.components = this.createComponent(messageParameter);
            return this.messageProducerInformation;
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Create producer information.
     *
     * @class AppMessageProducerKind
     * @method createProducer
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ProducerInformation} - Message producer information.
     */
    protected abstract createProducer(messageParameter: MessageParameter): MessageProducerInformation

    /**
     * Create location of source program that generated this message.
     *
     * @class AppMessageProducerKind
     * @method createOrigin
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {MessageProducerInformationBase} - Message producer information Base.
     */
    protected createOrigin(messageParameter: MessageParameter): MessageProducerInformationBase {

        try {
            let origin: MessageProducerInformationBase = {} as MessageProducerInformationBase;
            origin.userApplication = createMessageUserApplication(messageParameter);

            if (messageParameter && messageParameter.producer &&
                messageParameter.producer.origin) {
                if (messageParameter.producer.origin.appArchitectureTiers) {
                    origin.appArchitectureTiers = messageParameter.producer.origin.appArchitectureTiers;
                }
                if (messageParameter.producer.origin.messageFactoryType) {
                    origin.messageFactoryType = messageParameter.producer.origin.messageFactoryType;
                }
                if (messageParameter.producer.origin.programID) {
                    origin.programID = messageParameter.producer.origin.programID;
                }
                if (messageParameter.producer.origin.programName) {
                    origin.programName = messageParameter.producer.origin.programName;
                }
            }
            validateOrigin(origin);
            return origin;
        }
        catch (e) {
            throw "Producer information is not valid.\n" + e;
        }
    }

    /**
     * Create components.
     *
     * @class AppMessageProducerKind
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {Component} - Message producer component.
     */
    protected abstract createComponent(messageParameter: MessageParameter): Component

}
