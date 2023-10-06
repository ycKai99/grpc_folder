"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecurity = exports.AppMessageSecurity = exports.validate = void 0;
/**
 * Validate app message security.
 *
 * @function validate
 * @param messageSecurity {MessageSecurity} - Message security.
 * @return {boolean} - True = success, false = error.
 */
function validate(messageSecurity) {
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
exports.validate = validate;
/**
 * App message security.
 *
 * @class AppMessageSecurity
 */
class AppMessageSecurity {
    /**
     * Create new message security.
     *
     * @class AppMessageSecurity
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {MessageSecurity} - Message security.
     */
    create(messageParameter) {
        try {
            this.messageSecurity = (messageParameter && messageParameter.security) || {};
            if (messageParameter && messageParameter.security) {
                this.messageSecurity = {};
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
exports.AppMessageSecurity = AppMessageSecurity;
/**
 * Create App message security.
 *
 * @function createSecurity
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {MessageSecurity} - Message security.
 */
function createSecurity(messageParameter) {
    try {
        return new AppMessageSecurity().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createSecurity = createSecurity;
//# sourceMappingURL=appmessagesecurity.js.map