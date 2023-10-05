import { QueryMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';
export declare class AppFisQueryMessageTransformer extends AppMessageTransformerKind {
    constructor();
    protected transformExtensions(message: QueryMessage): object;
}
export declare function transform(message: QueryMessage): FisMessage;
