/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericTopic, TopicParameters } from './apptopictype';
import { AppTopicKind } from './apptopickind';
/**
 * App microservice notification topic.
 *
 * @class AppMicroserviceNotificationTopic
 */
export declare class AppMicroserviceNotificationTopic extends AppTopicKind {
    /**
     * Create new app microservice notification topic.
     *
     * @class AppMicroserviceNotificationTopic
     * @method constructor
     */
    constructor();
    /**
     * Create new app microservice notification topic.
     *
     * @class AppMicroserviceNotificationTopic
     * @method createTopic
     * @param topicParameters {TopicParameters} - Topic parameters.
     * @return {GenericTopic} - App microservice notification topic.
     */
    protected createTopic(topicParameters: TopicParameters): GenericTopic;
}
