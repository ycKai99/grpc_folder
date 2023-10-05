import { MessageParameter, ProducerInformationAppServer, FisAppServerComponents } from '../../types/appmessagetype';
import { AppMessageProducerKind } from './appmessageproducer';
export declare class AppMessageProducerAppServer extends AppMessageProducerKind {
    protected createProducer(messageParameter: MessageParameter): ProducerInformationAppServer;
    protected createComponent(messageParameter: MessageParameter): FisAppServerComponents;
}
