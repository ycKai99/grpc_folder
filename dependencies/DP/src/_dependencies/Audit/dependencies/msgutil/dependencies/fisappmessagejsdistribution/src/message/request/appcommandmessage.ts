/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    Message, AppMessageType, CommandMessage, AppMessageHeaderOptions,
    CommandMessageParameter as MessageParameter
} from './apprequestmessagetype';
import { AppMessageKind } from '../common/appmessagekind';

/**
 * App command message.
 *
 * @class AppCommandMessage
 */
export class AppCommandMessage extends AppMessageKind {
    /**
     * Create new app command message.
     *
     * @class AppCommandMessage
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Command;
    }

    /**
     * App command Message.
     * 
     * @class AppCommandMessage
     * @property commandMessage
     * @type {CommandMessage} - App command Message.
     */
    protected commandMessage: CommandMessage;

    /**
     * Create new command message.
     *
     * @class AppCommandMessage
     * @method createMessage
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {CommandMessage} - New command message.
     */
    protected createMessage(messageParameter: MessageParameter): CommandMessage {
        try {
            this.commandMessage = {} as CommandMessage;
            return this.commandMessage;
        }
        catch (e) {
            throw e;
        }
    }
}

/**
 * Create new App command message.
 *
 * @function createCommandMessage
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {Message} - App command message.
 */
export function createCommandMessage(messageParameter: MessageParameter): Message {
    try {
        return new AppCommandMessage().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}