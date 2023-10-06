"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.AppMessageSchema = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const config_1 = require("../../config/config");
const jsonschema_1 = require("jsonschema");
/**
 * App message schema.
 *
 * @class AppMessageSchema
 */
class AppMessageSchema {
    /**
     * Initialise app message schema.
     *
     * @class AppMessageSchema
     * @method initialise
     * @return {boolean} - True.
     */
    static initialise() {
        if (this.__initialised) {
        }
        else {
            this.schemaDefinitionPath = config_1.Config.schemaDefinitionPath();
            this.loadSchema(this.schemaDefinitionPath);
        }
        return true;
    }
    /**
     * Load schema.
     *
     * @class AppMessageSchema
     * @function loadSchema
     * @param schemaDefinitionPath {string} - Schema definition path.
     * @return {void} void.
     */
    static loadSchema(schemaDefinitionPath) {
        try {
            this.schema = require("../../" + schemaDefinitionPath);
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Validate app message against JSON schema.
     *
     * @class AppMessageSchema
     * @function validateSchema
     * @param message {Message} - Message.
     * @return {boolean} - True = success, false = error.
     */
    static validateSchema(message) {
        try {
            let m = message;
            jsonschema_1.validate(m, this.schema, {
                throwError: true //,
                // disableFormat: Config.schemaDisableFormat()     // 'disableFormat' not defined in jsonschema Options type definition 'index.d.ts', if add in then OK.
            });
        }
        catch (e) {
            throw e;
        }
        return true;
    }
}
exports.AppMessageSchema = AppMessageSchema;
/**
 * Initialise app message schema.
 *
 * @class AppMessageSchema
 * @property __initialised
 * @type {boolean}
 */
AppMessageSchema.__initialised = AppMessageSchema.initialise();
/**
 * Validate app message against JSON schema.
 *
 * @function validateSchema
 * @param message {Message} - Message.
 * @return {boolean} - True = success, false = error.
 */
function validateSchema(message) {
    try {
        return AppMessageSchema.validateSchema(message);
    }
    catch (e) {
        throw e;
    }
}
exports.validateSchema = validateSchema;
//# sourceMappingURL=appmessageschema.js.map