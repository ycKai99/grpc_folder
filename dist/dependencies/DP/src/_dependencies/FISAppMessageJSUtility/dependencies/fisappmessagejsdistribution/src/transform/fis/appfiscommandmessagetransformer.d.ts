import { CommandMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';
export declare class AppFisCommandMessageTransformer extends AppMessageTransformerKind {
    constructor();
    protected transformExtensions(message: CommandMessage): object;
}
export declare function transform(message: CommandMessage): FisMessage;
