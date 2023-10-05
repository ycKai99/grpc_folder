"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageBackOfficeApplication = exports.AppMessageBackOfficeApplication = void 0;
class AppMessageBackOfficeApplication {
    create(messageParameter) {
        try {
            this.backOfficeApplication = {};
            this.backOfficeApplication.backOfficeAppId = "";
            this.backOfficeApplication.backOfficeAppName = "";
            return this.backOfficeApplication;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageBackOfficeApplication = AppMessageBackOfficeApplication;
function createMessageBackOfficeApplication(messageParameter) {
    try {
        return new AppMessageBackOfficeApplication().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessageBackOfficeApplication = createMessageBackOfficeApplication;
//# sourceMappingURL=appmessagebackofficeapplication.js.map