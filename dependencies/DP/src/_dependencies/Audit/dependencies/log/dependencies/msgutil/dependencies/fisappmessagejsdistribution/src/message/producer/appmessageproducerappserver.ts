/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    MessageParameter, ProducerInformationAppServer,
    FisAppServerComponents
} from '../../types/appmessagetype';
import { AppMessageProducerKind } from './appmessageproducer';

/**
 * App message producer is App Server.
 *
 * @class AppMessageProducerAppServer
 */
export class AppMessageProducerAppServer extends AppMessageProducerKind {
    /**
     * Create producer information is App Server.
     *
     * @class AppMessageProducerAppServer
     * @method createProducer
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ProducerInformationAppServer} - Message producer is App Server.
     */
    protected createProducer(messageParameter: MessageParameter): ProducerInformationAppServer {
        let producer: ProducerInformationAppServer = {} as ProducerInformationAppServer;
        return producer;
    }

    /**
     * Create components.
     *
     * @class AppMessageProducerBase
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {FisAppServerComponentsEnum} - Message producer component.
     */
    protected createComponent(messageParameter: MessageParameter): FisAppServerComponents {
        return FisAppServerComponents.BackOfficeApplication;
    }
}
