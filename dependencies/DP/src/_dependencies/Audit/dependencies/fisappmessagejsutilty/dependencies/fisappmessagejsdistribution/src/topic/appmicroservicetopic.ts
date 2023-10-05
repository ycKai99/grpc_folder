/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { GenericTopic, TopicParameters } from './apptopictype';
import { AppTopicKind } from './apptopickind';

/**
 * App microservice topic.
 *
 * @class AppMicroserviceTopic
 */
export class AppMicroserviceTopic extends AppTopicKind {
    /**
     * Create new app microservice topic.
     *
     * @class AppMicroserviceTopic
     * @method createTopic
     * @param topicParameters {TopicParameters} - Topic parameters. 
     * @return {GenericTopic} - App microservice topic.
     */
    protected createTopic(topicParameters: TopicParameters): GenericTopic {
        return {};
    }
    
}
