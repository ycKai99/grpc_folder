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
export function validate(userApplication: UserApplication): boolean {
    try {
        if (!userApplication) {
            throw "User Application is undefined or null.";
        }
        else if (Object.keys(userApplication).length < 1) {
            throw "User Application is empty.";
        }
        else if (!userApplication.userAppId || userApplication.userAppId.trim().length < 1) {
            throw "'User Application Id' is unknown or blank..";
        }
        else if (!userApplication.userAppName || userApplication.userAppName.trim().length < 1) {
            throw "'User Application Name' is unknown or blank..";
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}

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
export class AppMessageUserApplication {
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
    public create(messageParameter: MessageParameter): UserApplication {
        try {
            if (messageParameter && messageParameter.producer &&
                messageParameter.producer.origin &&
                messageParameter.producer.origin.userApplication) {
                this.userApplication = {} as UserApplication;

                if (messageParameter.producer.origin.userApplication.userAppId) {
                    this.userApplication.userAppId = messageParameter.producer.origin.userApplication.userAppId;
                }
                if (messageParameter.producer.origin.userApplication.userAppName) {
                    this.userApplication.userAppName = messageParameter.producer.origin.userApplication.userAppName;
                }
            }
            validate(this.userApplication);
            return this.userApplication;
        }
        catch (e) {
            throw "User application is not valid.\n" + e;
        }
    }
}

/**
 * Create App message user application.
 *
 * @function createMessageUserApplication
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {UserApplication} - Message user application.
 */
export function createMessageUserApplication(messageParameter: MessageParameter): UserApplication {
    try {
        return new AppMessageUserApplication().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
