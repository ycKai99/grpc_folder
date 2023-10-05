/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    MessageHeader, Header, MessageType, AppMessageType, MessageParameter,
    AppMessageHeaderOptions
} from '../../types/appmessagetype';
import { AppMessageHeader } from './appmessageheader';
import { validateMessageHeader } from './appmessagevalidation';
import { createProducerInformation } from '../producer/appmessageproducercreator';
import { createSecurity } from '../security/appmessagesecurity';
import { createDataLocation } from './appmessagedatalocation';
import { createMessageFormat } from './appmessageformat';
import { Uuid, generateNewId } from '../../utils/idgenerator';

/**
 * App message common(base) header.
 *
 * @class AppMessageHeaderBase
 */
export class AppMessageHeaderBase implements AppMessageHeader {
    /**
     * App message header type.
     * 
     * @class AppMessageHeaderBase
     * @property messageType
     * @type {MessageType}
     */
    protected messageType: MessageType;

    /**
     * App message common(base) header options.
     * 
     * @class AppMessageHeaderBase
     * @property options
     * @type {AppMessageHeaderOptions}
     */
    public options: AppMessageHeaderOptions;

    /**
     * App Message common(base) Header validator.
     * 
     * @class AppMessageHeaderBase
     * @property headerValidator
     * @type {Function}
     */
    public headerValidator: Function = validateMessageHeader;

    /**
     * Permissible message types.
     * 
     * @class AppMessageHeaderBase
     * @property permissibleMessageType
     * @type {object}
     */
    public permissibleMessageType: object = AppMessageType;

    /**
     * App Message common(base) Header.
     * 
     * @class AppMessageHeaderBase
     * @property message
     * @type {MessageHeader}
     */
    protected header: MessageHeader;

    /**
     * Create new app message base header.
     *
     * @class AppMessageHeaderBase
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message header options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        this.messageType = AppMessageType.Base;
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
     * Create new app message common(base) header.
     *
     * @class AppMessageHeaderBase
     * @method creates
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {MessageHeader as Header} - App message header.
     */
    create(messageParameter: MessageParameter): Header {
        try {
            this.header = this.createHeader(messageParameter);
            this.header.messageProducerInformation = createProducerInformation(messageParameter);
            this.header.security = createSecurity(messageParameter);
            this.header.messageDataLocation = createDataLocation(messageParameter);
            this.header.messageDataFormat = createMessageFormat(messageParameter);
            this.validate(this.header);
            return this.header as Header;
        }
        catch (e) {
            throw this.messageType + " Message Header is not valid. " + e;
        }
    };

    /**
     * Validate app message header.
     *
     * @interface AppMessageHeaderBase
     * @method validate
     * @param header {MessageHeader} - Message header. 
     * @return {boolean} - True = success, false = error.
     */
    validate(header: MessageHeader): boolean {
        try {
            return this.headerValidator(header, this.permissibleMessageType);
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Create new message common(base)header.
     *
     * @class AppMessageHeaderBase
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {MessageHeader} - Message header.
     */
    protected createHeader(messageParameter: MessageParameter): MessageHeader {
        try {
            let header: MessageHeader = {} as MessageHeader;
            header.messageType = (messageParameter && messageParameter.messageType) || this.messageType;
            header.messageID = this.generateId();
            header.messageName = (messageParameter && messageParameter.messageName) ||
                "App " + header.messageType + " Message";
            header.dateCreated = new Date().toISOString();
            header.isAggregate = (messageParameter && messageParameter.isAggregate) || false;
            header.dataSourceTiming =  (messageParameter && messageParameter.dataSourceTiming) || "";
            header.serviceId =  (messageParameter && messageParameter.serviceId) || "";
            header.userId =  (messageParameter && messageParameter.userId) || "";
            header.requesterId = (messageParameter && messageParameter.requesterId) ||  ( "Generated"+this.generateId() );  
            return header;
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Generate new message id.
     *
     * @class AppMessageHeaderBase
     * @method generateId
     * @param  
     * @return {string} - New Id.
     */
    protected generateId(): string {
        try {
            return generateNewId(Uuid);
            // return new Uuid().generateId();
        }
        catch (e) {
            throw e;
        }
    }
}
