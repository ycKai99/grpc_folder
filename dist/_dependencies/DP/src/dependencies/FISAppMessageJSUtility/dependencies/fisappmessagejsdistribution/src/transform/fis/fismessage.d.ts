/*!
 * fisjs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
/**
 * FIS message.
 *
 * @class FisMessage
 */
export declare class FisMessage {
    /**
     * Message Id.
     * Provided by requester.
     *
     * @property messageId
     * @type {string}
     */
    messageId: string;
    /**
     * Message type.
     * Provided by requester.
     *
     * @property messageType
     * @type {string}
     */
    messageType: string;
    /**
     * Request type.
     * Type:
     *  COMMAND - Request for command service.
     *  QUERY - Request for query service.
     *
     * Provided by requester.
     *
     * @property requestType
     * @type {string}
     */
    requestType: string;
    /**
     * Request name.
     * Provided by requester.
     *
     * @property requestName
     * @type {string}
     */
    requestName: string;
    /**
     * Data source timing.
     * Provided by requester.
     * i.e. EDIT(get data from editing cache)
     *
     * @property dataSourceTiming
     * @type {string}
     */
    dataSourceTiming: string;
    /**
     * Requester Id that send the message.
     * Provided by requester.
     *
     * @property requesterId
     * @type {string}
     */
    requesterId: string;
    /**
     * User Id that send the message.
     *
     * Provided by requester.
     *
     * @property userId
     * @type {string}
     */
    userId: string;
    /**
     * Social network user id that user log on.
     * Can be null and in which case user did not use social network user
     * id to log in but instead directly log on using FisApp user id.
     * Note that a client can be a daemon process and in which case it also
     * has a log in id.
     *
     * Provided by requester.
     *
     * @property socialNetworkLoginId
     * @type {string}
     */
    socialNetworkLoginId?: string;
    /**
     * FIS service instance id(mandatory).
     * FIS service delegator use the 'serviceInstanceId' to determine
     * the service instance to be invoked.
     * i.e. allow to create multiple instances of the serivce.
     * Provided by FIS. Send service intialise message to FIS.
     * Except serviceId 'FIS App' return service instance id after Login(Start).
     * All subsequent messages send to the service instance must include
     * service instance id in order to identify which service instance to receive
     * the messages.
     * If 'serviceInstanceID' is undefined then error
     * 'Unknown Service Instance Id'.
     *
     * @property serviceInstanceId
     * @type {string}
     */
    serviceInstanceId?: string;
    /**
     * FIS service to invoke(mandatory).
     * FIS service delegator use the 'serviceId' to determine
     * the service to be invoked.
     *
     * Provided by requester.
     *
     * @property serviceId
     * @type {string}
     */
    serviceId: string;
    /**
     * FIS service method to invoke(mandatory).
     *
     * Provided by requester.
     *
     * @property serviceId
     * @type {string}
     */
    operation: string;
    /**
     * Payload.
     * Provided by requester.
     * Data send to requested service.
     *
     * @property payload
     * @type {any}
     */
    payload: any;
    /**
     * Response.
     * Provided by requested service.
     * Response send from requested service:
     *  Result of requested service
     *  Error if requested service failed.
     *
     * @property response
     * @type {FisResponse|FisError}
     */
    response?: any;
    /**
     * Others user defined properties.
     *
     * @property []
     * @type {arrayAny}
     */
    [propName: string]: any;
}
