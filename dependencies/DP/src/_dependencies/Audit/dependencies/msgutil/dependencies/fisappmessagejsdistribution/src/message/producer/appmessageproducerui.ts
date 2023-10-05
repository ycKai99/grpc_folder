/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    MessageParameter, ProducerInformationUi,
    UserInterfaceComponentTypes
} from '../../types/appmessagetype';
import { AppMessageProducerKind } from './appmessageproducer';

/**
 * App message producer information is UI.
 *
 * @class AppMessageProducerUi
 */
export class AppMessageProducerUi extends AppMessageProducerKind {
    /**
     * Create producer information.
     *
     * @class AppMessageProducerUi
     * @method createProducer
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {ProducerInformationUi} - Message producer is UI.
     */
    public createProducer(messageParameter: MessageParameter): ProducerInformationUi {
        let producer: ProducerInformationUi = {} as ProducerInformationUi;
        return producer;
    }

    /**
     * Create components.
     *
     * @class AppMessageProducerUi
     * @method createComponent
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {UserInterfaceComponentTypesEnum} - Message producer component.
     */
    protected createComponent(messageParameter: MessageParameter): UserInterfaceComponentTypes {
        return UserInterfaceComponentTypes.Presentation;
    }
}
