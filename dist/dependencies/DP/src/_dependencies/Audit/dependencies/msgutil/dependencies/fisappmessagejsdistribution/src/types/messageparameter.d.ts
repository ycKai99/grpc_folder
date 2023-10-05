import { MessageType, MessageSecurity, ExternalMessageLocation, MessageFormat, MessageDeliveryMode, ResponseRequirement } from './fisappmessageschema';
import { Producer } from './appcommontype';
export interface MessageParameter {
    messageType: MessageType;
    messageName: string;
    isAggregate: boolean;
    security: MessageSecurity;
    producer: Producer;
    dataLocation: ExternalMessageLocation;
    dataFormat: MessageFormat;
    deliveryMode?: MessageDeliveryMode;
    responseRequirement?: ResponseRequirement;
    requesterId?: string;
    instanceId?: string;
    serviceId?: string;
    userId?: string;
    dataSourceTiming?: string;
    data: any;
}
