import { MessageParameter, ProducerInformationSystemServer, SystemServers } from '../../types/appmessagetype';
import { AppMessageProducerKind } from './appmessageproducer';
export declare class AppMessageProducerSystemServer extends AppMessageProducerKind {
    createProducer(messageParameter: MessageParameter): ProducerInformationSystemServer;
    protected createComponent(messageParameter: MessageParameter): SystemServers;
}
