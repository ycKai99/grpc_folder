/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { ResponseRequirement, MessageParameter } from '../../types/appmessagetype';
import { createMessageDeliveryMode } from './appmessagedeliverymode';
import { createMessageFormat } from './appmessageformat';
import { createDataLocation } from './appmessagedatalocation'
import clone = require("rfdc");

/**
 * Validate app message response requirement.
 *
 * @function validate
 * @param responseRequirement {ResponseRequirement} - Message response requirement.
 * @return {boolean} - True = success, false = error.
 */
export function validate(responseRequirement: ResponseRequirement): boolean {
    try {
        // if (!responseRequirement) {
        //     throw "Message response requirement is undefined or null.";
        // }
        // else if (Object.keys(responseRequirement).length < 1) {
        //     throw "Message response requirement is empty.";
        // }
    }
    catch (e) {
        throw e;
    }
    return true;
}

/**
 * App message response requirement.
 *
 * @class AppMessageResponseRequirement
 */
export class AppMessageResponseRequirement {
    /**
     * App message response requirement.
     * 
     * @class AppMessageResponseRequirement
     * @property responseRequirement
     * @type {ResponseRequirement} - Message response requirement.
     */
    protected responseRequirement: ResponseRequirement;

    /**
     * Create new message response requirement.
     * Client that request defines what sort of response expected.
     * App message response requirement details: 
     *  (1) How message is to be delivered.  
     *  (2) Message data format. 
     *  (3) Message data location.
     * 
     * @class AppMessageResponseRequirement
     * @method create
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ResponseRequirement} - Message response requirement.
     */
    public create(messageParameter: MessageParameter): ResponseRequirement {
        try {
            if (messageParameter && messageParameter.responseRequirement) {
                // let tempMessageParameter: MessageParameter = JSON.parse(JSON.stringify(messageParameter));//messageParameter   // deep copy;
                let tempMessageParameter: MessageParameter = clone()(messageParameter);

                this.responseRequirement = {} as ResponseRequirement;

                if (messageParameter.responseRequirement.responseDeliveryMode) {
                    tempMessageParameter.deliveryMode = messageParameter.responseRequirement.responseDeliveryMode;
                    this.responseRequirement.responseDeliveryMode = createMessageDeliveryMode(tempMessageParameter);
                }
                if (messageParameter.responseRequirement.externalResponseLocation) {
                    tempMessageParameter.dataLocation = messageParameter.responseRequirement.externalResponseLocation;
                    this.responseRequirement.externalResponseLocation = createDataLocation(tempMessageParameter);
                }
                if (messageParameter.responseRequirement.responseDataFormat) {
                    tempMessageParameter.dataFormat = messageParameter.responseRequirement.responseDataFormat;
                    this.responseRequirement.responseDataFormat = createMessageFormat(tempMessageParameter);
                }
            }
            validate(this.responseRequirement);
            return this.responseRequirement;
        }
        catch (e) {
            throw "Message response requirement is not valid.\n" + e;
        }
    }
}

/**
 * Create App message response requirement.
 *
 * @function createMessageResponseRequirement
 * @param messageParameter {MessageParameter} - Message parameters. 
 * @return {ResponseRequirement} - Message response requirement.
 */
export function createMessageResponseRequirement(messageParameter: MessageParameter): ResponseRequirement {
    try {
        return new AppMessageResponseRequirement().create(messageParameter);
    }
    catch (e) {
        throw e;
    }
}
