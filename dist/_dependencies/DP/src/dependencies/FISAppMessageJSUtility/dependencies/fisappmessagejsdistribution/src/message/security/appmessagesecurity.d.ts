/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageSecurity, MessageParameter } from '../../types/appmessagetype';
/**
 * Validate app message security.
 *
 * @function validate
 * @param messageSecurity {MessageSecurity} - Message security.
 * @return {boolean} - True = success, false = error.
 */
export declare function validate(messageSecurity: MessageSecurity): boolean;
/**
 * App message security.
 *
 * @class AppMessageSecurity
 */
export declare class AppMessageSecurity {
    /**
     * App message security.
     *
     * @property messageSecurity
     * @type {MessageSecurity} - Message security.
     */
    protected messageSecurity: MessageSecurity;
    /**
     * Create new message security.
     *
     * @class AppMessageSecurity
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageSecurity} - Message security.
     */
    create(messageParameter: MessageParameter): MessageSecurity;
}
/**
 * Create App message security.
 *
 * @function createSecurity
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {MessageSecurity} - Message security.
 */
export declare function createSecurity(messageParameter: MessageParameter): MessageSecurity;
