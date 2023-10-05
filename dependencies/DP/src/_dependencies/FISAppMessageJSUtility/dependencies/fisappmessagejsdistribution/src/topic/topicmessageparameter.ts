/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageParameter } from '../types/appmessagetype';
import { TopicParameters } from './apptopictype';

/**
 * Topic message parameter.
 * Consists of:
 *  Base message parameter.
 *  Topic parameter.
 * 
 * @interface TopicMessageParameter 
 */
export interface TopicMessageParameter extends MessageParameter {
    /**
     * Topic parameter.
     * 
     * @interface TopicMessageParameter
     * @property topicParameter
     * @type {TopicParameters}
     */
    topicParameter: TopicParameters;
}