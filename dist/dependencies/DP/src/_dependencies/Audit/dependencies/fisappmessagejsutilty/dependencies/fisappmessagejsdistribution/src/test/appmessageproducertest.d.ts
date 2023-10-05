import { MessageParameter, FisAppServerComponents } from '../types/appmessagetype';
import { AppMessageProducerAppServer } from '../message/producer/appmessageproducerappserver';
export declare class AppMessageProducerAppTest extends AppMessageProducerAppServer {
    protected createComponent(messageParameter: MessageParameter): FisAppServerComponents;
}
