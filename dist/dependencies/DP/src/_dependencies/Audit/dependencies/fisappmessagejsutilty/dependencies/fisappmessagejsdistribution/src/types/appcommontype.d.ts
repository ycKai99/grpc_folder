import { MessageProducerInformationBase } from './fisappmessageschema';
export declare enum ProducerType {
    AppServer = "AppServer",
    SystemServer = "SystemServer",
    UI = "UI"
}
export interface Producer {
    type: ProducerType;
    origin: MessageProducerInformationBase;
}
