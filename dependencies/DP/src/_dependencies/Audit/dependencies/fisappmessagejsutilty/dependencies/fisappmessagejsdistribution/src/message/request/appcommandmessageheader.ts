/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, GenericHeader, GenericHeaderOf, AppMessageHeaderOptions,
    CommandMessageHeader, CommandMessageParameter as MessageParameter
} from './apprequestmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';

/**
 * App command message header.
 *
 * @class AppCommandMessageHeader
 */
export class AppCommandMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app command message header.
     *
     * @class AppCommandMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        // App message base header type is Request.
        this.messageBaseHeaderType = AppMessageType.Request;
        this.messageType = AppMessageType.Command;
    }

    /**
     * Create new command header.
     *
     * @class AppCommandMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {CommandMessageHeader} - New command header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: CommandMessageHeader = {} as CommandMessageHeader;
            header.command = (messageParameter && messageParameter.command);
            return header as GenericHeaderOf<CommandMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }
}
