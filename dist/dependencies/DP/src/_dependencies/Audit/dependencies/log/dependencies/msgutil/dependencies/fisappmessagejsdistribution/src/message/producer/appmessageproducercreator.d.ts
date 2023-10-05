import { MessageParameter, MessageProducerInformation } from '../../types/appmessagetype';
import { AppMessageProducer } from './appmessageproducer';
export declare class AppMessageProducerCreator {
    protected static __initialised: boolean;
    static producers: object;
    protected static initialise(): boolean;
    static new(alias: string, options?: any): AppMessageProducer;
    static create(messageParameter: MessageParameter, options?: any): MessageProducerInformation;
}
export declare function createProducerInformation(messageParameter: MessageParameter, options?: any): MessageProducerInformation;
