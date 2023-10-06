/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { ResponseRequirement, MessageParameter } from '../../types/appmessagetype';
/**
 * Validate app message response requirement.
 *
 * @function validate
 * @param responseRequirement {ResponseRequirement} - Message response requirement.
 * @return {boolean} - True = success, false = error.
 */
export declare function validate(responseRequirement: ResponseRequirement): boolean;
/**
 * App message response requirement.
 *
 * @class AppMessageResponseRequirement
 */
export declare class AppMessageResponseRequirement {
    /**
     * App message response requirement.
     *
     * @class AppMessageResponseRequirement
     * @property responseRequirement
     * @type {ResponseRequirement} - Message response requirement.
     */
    protected responseRequirement: ResponseRequirement;
    /**
     * Create new message response requirement.
     * Client that request defines what sort of response expected.
     * App message response requirement details:
     *  (1) How message is to be delivered.
     *  (2) Message data format.
     *  (3) Message data location.
     *
     * @class AppMessageResponseRequirement
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ResponseRequirement} - Message response requirement.
     */
    create(messageParameter: MessageParameter): ResponseRequirement;
}
/**
 * Create App message response requirement.
 *
 * @function createMessageResponseRequirement
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {ResponseRequirement} - Message response requirement.
 */
export declare function createMessageResponseRequirement(messageParameter: MessageParameter): ResponseRequirement;
