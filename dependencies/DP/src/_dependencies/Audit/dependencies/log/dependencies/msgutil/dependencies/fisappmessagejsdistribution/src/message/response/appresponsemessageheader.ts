/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, MessageParameter,
    Header, GenericHeader, GenericHeaderOf,
    AppResponseMessageHeaderOptions as AppMessageHeaderOptions,
    RespondToMessageType, ResponseMessageHeader, ResponseHeader
} from './appresponsemessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
import { validateRespondToMessage } from './appresponsemessagevalidation';

/**
 * App response message header.
 *
 * @class AppResponseMessageHeader
 */
export class AppResponseMessageHeader extends AppMessageHeaderKind {
    /**
     * Respond to message validator.
     * 
     * @class AppResponseMessageHeader
     * @property respondToMessageValidator
     * @type {Function}
     */
    public respondToMessageValidator: Function = validateRespondToMessage;

    /**
     * Permissible respond to message types.
     * 
     * @class AppResponseMessageHeader
     * @property permissibleRespondToMessageType
     * @type {object}
     */
    public permissibleRespondToMessageType: object = RespondToMessageType;

    /**
     * Create new app response message header.
     *
     * @class AppResponseMessageHeader
     * @method constructor
     * @param options {AppMessageHeaderOptions} - Message options. 
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        this.messageType = AppMessageType.Response;

        if (options && options.permissibleRespondToMessageType) {
            this.permissibleRespondToMessageType = options.permissibleRespondToMessageType; //options.permissibleMessageType;
        }
    }

    /**
     * Create new response header.
     *
     * @class AppResponseMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ResponseMessageHeader} - New response header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: ResponseMessageHeader = {} as ResponseMessageHeader;
            header.requestMessageRespondTo = (messageParameter &&
                messageParameter.requestMessageRespondTo);
            return header as GenericHeaderOf<ResponseMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * Validate app message.
     *
     * @class AppResponseMessageHeader
     * @method validate
     * @param header {Header} - Message header. 
     * @return {boolean} - True = success, false = error.
     */
    validate(header: Header): boolean {
        let responseHeader: ResponseHeader = header as GenericHeaderOf<ResponseHeader>;
        try {
            super.validate(header);
            this.respondToMessageValidator(responseHeader.requestMessageRespondTo,
                this.permissibleMessageType, this.permissibleRespondToMessageType);
        }
        catch (e) {
            throw e;
        }
        return true;
    }

}
