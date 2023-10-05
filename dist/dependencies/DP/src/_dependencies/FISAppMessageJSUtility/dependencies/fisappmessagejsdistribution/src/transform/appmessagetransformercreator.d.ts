import { Message } from '../types/appmessagetype';
import { AppMessageTransformer } from './appmessagetransformer';
import * as Transformers from './transformers';
export type DefaultModule = typeof Transformers;
export declare class AppMessageTransformerCreator {
    protected static __initialised: boolean;
    static transformers: object;
    protected static initialise(): boolean;
    static new(alias: string, options?: any): AppMessageTransformer;
    static transform(message: Message, options?: any): object;
}
export declare function transform(message: Message, options?: any): object;
