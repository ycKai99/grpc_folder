/*!
 * fisjs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
export declare class FisMessage {
    messageId: string;
    messageType: string;
    requestType: string;
    requestName: string;
    dataSourceTiming: string;
    requesterId: string;
    userId: string;
    socialNetworkLoginId?: string;
    serviceInstanceId?: string;
    serviceId: string;
    operation: string;
    payload: any;
    response?: any;
    [propName: string]: any;
}
