/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {
    AppMessageType, GenericHeader, GenericHeaderOf, AppMessageHeaderOptions,
    MicroserviceNotificationMessageHeader,
    MicroserviceNotificationMessageParameter as MessageParameter
} from './appnotificationmessagetype';
import { AppMessageHeaderKind } from '../common/appmessageheaderkind';
import { createTopic } from '../../topic/apptopiccreator';
import { TopicType, TopicParameters } from '../../topic/apptopictype';

/**
 * App microservice notification message header.
 *
 * @class AppMicroserviceNotificationMessageHeader
 */
export class AppMicroserviceNotificationMessageHeader extends AppMessageHeaderKind {
    /**
     * Create new app microservice notification message header.
     *
     * @class AppMicroserviceNotificationMessageHeader
     * @param options {AppMessageHeaderOptions} - Message header options. 
     * @method constructor
     */
    constructor(options?: AppMessageHeaderOptions) {
        super(options);
        // App message base header type is Notification.
        this.messageBaseHeaderType = AppMessageType.Notification;
        this.messageType = AppMessageType.MicroserviceNotification;
    }

    /**
     * Create new microservice notification header.
     *
     * @class AppMicroserviceNotificationMessageHeader
     * @method createHeader
     * @param messageParameter {MessageParameter} - Message parameters. 
     * @return {MicroserviceNotificationMessageHeader} - New microservice notification header.
     */
    protected createHeader(messageParameter: MessageParameter): GenericHeader {
        try {
            let header: MicroserviceNotificationMessageHeader = {} as MicroserviceNotificationMessageHeader;
            let topicParameters: TopicParameters = (messageParameter && messageParameter.topicParameter)
            header.microserviceTopic = createTopic(topicParameters, TopicType.MicroserviceNotification);
            return header as GenericHeaderOf<MicroserviceNotificationMessageHeader>;
        }
        catch (e) {
            throw e;
        }
    }
}
