/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { UserApplication, MessageParameter } from '../../types/appmessagetype';
/**
 * Validate app message user application.
 *
 * @function validate
 * @param userApplication {UserApplication} - User application.
 * @return {boolean} - True = success, false = error.
 */
export declare function validate(userApplication: UserApplication): boolean;
/**
 * App message user application.
 * Applications as login by user. Is a logical application with a
 * collection of programs to perform some related business functions.
 * It referrrs to one or more back office applications under the
 * User-BackOffice relationship entity. Example, FisPayment,
 * PlantationFiledApp, FisSalesForce.
 *
 * @class AppMessageUserApplication
 */
export declare class AppMessageUserApplication {
    /**
     * App message user application.
     *
     * @class AppMessageUserApplication
     * @property userApplication
     * @type {UserApplication} - Message user application.
     */
    protected userApplication: UserApplication;
    /**
     * Create new message user application.
     *
     * @class AppMessageUserApplication
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {UserApplication} - Message user application.
     */
    create(messageParameter: MessageParameter): UserApplication;
}
/**
 * Create App message user application.
 *
 * @function createMessageUserApplication
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {UserApplication} - Message user application.
 */
export declare function createMessageUserApplication(messageParameter: MessageParameter): UserApplication;
