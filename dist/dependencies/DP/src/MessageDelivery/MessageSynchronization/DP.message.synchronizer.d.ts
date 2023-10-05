import { RequestMessage, ResponseMessage } from '../../_dependencies/FISAppMessageJSUtility/interface/export';
import { DomainProxyController } from '../MessageTransmission/DP.controller';
export declare class MessageSynchronisationClass {
    messagesStatusList: MessagesStatus;
    dpc: DomainProxyController;
    appName: string;
    setAppName(appName: string): void;
    setController(dpc: DomainProxyController): void;
    setupConsumer(ucpId: any, dpc?: DomainProxyController, appName?: string): void;
    protected consumer(msg: ResponseMessage): void;
    producer(msg: RequestMessage): void;
    findReference(id: any): number;
}
export type MessageStatus = {
    id: string;
    status: messageState;
};
export type MessagesStatus = MessageStatus[];
export declare enum messageState {
    started = "started",
    emitted = "emitted",
    clear = "clear"
}
