import { MessageParameter, GenericHeader, AppMessageHeaderOptions } from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
export declare class AppResponseDataMessageHeader extends AppMessageHeaderKind {
    constructor(options?: AppMessageHeaderOptions);
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
