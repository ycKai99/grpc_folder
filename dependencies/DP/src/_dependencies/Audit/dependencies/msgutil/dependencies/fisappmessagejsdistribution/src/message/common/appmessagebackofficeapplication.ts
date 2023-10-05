/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { BackOfficeApplication, MessageParameter } from '../../types/appmessagetype';

/**
 * App message back office application.
 * Various ERP system running on the server side. 
 * Example FisBackOffice, FisEcommerce etc
 *
 * @class AppMessageBackOfficeApplication
 */
export class AppMessageBackOfficeApplication {
    /**
     * App message back office application.
     * 
     * @class AppMessageBackOfficeApplication
     * @property backOfficeApplication
     * @type {BackOfficeApplication} - Message back office application.
     */
    protected backOfficeApplication: BackOfficeApplication;

    /**
     * Create new message back office application.
     *
     * @class AppMessageBackOfficeApplication
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {BackOfficeApplication} - Message back office application.
     */
    public create(messageParameter: MessageParameter): BackOfficeApplication {
        try {
            this.backOfficeApplication = {} as BackOfficeApplication;
            this.backOfficeApplication.backOfficeAppId = "";
            this.backOfficeApplication.backOfficeAppName = "";
            return this.backOfficeApplication;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create App message back office application.
 *
 * @function createMessageBackOfficeApplication
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {BackOfficeApplication} - Message back office application.
 */
export function createMessageBackOfficeApplication(messageParameter: MessageParameter): BackOfficeApplication {
    try {
        return new AppMessageBackOfficeApplication().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
