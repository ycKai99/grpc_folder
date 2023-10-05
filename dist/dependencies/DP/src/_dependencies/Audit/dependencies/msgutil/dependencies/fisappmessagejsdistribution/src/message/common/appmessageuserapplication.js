"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageUserApplication = exports.AppMessageUserApplication = exports.validate = void 0;
function validate(userApplication) {
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
exports.validate = validate;
class AppMessageUserApplication {
    create(messageParameter) {
        try {
            if (messageParameter && messageParameter.producer &&
                messageParameter.producer.origin &&
                messageParameter.producer.origin.userApplication) {
                this.userApplication = {};
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
exports.AppMessageUserApplication = AppMessageUserApplication;
function createMessageUserApplication(messageParameter) {
    try {
        return new AppMessageUserApplication().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessageUserApplication = createMessageUserApplication;
//# sourceMappingURL=appmessageuserapplication.js.map