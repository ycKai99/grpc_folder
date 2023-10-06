/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageFormat, MessageParameter } from '../../types/appmessagetype';
/**
 * Validate app message data format.
 *
 * @function validate
 * @param messageFormat {MessageFormat} - Message data format.
 * @return {boolean} - True = success, false = error.
 */
export declare function validate(messageFormat: MessageFormat): boolean;
/**
 * App message format.
 *
 * @class AppMessageFormat
 */
export declare class AppMessageFormat {
    /**
     * App message format.
     *
     * @class AppMessageFormat
     * @property messageFormat
     * @type {MessageFormat} - Message format.
     */
    protected messageFormat: MessageFormat;
    /**
     * Create new message format.
     * Compositable definition. Data message format details which is
     * required in different types of messages. Format can be used
     * (1) defining message when establishing commuincation protocal.
     * (2) defining message data section.
     * (3) defining a field in the message data section.
     *
     * @class AppMessageFormat
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageFormat} - Message format.
     */
    create(messageParameter: MessageParameter): MessageFormat;
}
/**
 * Create App message format.
 *
 * @function createMessageFormat
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {MessageFormat} - Message format.
 */
export declare function createMessageFormat(messageParameter: MessageParameter): MessageFormat;
