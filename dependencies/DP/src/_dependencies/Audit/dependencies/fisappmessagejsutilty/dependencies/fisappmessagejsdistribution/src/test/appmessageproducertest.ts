/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, FisAppServerComponents } from '../types/appmessagetype';
import { AppMessageProducerAppServer } from '../message/producer/appmessageproducerappserver';

/**
 * App message producer is App Server.
 *
 * @class AppMessageProducerAppServer
 */
export class AppMessageProducerAppTest extends AppMessageProducerAppServer {
    /**
     * Create components.
     *
     * @class AppMessageProducerBase
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {FisAppServerComponentsEnum} - Message producer component.
     */
    protected createComponent(messageParameter: MessageParameter): FisAppServerComponents {
        return  FisAppServerComponents.GlobalStore;
    }
}
