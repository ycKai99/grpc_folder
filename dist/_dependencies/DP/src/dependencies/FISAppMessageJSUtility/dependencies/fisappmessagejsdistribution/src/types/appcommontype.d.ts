/*!
 fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageProducerInformationBase } from './fisappmessageschema';
/**
 * Producer types
 *
 * @type ProducerType
 */
export declare enum ProducerType {
    AppServer = "AppServer",
    SystemServer = "SystemServer",
    UI = "UI"
}
/**
 * Message producer.
 * Origin location(as in app architeture components) where this message
 * is created. Note that as message is passed to a component,
 * a new message may be created to wrap around the first message.
 *
 * @interface Producer
 */
export interface Producer {
    /**
     * Producer type.
     * App architeture components where this message is created.
     *
     * @property type
     * @type {ProducerType}
     */
    type: ProducerType;
    /**
     * Origin.
     * Location of source program that generated this message.
     *
     * @property origin
     * @type {MessageProducerInformationBase}
     */
    origin: MessageProducerInformationBase;
}
