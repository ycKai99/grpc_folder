/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
/**
 * Topic base.
 *
 * @interface TopicBase
 */
export interface TopicBase {
    /**
     * Topic Id.
     *
     * @interface TopicBase
     * @property topicId
     * @type {string}
     */
    topicId: string;
    /**
     * Topic Code.
     *
     * @interface TopicBase
     * @property topicCode
     * @type {string}
     */
    topicCode: string;
    /**
     * Topic Name.
     *
     * @interface TopicBase
     * @property topicName
     * @type {string}
     */
    topicName: string;
}
/**
 * App generic topic.
 * Generic topic is a set of properties with string Key of type unknown.
 *
 * @type GenericTopic
 */
export declare type GenericTopic = Record<string, unknown>;
/**
 * App generic topic of type.
 * Constructs a generic topic of type <T>.
 *
 * @type GenericTopicOf<T>
 */
export declare type GenericTopicOf<T> = {
    [P in keyof T]: T[P];
};
/**
 * Topic.
 * Topic base(TopicBase) plus generic topic(GenericTopic).
 *
 * @type Topic
 */
export declare type Topic = TopicBase & GenericTopic;
/**
 * Topic parameter.
 *
 * @interface TopicParameters
 */
export interface TopicParameters {
    /**
     * Topic Code.
     *
     * @interface TopicParameters
     * @property code
     * @type {string}
     */
    code: string;
    /**
     * Topic Name.
     *
     * @interface TopicParameters
     * @property came
     * @type {string}
     */
    name: string;
}
/**
 * Topic types
 *
 * @type TopicType
 */
export declare enum TopicType {
    Base = "Base",
    Microservice = "Microservice",
    MicroserviceNotification = "MicroserviceNotification"
}
