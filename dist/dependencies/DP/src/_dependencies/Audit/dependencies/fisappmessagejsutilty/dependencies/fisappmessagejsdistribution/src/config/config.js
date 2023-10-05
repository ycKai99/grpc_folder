"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const Configuration = require("../config.json");
class Config {
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
    static loadMessageConfig() {
        let config;
        config = Configuration.message || {};
        return config;
    }
    static messageModule() {
        return (this.messageConfig.module &&
            this.messageConfig.module.module) ||
            [];
    }
    static messageModuleProfile() {
        return (this.messageConfig.module &&
            this.messageConfig.module.moduleProifle) ||
            [];
    }
    static loadMessageHeaderConfig() {
        let config;
        config = Configuration.message.header || {};
        return config;
    }
    static messageHeaderModule() {
        return (this.messageHeaderConfig.module &&
            this.messageHeaderConfig.module.module) ||
            [];
    }
    static messageHeaderModuleProfile() {
        return (this.messageHeaderConfig.module &&
            this.messageHeaderConfig.module.moduleProifle) ||
            [];
    }
    static loadMessageProducerConfig() {
        let config;
        config = Configuration.message.producer || {};
        return config;
    }
    static messageProducerModule() {
        return (this.messageProducerConfig.module &&
            this.messageProducerConfig.module.module) ||
            [];
    }
    static messageProducerModuleProfile() {
        return (this.messageProducerConfig.module &&
            this.messageProducerConfig.module.moduleProifle) ||
            [];
    }
    static loadSchemaConfig() {
        let config;
        config = this.messageConfig.schema || {};
        if (config.definitionPath.length < 1) {
            config.definitionPath = this.defualtSchemaDefinitionPath;
        }
        return config;
    }
    static schemaDefinitionPath() {
        return this.schema.definitionPath &&
            this.schema.definitionPath.length > 0 ?
            this.schema.definitionPath : this.defualtSchemaDefinitionPath;
    }
    static schemaDisableFormat() {
        return (this.schema.validate && this.schema.validate.disableFormat) || false;
    }
    static loadResponseMessageConfig() {
        let config;
        config = Configuration.message.responseMessage || {};
        return config;
    }
    static respondToMessageType() {
        return (this.responseMessageConfig.respondToMessage &&
            this.responseMessageConfig.respondToMessage.messageType) ||
            ["Command", "Query", "Request", "Subscription"];
    }
    static loadMessageTopicConfig() {
        let config;
        config = Configuration.message.topic || {};
        return config;
    }
    static messageTopicModule() {
        return (this.messageTopicConfig.module &&
            this.messageTopicConfig.module.module) ||
            [];
    }
    static messageTopicModuleProfile() {
        return (this.messageTopicConfig.module &&
            this.messageTopicConfig.module.moduleProifle) ||
            [];
    }
    static loadMessageTransformerConfig() {
        let config;
        config = Configuration.message.transformer || {};
        return config;
    }
    static messageTransformerModule() {
        return (this.messageTransformerConfig.module &&
            this.messageTransformerConfig.module.module) ||
            [];
    }
    static messageTransformerModuleProfile() {
        return (this.messageTransformerConfig.module &&
            this.messageTransformerConfig.module.moduleProifle) ||
            [];
    }
}
exports.Config = Config;
Config.__initialised = Config.initialise();
Config.defualtSchemaDefinitionPath = "schema/FisAppMessageSchema.json";
//# sourceMappingURL=config.js.map