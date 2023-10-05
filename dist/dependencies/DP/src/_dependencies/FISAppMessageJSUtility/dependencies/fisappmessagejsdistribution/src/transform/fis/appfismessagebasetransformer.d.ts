import { BaseMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformer } from '../appmessagetransformer';
import { FisMessage } from './fismessage';
export declare class AppFisMessageBaseTransformer implements AppMessageTransformer {
    transform(message: BaseMessage): FisMessage;
    validate(message: BaseMessage): boolean;
}
