import { BackOfficeApplication, MessageParameter } from '../../types/appmessagetype';
export declare class AppMessageBackOfficeApplication {
    protected backOfficeApplication: BackOfficeApplication;
    create(messageParameter: MessageParameter): BackOfficeApplication;
}
export declare function createMessageBackOfficeApplication(messageParameter: MessageParameter): BackOfficeApplication;
