"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const Configuration = require("../config.json");
/**
 * App message configuration.
 *
 * @class Config
 */
class Config {
    /**
     * Initialise configuration.
     *
     * @class Config
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
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
    static loadMessageConfig() {
        let config;
        config = Configuration.message || {};
        return config;
    }
    /**
     * Message modules.
     *
     * @class Config
     * @method messageModule
     * @return {string[]} - List of modules.
     */
    static messageModule() {
        return (this.messageConfig.module &&
            this.messageConfig.module.module) ||
            [];
    }
    /**
     * Message modules profile.
     *
     * @class Config
     * @method messageModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageModuleProfile() {
        return (this.messageConfig.module &&
            this.messageConfig.module.moduleProifle) ||
            [];
    }
    /**
     * Load message header configuration.
     *
     * @class Config
     * @method loadMessageHeaderConfig
     * @return {MessageHeaderConfig} - Message header configuration.
     */
    static loadMessageHeaderConfig() {
        let config;
        config = Configuration.message.header || {};
        return config;
    }
    /**
     * Message header modules.
     *
     * @class Config
     * @method messageHeaderModule
     * @return {string[]} - List of modules.
     */
    static messageHeaderModule() {
        return (this.messageHeaderConfig.module &&
            this.messageHeaderConfig.module.module) ||
            [];
    }
    /**
     * Message header modules profile.
     *
     * @class Config
     * @method messageHeaderModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageHeaderModuleProfile() {
        return (this.messageHeaderConfig.module &&
            this.messageHeaderConfig.module.moduleProifle) ||
            [];
    }
    /**
     * Load message producer configuration.
     *
     * @class Config
     * @method loadMessageProducerConfig
     * @return {MessageProducerConfig} - Message producer configuration.
     */
    static loadMessageProducerConfig() {
        let config;
        config = Configuration.message.producer || {};
        return config;
    }
    /**
     * Message producer modules.
     *
     * @class Config
     * @method messageProducerModule
     * @return {string[]} - List of modules.
     */
    static messageProducerModule() {
        return (this.messageProducerConfig.module &&
            this.messageProducerConfig.module.module) ||
            [];
    }
    /**
     * Message producer modules profile.
     *
     * @class Config
     * @method messageProducerModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageProducerModuleProfile() {
        return (this.messageProducerConfig.module &&
            this.messageProducerConfig.module.moduleProifle) ||
            [];
    }
    /**
     * Load message schema configuration.
     *
     * @class Config
     * @method loadSchemaConfig
     * @return {SchemaConfig} - Message schema configuration.
     */
    static loadSchemaConfig() {
        let config;
        config = this.messageConfig.schema || {};
        if (config.definitionPath.length < 1) {
            config.definitionPath = this.defualtSchemaDefinitionPath; // Default schema
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
    static schemaDefinitionPath() {
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
    static schemaDisableFormat() {
        return (this.schema.validate && this.schema.validate.disableFormat) || false;
    }
    /**
     * Load response message configuration.
     *
     * @class Config
     * @method loadResponseMessageConfig
     * @return {ResponseMessageConfig} - Message header configuration.
     */
    static loadResponseMessageConfig() {
        let config;
        config = Configuration.message.responseMessage || {};
        return config;
    }
    /**
     * Respond to message type.
     *
     * @class Config
     * @method respondToMessageType
     * @return {string[]} - List of response to message types.
     */
    static respondToMessageType() {
        return (this.responseMessageConfig.respondToMessage &&
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
    static loadMessageTopicConfig() {
        let config;
        config = Configuration.message.topic || {};
        return config;
    }
    /**
     * Message topic modules.
     *
     * @class Config
     * @method messagwTopicModule
     * @return {string[]} - List of modules.
     */
    static messageTopicModule() {
        return (this.messageTopicConfig.module &&
            this.messageTopicConfig.module.module) ||
            [];
    }
    /**
     * Message topic modules profile.
     *
     * @class Config
     * @method messageTopicModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageTopicModuleProfile() {
        return (this.messageTopicConfig.module &&
            this.messageTopicConfig.module.moduleProifle) ||
            [];
    }
    /**
     * Load message transformer configuration.
     *
     * @class Config
     * @method loadMessageTransformerConfig
     * @return {TransformerConfig} - Message transformer configuration.
     */
    static loadMessageTransformerConfig() {
        let config;
        config = Configuration.message.transformer || {};
        return config;
    }
    /**
     * Message transformer modules.
     *
     * @class Config
     * @method messagwTransformerModule
     * @return {string[]} - List of modules.
     */
    static messageTransformerModule() {
        return (this.messageTransformerConfig.module &&
            this.messageTransformerConfig.module.module) ||
            [];
    }
    /**
     * Message transformer modules profile.
     *
     * @class Config
     * @method messageTransformerModuleProfile
     * @return {ModuleProfile[]} - List of modules profile.
     */
    static messageTransformerModuleProfile() {
        return (this.messageTransformerConfig.module &&
            this.messageTransformerConfig.module.moduleProifle) ||
            [];
    }
}
exports.Config = Config;
/**
 * Initialise configuration.
 *
 * @class Config
 * @property __initialised
 * @type {boolean}
 */
Config.__initialised = Config.initialise();
/**
 * Default schema definition path.
 *
 * @class Config
 * @property defualtSchemaDefinitionPath
 * @type {stirng}
 */
Config.defualtSchemaDefinitionPath = "schema/FisAppMessageSchema.json";
//# sourceMappingURL=config.js.map