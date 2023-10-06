"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageBackOfficeApplication = exports.AppMessageBackOfficeApplication = void 0;
/**
 * App message back office application.
 * Various ERP system running on the server side.
 * Example FisBackOffice, FisEcommerce etc
 *
 * @class AppMessageBackOfficeApplication
 */
class AppMessageBackOfficeApplication {
    /**
     * Create new message back office application.
     *
     * @class AppMessageBackOfficeApplication
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {BackOfficeApplication} - Message back office application.
     */
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
/**
 * Create App message back office application.
 *
 * @function createMessageBackOfficeApplication
 * @param messageParameter {MessageParameter} - Message parameters.
 * @return {BackOfficeApplication} - Message back office application.
 */
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