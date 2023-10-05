/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { ModuleProfile } from '../types/appmessagetype';
import * as Configuration from '../config.json';

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
export class Config {
    /**
     * Initialise configuration.
     *
     * @class Config
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean = Config.initialise();

    /**
     * Default schema definition path.
     * 
     * @class Config
     * @property defualtSchemaDefinitionPath
     * @type {stirng}
     */
    public static defualtSchemaDefinitionPath: string = "schema/FisAppMessageSchema.json";

    /**
     * Message configuration
     * 
     * @class Config
     * @property messageConfig
     * @type {MessageConfig}
     */
    public static messageConfig: MessageConfig;

    /**
     * Message header configuration
     * 
     * @class Config
     * @property messageHeaderConfig
     * @type {MessageHeaderConfig}
     */
    public static messageHeaderConfig: MessageHeaderConfig;

    /**
     * Message producer configuration
     * 
     * @class Config
     * @property messageProducerConfig
     * @type {ProducerConfig}
     */
    public static messageProducerConfig: ProducerConfig;

    /**
     * Message schema configuration
     * 
     * @class Config
     * @property schema
     * @type {SchemaConfig}
     */
    public static schema: SchemaConfig;

    /**
     * Response message configuration
     * 
     * @class Config
     * @property responseMessageConfig
     * @type {ResponseMessageConfig}
     */
    public static responseMessageConfig: ResponseMessageConfig;

    /**
     * Message topic configuration
     * 
     * @class Config
     * @property messageTopicConfig
     * @type {TopicConfig}
     */
    public static messageTopicConfig: TopicConfig;

    /**
     * Message transformer configuration
     * 
     * @class Config
     * @property messageTransformerConfig
     * @type {TransformerConfig}
     */
    public static messageTransformerConfig: TransformerConfig;
    
    /**
     * Initialise configuration.
     *
     * @class Config
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean {
        if (this.__initialised) {

        }
        else {
            this.messageConfig = this.loadMessageConfig();
            this.messageHeaderConfig = this.loadMessageHeaderConfig();
            this.messageProducerConfig = this.loadMessageProducerConfig();
            this.schema = this.loadSchemaConfig();
            this.responseMessageConfig = this.loadResponseMessageConfig();
            this.messageTopicConfig = this.loadMessageTopicConfig();
            this.messageTransformerConfig = this.loadMessageTransformerConfig();
        }
        return true;
    }

    /**
     * Load message configuration.
     *
     * @class Config
     * @method loadMessageConfig
     * @return {MessageConfig} - Message configuration.
     */
    protected static loadMessageConfig(): MessageConfig {
        let config: MessageConfig;
        config = Configuration.message || {} as MessageConfig;
        return config;
    }

    /**
     * Message modules.
     *
     * @class Config
     * @method messageModule
     * @return {string[]} - List of modules.
     */
    public static messageModule(): string[] {
        return (
            this.messageConfig.module &&
            this.messageConfig.module.module) ||
            [] as string[];
    }

    /**
     * Message modules profile.
     *
     * @class Config
     * @method messageModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    public static messageModuleProfile(): ModuleProfile[] {
        return (
            this.messageConfig.module &&
            this.messageConfig.module.moduleProifle) ||
            [] as ModuleProfile[];
    }

    /**
     * Load message header configuration.
     *
     * @class Config
     * @method loadMessageHeaderConfig
     * @return {MessageHeaderConfig} - Message header configuration.
     */
    protected static loadMessageHeaderConfig(): MessageHeaderConfig {
        let config: MessageHeaderConfig;
        config = Configuration.message.header || {} as MessageHeaderConfig;
        return config;
    }

    /**
     * Message header modules.
     *
     * @class Config
     * @method messageHeaderModule
     * @return {string[]} - List of modules.
     */
    public static messageHeaderModule(): string[] {
        return (
            this.messageHeaderConfig.module &&
            this.messageHeaderConfig.module.module) ||
            [] as string[];
    }

    /**
     * Message header modules profile.
     *
     * @class Config
     * @method messageHeaderModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    public static messageHeaderModuleProfile(): ModuleProfile[] {
        return (
            this.messageHeaderConfig.module &&
            this.messageHeaderConfig.module.moduleProifle) ||
            [] as ModuleProfile[];
    }

    /**
     * Load message producer configuration.
     *
     * @class Config
     * @method loadMessageProducerConfig
     * @return {MessageProducerConfig} - Message producer configuration.
     */
    protected static loadMessageProducerConfig(): ProducerConfig {
        let config: ProducerConfig;
        config = Configuration.message.producer || {} as ProducerConfig;
        return config;
    }

    /**
     * Message producer modules.
     *
     * @class Config
     * @method messageProducerModule
     * @return {string[]} - List of modules.
     */
    public static messageProducerModule(): string[] {
        return (
            this.messageProducerConfig.module &&
            this.messageProducerConfig.module.module) ||
            [] as string[];
    }

    /**
     * Message producer modules profile.
     *
     * @class Config
     * @method messageProducerModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    public static messageProducerModuleProfile(): ModuleProfile[] {
        return (
            this.messageProducerConfig.module &&
            this.messageProducerConfig.module.moduleProifle) ||
            [] as ModuleProfile[];
    }

    /**
     * Load message schema configuration.
     *
     * @class Config
     * @method loadSchemaConfig
     * @return {SchemaConfig} - Message schema configuration.
     */
    protected static loadSchemaConfig(): SchemaConfig {
        let config: SchemaConfig
        config = this.messageConfig.schema || {} as SchemaConfig;
        if (config.definitionPath.length < 1) {
            config.definitionPath = this.defualtSchemaDefinitionPath;  // Default schema
        }
        return config;
    }

    /**
     * Message schema definition path.
     *
     * @class Config
     * @method schemaDefinitionPath
     * @return {string} - Schema definition path.
     */
    public static schemaDefinitionPath(): string {
        return this.schema.definitionPath &&
            this.schema.definitionPath.length > 0 ?
            this.schema.definitionPath : this.defualtSchemaDefinitionPath;
    }

    /**
     * Message schema disable format validation.
     *
     * @class Config
     * @method schemaDis
     * @return {boolean} - Disable format validation.
     */
    public static schemaDisableFormat(): boolean {
        return (this.schema.validate && this.schema.validate.disableFormat) || false;
    }

    /**
     * Load response message configuration.
     *
     * @class Config
     * @method loadResponseMessageConfig
     * @return {ResponseMessageConfig} - Message header configuration.
     */
    protected static loadResponseMessageConfig(): ResponseMessageConfig {
        let config: ResponseMessageConfig;
        config = Configuration.message.responseMessage || {} as ResponseMessageConfig;
        return config;
    }

    /**
     * Respond to message type.
     *
     * @class Config
     * @method respondToMessageType
     * @return {string[]} - List of response to message types.
     */
    public static respondToMessageType(): string[] {
        return (
            this.responseMessageConfig.respondToMessage &&
            this.responseMessageConfig.respondToMessage.messageType) ||
            ["Command", "Query", "Request", "Subscription"];
    }

    /**
     * Load message topic configuration.
     *
     * @class Config
     * @method loadMessageTopicConfig
     * @return {TopicConfig} - Message topic configuration.
     */
    protected static loadMessageTopicConfig(): TopicConfig {
        let config: TopicConfig;
        config = Configuration.message.topic || {} as TopicConfig;
        return config;
    }

    /**
     * Message topic modules.
     *
     * @class Config
     * @method messagwTopicModule
     * @return {string[]} - List of modules.
     */
    public static messageTopicModule(): string[] {
        return (
            this.messageTopicConfig.module &&
            this.messageTopicConfig.module.module) ||
            [] as string[];
    }

    /**
     * Message topic modules profile.
     *
     * @class Config
     * @method messageTopicModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    public static messageTopicModuleProfile(): ModuleProfile[] {
        return (
            this.messageTopicConfig.module &&
            this.messageTopicConfig.module.moduleProifle) ||
            [] as ModuleProfile[];
    }

    /**
     * Load message transformer configuration.
     *
     * @class Config
     * @method loadMessageTransformerConfig
     * @return {TransformerConfig} - Message transformer configuration.
     */
    protected static loadMessageTransformerConfig(): TransformerConfig {
        let config: TransformerConfig;
        config = Configuration.message.transformer || {} as TransformerConfig;
        return config;
    }

    /**
     * Message transformer modules.
     *
     * @class Config
     * @method messagwTransformerModule
     * @return {string[]} - List of modules.
     */
    public static messageTransformerModule(): string[] {
        return (
            this.messageTransformerConfig.module &&
            this.messageTransformerConfig.module.module) ||
            [] as string[];
    }

    /**
     * Message transformer modules profile.
     *
     * @class Config
     * @method messageTransformerModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    public static messageTransformerModuleProfile(): ModuleProfile[] {
        return (
            this.messageTransformerConfig.module &&
            this.messageTransformerConfig.module.moduleProifle) ||
            [] as ModuleProfile[];
    }
}
