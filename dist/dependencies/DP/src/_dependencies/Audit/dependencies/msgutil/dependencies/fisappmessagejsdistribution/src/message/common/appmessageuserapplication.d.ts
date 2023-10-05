import { UserApplication, MessageParameter } from '../../types/appmessagetype';
export declare function validate(userApplication: UserApplication): boolean;
export declare class AppMessageUserApplication {
    protected userApplication: UserApplication;
    create(messageParameter: MessageParameter): UserApplication;
}
export declare function createMessageUserApplication(messageParameter: MessageParameter): UserApplication;
