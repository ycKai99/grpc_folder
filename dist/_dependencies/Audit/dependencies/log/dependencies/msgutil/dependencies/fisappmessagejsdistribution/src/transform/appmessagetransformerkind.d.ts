/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageType } from '../types/appmessagetype';
import { AppMessageTransformer } from './appmessagetransformer';
/**
 * App message transformer.
 *
 * @class AppMessageTransformerKind
 */
export declare abstract class AppMessageTransformerKind implements AppMessageTransformer {
    /**
     * List of app message base transformer.
     * Default is undefined.
     *
     * @class AppMessageTransformerKind
     * @property baseTransformerType
     * @type {MessageType[]}
     */
    protected baseTransformerType: MessageType[];
    /**
     * Permissible message types.
     *
     * @class AppMessageTransformerKind
     * @property permissibleMessageType
     * @type {MessageType}
     */
    permissibleMessageType: MessageType;
    /**
     * Create new app message Transformer.
     *
     * @class AppMessageTransformerKind
     * @method constructor
     */
    constructor();
    /**
     * Transform app message.
     *
     * @class AppMessageTransformerKind
     * @method transform
     * @param message  {Message} - Message.
     * @return {object} - Output object.
     */
    transform(message: Message): object;
    /**
     * Validate app message transformer.
     *
     * @class AppMessageTransformerKind
     * @method validate
     * @param message {Message} - Message.
     * @return {boolean} - True = success, false = error.
     */
    validate(message: Message): boolean;
    /**
     * Transform app base message.
     *
     * @class AppMessageTransformerKind
     * @method transformBase
     * @param message  {Message} - Message.
     * @return {object} - Output object.
     */
    protected transformBase(message: Message): object;
    /**
    * Transform app message extensions.
    *
    * @class AppMessageTransformerKind
    * @method transformExtensions
    * @param message  {Message} - Message.
    * @return {object} - Output object..
    */
    protected abstract transformExtensions(message: Message): object;
}
