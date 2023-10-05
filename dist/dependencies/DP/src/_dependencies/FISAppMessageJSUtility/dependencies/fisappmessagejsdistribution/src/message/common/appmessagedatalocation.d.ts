import { ExternalMessageLocation, MessageParameter } from '../../types/appmessagetype';
export declare function validate(dataLocation: ExternalMessageLocation): boolean;
export declare class AppMessageDataLocation {
    protected messageDataLocation: ExternalMessageLocation;
    create(messageParameter: MessageParameter): ExternalMessageLocation;
}
export declare function createDataLocation(messageParameter: MessageParameter): ExternalMessageLocation;
