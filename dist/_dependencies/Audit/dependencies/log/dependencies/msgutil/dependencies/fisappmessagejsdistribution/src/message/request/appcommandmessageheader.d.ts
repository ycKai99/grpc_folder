/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericHeader, AppMessageHeaderOptions, CommandMessageParameter as MessageParameter } from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
/**
 * App command message header.
 *
 * @class AppCommandMessageHeader
 */
export declare class AppCommandMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app command message header.
     *
     * @class AppCommandMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options.
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions);
    /**
     * Create new command header.
     *
     * @class AppCommandMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {CommandMessageHeader} - New command header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader;
}
