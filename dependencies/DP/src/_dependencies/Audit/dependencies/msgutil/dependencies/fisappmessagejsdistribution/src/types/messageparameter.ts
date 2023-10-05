/*!
 fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    MessageType, MessageSecurity, ExternalMessageLocation, MessageFormat,
    MessageDeliveryMode, ResponseRequirement
} from './fisappmessageschema';
import { Producer } from './appcommontype';

/**
 * Message parameter.
 * 
 * @interface MessageParameter 
 */
export interface MessageParameter {
    /**
     * Message type.
     * Message type to be created.
     * 
     * @interface MessageParameter
     * @property messageType
     * @type {string}
     */
    messageType: MessageType;

    /**
     * Message name.
     * Short description of this message.
     * 
     * @interface MessageParameter
     * @property messageName
     * @type {string}
     */
    messageName: string;

    /**
     * Aggregate message?.
     * Whether the message data is an aggregate of messages.
     * 
     * @interface MessageParameter
     * @property isAggregate
     * @type {boolean}
     */
    isAggregate: boolean;

    /**
     * Message security.
     * Authentication and authorization information.
     * 
     * @interface MessageParameter
     * @property security
     * @type {MessageSecurity}
     */
    security: MessageSecurity;

    /**
     * Message producer.
     * Origin location(as in app architeture components) where this message 
     * is created. Note that as message is passed to a component, 
     * a new message may be created to wrap around the first message.
     * 
     * @interface MessageParameter
     * @property producer
     * @type {Producer}
     */
    producer: Producer;

    /**
     * Message data location.
     * Compositable definition. Can be included in message header or message 
     * data. For non-embaded data, specific location where data can be read. 
     * Applicatiion for all message action type.
     *
     * @interface MessageParameter
     * @property dataLocation
     * @type {ExternalMessageLocation}
     */
    dataLocation: ExternalMessageLocation;

    /**
     * Message data format.
     * Compositable definition. Data message format details which is 
     * required in different types of messages. Format can be used 
     * (1) defining message when establishing commuincation protocal.  
     * (2) defining message data section. 
     * (3) defining a field in the message data section.
     * 
     * @interface MessageParameter
     * @property dataFormat
     * @type {MessageFormat}
     */
    dataFormat: MessageFormat;

    /**
     * Message delivery mode.
     * How message is to be delivered. Usually though not mendatory is as 
     * requested by client. If not specidied then leave to default transport 
     * handler. Applicable more for a requesting client message to specify 
     * how response messages should be delivered back.
     *
     * @interface MessageParameter
     * @property deliveryMode
     * @type {MessageDeliveryMode}
     */
    deliveryMode?: MessageDeliveryMode;

    /**
     * App message response requirement.
     * Client that request defines what sort of response expected.
     * App message response requirement details: 
     *  (1) How message is to be delivered.  
     *  (2) Message data format. 
     *  (3) Message data location.
     * 
     * @interface MessageParameter
     * @property responseRequirement
     * @type {ResponseRequirement} - Message response requirement.
     */
    responseRequirement?: ResponseRequirement;

    /** 
     * Requester Id that sends the message and used to identify an Fis application. 
     * This is the unique ID to identify the Fis user login session the message 
     * will be sent to. All subsequent messages sent from the same sender must 
     * use the same ID.
     * 
     * @interface FisMessageParameter
     * @property requesterId
     * @type {string}
     *  
     * Log:
     * // 2021-08-05 - fbl - Add requesterId
     */
     requesterId?: string;

    /**
     * Fis service instance id.
     * A FisApp generated reference ID to an instantiated service in Fis 
     * Back office server. Can be null if not applicable.
     * 
     * @interface FisMessageParameter
     * @property instanceId
     * @type {string}
     */
    instanceId?: string;

    /**
     * Fis service to invoke(mandatory).
     * 
     * @interface FisMessageParameter
     * @property serviceId
     * @type {string}
     */
    serviceId?: string;

    /**
     * Fis user id.
     * 
     * @interface FisMessageParameter
     * @property userId
     * @type {string}
     */
    userId?: string;

    /**
     * Fis data source timing. i.e. EDIT(get data from editing cache).
     * 
     * @interface FisMessageParameter
     * @property dataSourceTiming
     * @type {string}
     */
    dataSourceTiming?: string; 

    /**
     * Message payload data.
     * 
     * @interface MessageParameter
     * @property data
     * @type {any}
     */
    data: any;
}
