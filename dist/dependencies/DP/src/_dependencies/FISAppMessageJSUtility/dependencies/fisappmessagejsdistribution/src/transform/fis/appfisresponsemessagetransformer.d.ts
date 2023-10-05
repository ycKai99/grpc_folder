import { ResponseMessage } from '../../types/fisappmessageschema';
import { AppMessageTransformerKind } from '../appmessagetransformerkind';
import { FisMessage } from './fismessage';
export declare class AppFisResponseMessageTransformer extends AppMessageTransformerKind {
    constructor();
    protected transformExtensions(message: ResponseMessage): object;
}
export declare function transform(message: ResponseMessage): FisMessage;
