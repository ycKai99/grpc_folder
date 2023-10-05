import { MessageParameter } from '../types/appmessagetype';
import { TopicParameters } from './apptopictype';
export interface TopicMessageParameter extends MessageParameter {
    topicParameter: TopicParameters;
}
