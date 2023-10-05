import { ModuleProfile } from '../types/appmessagetype';
export interface ModuleConfig {
    module?: string[];
    moduleProifle?: ModuleProfile[];
}
export interface SchemaConfig {
    definitionPath: string;
    validate?: {
        disableFormat?: boolean;
    };
}
export interface MessageHeaderConfig {
    module?: ModuleConfig;
}
export interface ProducerConfig {
    module?: ModuleConfig;
}
export interface ResponseMessageConfig {
    respondToMessage?: {
        messageType?: string[];
    };
}
export interface TopicConfig {
    module?: ModuleConfig;
}
export interface TransformerConfig {
    module?: ModuleConfig;
}
export interface MessageConfig {
    schema: SchemaConfig;
    module?: ModuleConfig;
    header?: MessageHeaderConfig;
    producer?: ProducerConfig;
    responseMessage?: ResponseMessageConfig;
    topic?: TopicConfig;
    transformer?: TransformerConfig;
}
export declare class Config {
    protected static __initialised: boolean;
    static defualtSchemaDefinitionPath: string;
    static messageConfig: MessageConfig;
    static messageHeaderConfig: MessageHeaderConfig;
    static messageProducerConfig: ProducerConfig;
    static schema: SchemaConfig;
    static responseMessageConfig: ResponseMessageConfig;
    static messageTopicConfig: TopicConfig;
    static messageTransformerConfig: TransformerConfig;
    protected static initialise(): boolean;
    protected static loadMessageConfig(): MessageConfig;
    static messageModule(): string[];
    static messageModuleProfile(): ModuleProfile[];
    protected static loadMessageHeaderConfig(): MessageHeaderConfig;
    static messageHeaderModule(): string[];
    static messageHeaderModuleProfile(): ModuleProfile[];
    protected static loadMessageProducerConfig(): ProducerConfig;
    static messageProducerModule(): string[];
    static messageProducerModuleProfile(): ModuleProfile[];
    protected static loadSchemaConfig(): SchemaConfig;
    static schemaDefinitionPath(): string;
    static schemaDisableFormat(): boolean;
    protected static loadResponseMessageConfig(): ResponseMessageConfig;
    static respondToMessageType(): string[];
    protected static loadMessageTopicConfig(): TopicConfig;
    static messageTopicModule(): string[];
    static messageTopicModuleProfile(): ModuleProfile[];
    protected static loadMessageTransformerConfig(): TransformerConfig;
    static messageTransformerModule(): string[];
    static messageTransformerModuleProfile(): ModuleProfile[];
}
