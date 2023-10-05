/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Message, MessageType } from '../types/appmessagetype';
import { validateMessage, validateMessageHeader } from '../message/common/appmessagevalidation';
import { AppMessageTransformer } from './appmessagetransformer';
import { transform } from './appmessagetransformercreator';
import clone = require("rfdc");  

/**
 * App message transformer.
 *
 * @class AppMessageTransformerKind
 */
export abstract class AppMessageTransformerKind implements AppMessageTransformer {
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
    public permissibleMessageType: MessageType;

    /**
     * Create new app message Transformer.
     *
     * @class AppMessageTransformerKind
     * @method constructor
     */
    constructor() {
    }

    /**
     * Transform app message.
     *
     * @class AppMessageTransformerKind
     * @method transform
     * @param message  {Message} - Message. 
     * @return {object} - Output object.
     */
    transform(message: Message): object {
        try {
            this.validate(message);
            return {
                ...this.transformBase(message),
                ...this.transformExtensions(message)
            };
        }
        catch (e) {
            throw "Transfroming '" +
            (message && message.header && message.header.messageType) +
            "' message.\n" + e;
        }
    }

    /**
     * Validate app message transformer.
     *
     * @class AppMessageTransformerKind
     * @method validate
     * @param message {Message} - Message. 
     * @return {boolean} - True = success, false = error.
     */
    validate(message: Message): boolean {
        try {
            if (validateMessage(message)) {
                return validateMessageHeader(message.header,
                    [this.permissibleMessageType]);
            };
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Transform app base message.
     *
     * @class AppMessageTransformerKind
     * @method transformBase
     * @param message  {Message} - Message. 
     * @return {object} - Output object.
     */
    protected transformBase(message: Message): object {
        try {
            let base: object;
            let baseMessage: Message;
            if (!message) { message = {} as Message };
            // baseMessage = JSON.parse(JSON.stringify(message));//{ ...message }; // deep copy
            baseMessage = clone()(message);
            if (this.baseTransformerType) {
                this.baseTransformerType.forEach((transformerType: MessageType) => {
                    baseMessage.header.messageType = transformerType;
                    base = { ...base, ...transform(baseMessage) }; //...transform(message, transformerType) };
                });
            }
            return base;
        }
        catch (e) {
            throw e;
        }
    }

    /**
    * Transform app message extensions.
    *
    * @class AppMessageTransformerKind
    * @method transformExtensions
    * @param message  {Message} - Message. 
    * @return {object} - Output object..
    */
    protected abstract transformExtensions(message: Message): object
}