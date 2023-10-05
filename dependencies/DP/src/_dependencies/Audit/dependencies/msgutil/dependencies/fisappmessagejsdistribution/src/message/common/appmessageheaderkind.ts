/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    MessageType, AppMessageType, MessageParameter, GenericHeader, Header,
    AppMessageHeaderOptions
} from '../../types/appmessagetype';
import { AppMessageHeader } from './appmessageheader';
import { validateHeader, validateMessageHeader } from './appmessagevalidation';
import { createMessageHeader } from '../appmessageheadercreator';
import clone = require("rfdc");

/**
 * Abstract App message header.
 *
 * @class AppMessageHeaderKind
 */
export abstract class AppMessageHeaderKind implements AppMessageHeader {
    /**
     * App message header type.
     * 
     * @class AppMessageHeaderKind
     * @property messageType
     * @type {MessageType}
     */
    protected messageType: MessageType;

    /**
     * App message header options.
     * 
     * @class AppMessageHeaderKind
     * @property options
     * @type {AppMessageHeaderOptions}
     */
    public options: AppMessageHeaderOptions;

    /**
     * App Message Header validator.
     * 
     * @class AppMessageHeaderKind
     * @property headerValidator
     * @type {Function}
     */
    public headerValidator: Function = validateMessageHeader;

    /**
     * Permissible message types.
     * 
     * @class AppMessageHeaderKind
     * @property permissibleMessageType
     * @type {object}
     */
    public permissibleMessageType: object = AppMessageType;

    /**
     * App message base header type.
     * Default is Base
     * 
     * @class AppMessageHeaderKind
     * @property messageBaseHeaderType
     * @type {MessageType}
     */
    protected messageBaseHeaderType: MessageType;

    /**
     * App message header.
     * 
     * @class AppMessageHeaderKind
     * @property message
     * @type {Header}
     */
    protected header: Header;

    /**
     * Create new app message header.
     *
     * @class AppMessageHeaderKind
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message header options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        // App message base header type. Default is Base
        this.messageBaseHeaderType = AppMessageType.Base;
        if (options) {
            this.options = options;
        }
        if (this.options && this.options.validator) {
            this.headerValidator = this.options.validator;
        }
        if (this.options && this.options.permissibleMessageType) {
            this.permissibleMessageType = this.options.permissibleMessageType;
        }
    }


    /**
     * Create new app message header.
     *
     * @class AppMessageHeaderKind
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {Header} - App message header.
     */
    create(messageParameter: MessageParameter): Header {
        try {
            let baseMessageParameter: MessageParameter;
            if (!messageParameter) { messageParameter = {} as MessageParameter };
            messageParameter.messageType = this.messageType;
            // baseMessageParameter = JSON.parse(JSON.stringify(messageParameter));//messageParameter   // deep copy;
            baseMessageParameter = clone()(messageParameter);
            baseMessageParameter.messageType = this.messageBaseHeaderType;
            this.header = {
                ...createMessageHeader(baseMessageParameter, this.options), //Base header
                ...this.createHeader(messageParameter)
            };
            this.header.messageType = this.messageType;
            this.validate(this.header);
            return this.header;
        }
        catch (e) {
            throw this.messageType + " Message Header is not valid.\n" + e;
        }
    }

    /**
     * Validate app message.
     *
     * @class AppMessageHeaderKind
     * @method validate
     * @param header {Header} - Message header. 
     * @return {boolean} - True = success, false = error.
     */
    validate(header: Header): boolean {
        try {
            this.headerValidator(header, this.permissibleMessageType);
            return validateHeader(header, this.messageType);
        }
        catch (e) {
            throw e;
        }
    }

    /**
    * Create new generic header.
    *
    * @class AppMessageHeaderKind
    * @method createHeader
    * @param messageParameter {MessageParameter} - Message parameters. 
    * @return {GenericHeader} - New generic header.
    */
    protected abstract createHeader(messageParameter: MessageParameter): GenericHeader

}
