/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { ModuleProfile } from '../types/appmessagetype';
/**
 * Module configuration.
 *
 * @interface ModuleConfig
 */
export interface ModuleConfig {
    /**
     * List of modules.
     *
     * @property module
     * @type {string[]}
     */
    module?: string[];
    /**
     * List of modules profile.
     *
     * @property moduleProifle
     * @type {ModuleProfile[]}
     */
    moduleProifle?: ModuleProfile[];
}
/**
 * Schema configuration.
 *
 * @interface SchemaConfig
 */
export interface SchemaConfig {
    /**
     * Definition path.
     *
     * @property definitionPath
     * @type {string}
     */
    definitionPath: string;
    /**
     * Validation options.
     *
     * @property validate
     * @type {object}
     */
    validate?: {
        /**
         * Disable format validation.
         *
         * @property disableFormat
         * @type {boolean}
         */
        disableFormat?: boolean;
    };
}
/**
 * Message header configuration.
 *
 * @interface MessageHeaderConfig
 */
export interface MessageHeaderConfig {
    /**
     * Message header modules configuration.
     *
     * @property module
     * @type {ModuleConfig}
     */
    module?: ModuleConfig;
}
/**
 * Producer configuration.
 *
 * @interface ProducerConfig
 */
export interface ProducerConfig {
    /**
     * Producer modules configuration.
     *
     * @property module
     * @type {ModuleConfig}
     */
    module?: ModuleConfig;
}
/**
 * Response message configuration.
 *
 * @interface  ResponseMessageConfig
 */
export interface ResponseMessageConfig {
    /**
     * Respond to message configuration.
     *
     * @property respondToMessage
     * @type {object}
     */
    respondToMessage?: {
        /**
         * Respond to message type.
         *
         * @property messageType
         * @type {string[]}
         */
        messageType?: string[];
    };
}
/**
 * Topic configuration.
 *
 * @interface TopicConfig
 */
export interface TopicConfig {
    /**
     * Topic modules configuration.
     *
     * @property module
     * @type {ModuleConfig}
     */
    module?: ModuleConfig;
}
/**
 * Message Transformer configuration.
 *
 * @interface TransformerConfig
 */
export interface TransformerConfig {
    /**
     * Message Transformer modules configuration.
     *
     * @property module
     * @type {ModuleConfig}
     */
    module?: ModuleConfig;
}
/**
 * Message configuration.
 *
 * @interface MessageConfig
 */
export interface MessageConfig {
    /**
     * Schema configuration.
     *
     * @property schema
     * @type {SchemaConfig}
     */
    schema: SchemaConfig;
    /**
     * Message modules configuration.
     *
     * @property module
     * @type {ModuleConfig}
     */
    module?: ModuleConfig;
    /**
     * Message header configuration.
     *
     * @property header
     * @type {MessageHeaderConfig}
     */
    header?: MessageHeaderConfig;
    /**
     * Producer configuration.
     *
     * @property producer
     * @type {ProducerConfig}
     */
    producer?: ProducerConfig;
    /**
     * Response message configuration.
     *
     * @property responseMessage
     * @type {ResponseMessageConfig}
     */
    responseMessage?: ResponseMessageConfig;
    /**
     * Topic configuration.
     *
     * @property topic
     * @type {TopicConfig}
     */
    topic?: TopicConfig;
    /**
     * Message transformer configuration.
     *
     * @property transformer
     * @type {TransformerConfig}
     */
    transformer?: TransformerConfig;
}
/**
 * App message configuration.
 *
 * @class Config
 */
export declare class Config {
    /**
     * Initialise configuration.
     *
     * @class Config
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean;
    /**
     * Default schema definition path.
     *
     * @class Config
     * @property defualtSchemaDefinitionPath
     * @type {stirng}
     */
    static defualtSchemaDefinitionPath: string;
    /**
     * Message configuration
     *
     * @class Config
     * @property messageConfig
     * @type {MessageConfig}
     */
    static messageConfig: MessageConfig;
    /**
     * Message header configuration
     *
     * @class Config
     * @property messageHeaderConfig
     * @type {MessageHeaderConfig}
     */
    static messageHeaderConfig: MessageHeaderConfig;
    /**
     * Message producer configuration
     *
     * @class Config
     * @property messageProducerConfig
     * @type {ProducerConfig}
     */
    static messageProducerConfig: ProducerConfig;
    /**
     * Message schema configuration
     *
     * @class Config
     * @property schema
     * @type {SchemaConfig}
     */
    static schema: SchemaConfig;
    /**
     * Response message configuration
     *
     * @class Config
     * @property responseMessageConfig
     * @type {ResponseMessageConfig}
     */
    static responseMessageConfig: ResponseMessageConfig;
    /**
     * Message topic configuration
     *
     * @class Config
     * @property messageTopicConfig
     * @type {TopicConfig}
     */
    static messageTopicConfig: TopicConfig;
    /**
     * Message transformer configuration
     *
     * @class Config
     * @property messageTransformerConfig
     * @type {TransformerConfig}
     */
    static messageTransformerConfig: TransformerConfig;
    /**
     * Initialise configuration.
     *
     * @class Config
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean;
    /**
     * Load message configuration.
     *
     * @class Config
     * @method loadMessageConfig
     * @return {MessageConfig} - Message configuration.
     */
    protected static loadMessageConfig(): MessageConfig;
    /**
     * Message modules.
     *
     * @class Config
     * @method messageModule
     * @return {string[]} - List of modules.
     */
    static messageModule(): string[];
    /**
     * Message modules profile.
     *
     * @class Config
     * @method messageModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageModuleProfile(): ModuleProfile[];
    /**
     * Load message header configuration.
     *
     * @class Config
     * @method loadMessageHeaderConfig
     * @return {MessageHeaderConfig} - Message header configuration.
     */
    protected static loadMessageHeaderConfig(): MessageHeaderConfig;
    /**
     * Message header modules.
     *
     * @class Config
     * @method messageHeaderModule
     * @return {string[]} - List of modules.
     */
    static messageHeaderModule(): string[];
    /**
     * Message header modules profile.
     *
     * @class Config
     * @method messageHeaderModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageHeaderModuleProfile(): ModuleProfile[];
    /**
     * Load message producer configuration.
     *
     * @class Config
     * @method loadMessageProducerConfig
     * @return {MessageProducerConfig} - Message producer configuration.
     */
    protected static loadMessageProducerConfig(): ProducerConfig;
    /**
     * Message producer modules.
     *
     * @class Config
     * @method messageProducerModule
     * @return {string[]} - List of modules.
     */
    static messageProducerModule(): string[];
    /**
     * Message producer modules profile.
     *
     * @class Config
     * @method messageProducerModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageProducerModuleProfile(): ModuleProfile[];
    /**
     * Load message schema configuration.
     *
     * @class Config
     * @method loadSchemaConfig
     * @return {SchemaConfig} - Message schema configuration.
     */
    protected static loadSchemaConfig(): SchemaConfig;
    /**
     * Message schema definition path.
     *
     * @class Config
     * @method schemaDefinitionPath
     * @return {string} - Schema definition path.
     */
    static schemaDefinitionPath(): string;
    /**
     * Message schema disable format validation.
     *
     * @class Config
     * @method schemaDis
     * @return {boolean} - Disable format validation.
     */
    static schemaDisableFormat(): boolean;
    /**
     * Load response message configuration.
     *
     * @class Config
     * @method loadResponseMessageConfig
     * @return {ResponseMessageConfig} - Message header configuration.
     */
    protected static loadResponseMessageConfig(): ResponseMessageConfig;
    /**
     * Respond to message type.
     *
     * @class Config
     * @method respondToMessageType
     * @return {string[]} - List of response to message types.
     */
    static respondToMessageType(): string[];
    /**
     * Load message topic configuration.
     *
     * @class Config
     * @method loadMessageTopicConfig
     * @return {TopicConfig} - Message topic configuration.
     */
    protected static loadMessageTopicConfig(): TopicConfig;
    /**
     * Message topic modules.
     *
     * @class Config
     * @method messagwTopicModule
     * @return {string[]} - List of modules.
     */
    static messageTopicModule(): string[];
    /**
     * Message topic modules profile.
     *
     * @class Config
     * @method messageTopicModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageTopicModuleProfile(): ModuleProfile[];
    /**
     * Load message transformer configuration.
     *
     * @class Config
     * @method loadMessageTransformerConfig
     * @return {TransformerConfig} - Message transformer configuration.
     */
    protected static loadMessageTransformerConfig(): TransformerConfig;
    /**
     * Message transformer modules.
     *
     * @class Config
     * @method messagwTransformerModule
     * @return {string[]} - List of modules.
     */
    static messageTransformerModule(): string[];
    /**
     * Message transformer modules profile.
     *
     * @class Config
     * @method messageTransformerModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageTransformerModuleProfile(): ModuleProfile[];
}
