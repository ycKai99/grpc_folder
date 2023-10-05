import { Schema } from 'jsonschema';
import { Message } from '../../types/appmessagetype';
export declare class AppMessageSchema {
    protected static __initialised: boolean;
    static schemaDefinitionPath: string;
    static schema: Schema;
    protected static initialise(): boolean;
    static loadSchema(schemaDefinitionPath: string): void;
    static validateSchema(message: Message): boolean;
}
export declare function validateSchema(message: Message): boolean;
