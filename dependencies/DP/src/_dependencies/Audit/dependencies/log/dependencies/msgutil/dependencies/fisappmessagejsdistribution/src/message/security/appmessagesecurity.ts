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
export function validate(messageSecurity: MessageSecurity): boolean {
    try {
        if (!messageSecurity) {
            throw "Message Security is undefined or null.";
        }
        else if (Object.keys(messageSecurity).length < 1) {
            throw "Message Security is empty.";
        }
        else if (!messageSecurity.ucpId || messageSecurity.ucpId.trim().length < 1) {
            throw "'User Client Proxy Id' is unknown or blank..";
        }
    }
    catch (e) {
        throw e;
    }
    return true;
}
/**
 * App message security.
 *
 * @class AppMessageSecurity
 */
export class AppMessageSecurity {
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
    public create(messageParameter: MessageParameter): MessageSecurity {
        try {
            this.messageSecurity = (messageParameter && messageParameter.security) || {};

            if (messageParameter && messageParameter.security ) {
                this.messageSecurity = {} as MessageSecurity;

                if (messageParameter.security.applicationLogInID) {
                    this.messageSecurity.applicationLogInID = messageParameter.security.applicationLogInID;
                }
                if (messageParameter.security.applicationUserName) {
                    this.messageSecurity.applicationUserName = messageParameter.security.applicationUserName;
                }
                if (messageParameter.security.socialNetworkLoginID) {
                    this.messageSecurity.socialNetworkLoginID = messageParameter.security.socialNetworkLoginID;
                }
                if (messageParameter.security.socialNetworkUserName) {
                    this.messageSecurity.socialNetworkUserName = messageParameter.security.socialNetworkUserName;
                }
                if (messageParameter.security.ucpId) {
                    this.messageSecurity.ucpId = messageParameter.security.ucpId;
                }
            }
            validate(this.messageSecurity);
            return this.messageSecurity;
        }
        catch (e) {
            throw e;
        }
    }

}

/**
 * Create App message security.
 *
 * @function createSecurity
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {MessageSecurity} - Message security.
 */
export function createSecurity(messageParameter: MessageParameter): MessageSecurity {
    try {
        return new AppMessageSecurity().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
