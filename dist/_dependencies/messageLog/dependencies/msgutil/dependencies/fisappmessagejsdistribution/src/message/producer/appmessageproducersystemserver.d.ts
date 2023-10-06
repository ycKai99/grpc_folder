/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter, ProducerInformationSystemServer, SystemServers } from '../../types/appmessagetype';
import { AppMessageProducerKind } from './appmessageproducer';
/**
 * App message producer is System Server.
 *
 * @class AppMessageProducerSystemServer
 */
export declare class AppMessageProducerSystemServer extends AppMessageProducerKind {
    /**
     * Create producer information is System Server.
     *
     * @class AppMessageProducerSystemServer
     * @method createProducer
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {ProducerInformationSystemServer} - Message producer is System Server.
     */
    createProducer(messageParameter: MessageParameter): ProducerInformationSystemServer;
    /**
     * Create components.
     *
     * @class AppMessageProducerSystemServer
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters.
     * @return {SystemServers} - Message producer component.
     */
    protected createComponent(messageParameter: MessageParameter): SystemServers;
}
