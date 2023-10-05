"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.AppMessageSchema = void 0;
const config_1 = require("../../config/config");
const jsonschema_1 = require("jsonschema");
class AppMessageSchema {
    static initialise() {
        if (this.__initialised) {
        }
        else {
            this.schemaDefinitionPath = config_1.Config.schemaDefinitionPath();
            this.loadSchema(this.schemaDefinitionPath);
        }
        return true;
    }
    static loadSchema(schemaDefinitionPath) {
        try {
            this.schema = require("../../" + schemaDefinitionPath);
        }
        catch (e) {
            throw e;
        }
    }
    static validateSchema(message) {
        try {
            let m = message;
            (0, jsonschema_1.validate)(m, this.schema, {
                throwError: true
            });
        }
        catch (e) {
            throw e;
        }
        return true;
    }
}
exports.AppMessageSchema = AppMessageSchema;
AppMessageSchema.__initialised = AppMessageSchema.initialise();
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