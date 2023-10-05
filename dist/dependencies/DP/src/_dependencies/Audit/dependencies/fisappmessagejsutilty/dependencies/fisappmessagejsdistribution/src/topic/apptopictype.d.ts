/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
export interface TopicBase {
    topicId: string;
    topicCode: string;
    topicName: string;
}
export type GenericTopic = Record<string, unknown>;
export type GenericTopicOf<T> = {
    [P in keyof T]: T[P];
};
export type Topic = TopicBase & GenericTopic;
export interface TopicParameters {
    code: string;
    name: string;
}
export declare enum TopicType {
    Base = "Base",
    Microservice = "Microservice",
    MicroserviceNotification = "MicroserviceNotification"
}
