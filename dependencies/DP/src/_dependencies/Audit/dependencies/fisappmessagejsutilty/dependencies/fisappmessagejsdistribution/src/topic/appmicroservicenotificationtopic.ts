/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericTopic, TopicType, TopicParameters } from './apptopictype';
import { AppTopicKind } from './apptopickind';

/**
 * App microservice notification topic.
 *
 * @class AppMicroserviceNotificationTopic
 */
export class AppMicroserviceNotificationTopic extends AppTopicKind {
    /**
     * Create new app microservice notification topic.
     *
     * @class AppMicroserviceNotificationTopic
     * @method constructor
     */
    constructor() {
        super();
        // App base topic type is Microservice.
        this.baseTopicType = TopicType.Microservice;
    }

    /**
     * Create new app microservice notification topic.
     *
     * @class AppMicroserviceNotificationTopic
     * @method createTopic
     * @param topicParameters {TopicParameters} - Topic parameters. 
     * @return {GenericTopic} - App microservice notification topic.
     */
    protected createTopic(topicParameters: TopicParameters): GenericTopic {
        return {};
    }
    
}
