/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, QueryMessage, AppMessageHeaderOptions,
    QueryMessageParameter as MessageParameter
} from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App query message.
 *
 * @class AppQueryMessage
 */
export class AppQueryMessage extends AppMessageKind {
    /**
     * Create new app query message.
     *
     * @class AppQueryMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Query;
    }

    /**
     * App query Message.
     * 
     * @class AppQueryMessage
     * @property queryMessage
     * @type {QueryMessage} - App query Message.
     */
    protected queryMessage: QueryMessage;

    /**
     * Create new query message.
     *
     * @class AppQueryMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {QueryMessage} - New query message.
     */
    protected createMessage(messageParameter: MessageParameter): QueryMessage {
        try {
            this.queryMessage = {} as QueryMessage;
            return this.queryMessage;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new App query message.
 *
 * @function createQueryMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App query message.
 */
export function createQueryMessage(messageParameter: MessageParameter): Message {
    try {
        return new AppQueryMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
