/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageProducerInformation, MessageProducerInformationBase, MessageParameter, Component } from '../../types/appmessagetype';
/**
 * Validate app message origin.
 *
 * @function validate
 * @param origin {MessageProducerInformationBase} - Message origin.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateOrigin(origin: MessageProducerInformationBase): boolean;
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
export declare abstract class AppMessageProducerKind implements AppMessageProducer {
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
    create(messageParameter: MessageParameter): MessageProducerInformation;
    /**
     * Create producer information.
     *
     * @class AppMessageProducerKind
     * @method createProducer
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ProducerInformation} - Message producer information.
     */
    protected abstract createProducer(messageParameter: MessageParameter): MessageProducerInformation;
    /**
     * Create location of source program that generated this message.
     *
     * @class AppMessageProducerKind
     * @method createOrigin
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageProducerInformationBase} - Message producer information Base.
     */
    protected createOrigin(messageParameter: MessageParameter): MessageProducerInformationBase;
    /**
     * Create components.
     *
     * @class AppMessageProducerKind
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {Component} - Message producer component.
     */
    protected abstract createComponent(messageParameter: MessageParameter): Component;
}
