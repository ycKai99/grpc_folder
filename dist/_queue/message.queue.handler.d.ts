import { FisReadDataUtility, MessageTypeProfile, DataTypeProfile, BaseMessage } from "../_dependencies/DP/src/interface/export";
export declare enum MessageQueueState {
    "Start" = "Start",
    "Ignored" = "Ignored",
    "QueueForProcess" = "QueueForProcess",
    "Completed" = "Completed"
}
export declare class MessageQueueHandlerClass {
    private isLogAllMessages;
    queue: {
        [key: string]: MessageInQueueInterface;
    };
    queueDebug: {
        [key: string]: MessageInQueueInterface;
    };
    dataUtil: FisReadDataUtility;
    messageType: MessageTypeProfile;
    dataType: DataTypeProfile;
    /**
    * Add a message to queue at key.
    *
    * @param {string} key The key to insert the message
    * @param {BaseMessage} message Message format compliants to FisApp
    * @param {string[]} filterByResponseDataTypes An array of strings of data types names that you want to retain.
    */
    addQueue(key: string, message: BaseMessage, filterByResponseDataTypes?: string[]): void;
    checkExisted(key: string): boolean;
    getQueue(key: string): MessageInQueueInterface | null;
    getQueueMessages(): {
        [key: string]: MessageInQueueInterface;
    };
    getQueueMessage(key: string): BaseMessage;
}
export declare class MessageInQueueInterface {
    message: BaseMessage;
    data: object;
    date: string;
    times: number;
    state: MessageQueueState;
    processTag?: string;
}
export declare const notificationMessageQueueHandler: MessageQueueHandlerClass;
export declare const userSessionsMessageQueueHandler: MessageQueueHandlerClass;
export declare const serviceProviderMessageQueueHandler: MessageQueueHandlerClass;
export declare const requestMessageQueueHandler: MessageQueueHandlerClass;
export declare const responseMessageQueueHandler: MessageQueueHandlerClass;
export declare const serviceProviderMessageQueueHandler_ext: MessageQueueHandlerClass;
