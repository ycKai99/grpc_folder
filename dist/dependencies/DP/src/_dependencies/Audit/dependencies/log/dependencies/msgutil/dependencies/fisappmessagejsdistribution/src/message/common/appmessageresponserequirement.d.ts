import { ResponseRequirement, MessageParameter } from '../../types/appmessagetype';
export declare function validate(responseRequirement: ResponseRequirement): boolean;
export declare class AppMessageResponseRequirement {
    protected responseRequirement: ResponseRequirement;
    create(messageParameter: MessageParameter): ResponseRequirement;
}
export declare function createMessageResponseRequirement(messageParameter: MessageParameter): ResponseRequirement;
