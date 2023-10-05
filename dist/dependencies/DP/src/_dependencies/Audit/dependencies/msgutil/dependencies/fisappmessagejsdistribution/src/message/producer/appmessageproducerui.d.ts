import { MessageParameter, ProducerInformationUi, UserInterfaceComponentTypes } from '../../types/appmessagetype';
import { AppMessageProducerKind } from './appmessageproducer';
export declare class AppMessageProducerUi extends AppMessageProducerKind {
    createProducer(messageParameter: MessageParameter): ProducerInformationUi;
    protected createComponent(messageParameter: MessageParameter): UserInterfaceComponentTypes;
}
