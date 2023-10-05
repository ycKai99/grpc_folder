import { MessageProducerInformation, MessageProducerInformationBase, MessageParameter, Component } from '../../types/appmessagetype';
export declare function validateOrigin(origin: MessageProducerInformationBase): boolean;
export interface AppMessageProducer {
    create(messageParameter: MessageParameter): MessageProducerInformation;
}
export declare abstract class AppMessageProducerKind implements AppMessageProducer {
    protected messageProducerInformation: MessageProducerInformation;
    create(messageParameter: MessageParameter): MessageProducerInformation;
    protected abstract createProducer(messageParameter: MessageParameter): MessageProducerInformation;
    protected createOrigin(messageParameter: MessageParameter): MessageProducerInformationBase;
    protected abstract createComponent(messageParameter: MessageParameter): Component;
}
