import { GenericHeader, AppMessageHeaderOptions, ResponseStatusMessageParameter as MessageParameter } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppResponseStatusMessageHeader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
