/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { Config } from '../../config/config';
import { Schema, validate } from 'jsonschema';
import { Message } from '../../types/appmessagetype';

/**
 * App message schema.
 *
 * @class AppMessageSchema
 */
export class AppMessageSchema {
    /**
     * Initialise app message schema.
     *
     * @class AppMessageSchema
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean = AppMessageSchema.initialise();

    /**
     * Schema definition path.
     * 
     * @class AppMessageSchema
     * @property schemaDefinitionPath
     * @type {stirng}
     */
    public static schemaDefinitionPath: string;

    /**
     * Schema definition.
     * 
     * @class AppMessageSchema
     * @property schema
     * @type {Schema}
     */
    public static schema: Schema;

    /**
     * Initialise app message schema.
     *
     * @class AppMessageSchema
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean {
        if (this.__initialised) {

        }
        else {
            this.schemaDefinitionPath = Config.schemaDefinitionPath()
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
    public static loadSchema(schemaDefinitionPath: string): void {
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
    public static validateSchema(message: Message): boolean {
        try {
            let m: Message = message;
            validate(m, this.schema, {
                throwError: true    //,
                // disableFormat: Config.schemaDisableFormat()     // 'disableFormat' not defined in jsonschema Options type definition 'index.d.ts', if add in then OK.
            });
        }
        catch (e) {
            throw e;
        }
        return true;
    }
}

/**
 * Validate app message against JSON schema.
 *
 * @function validateSchema
 * @param message {Message} - Message. 
 * @return {boolean} - True = success, false = error.
 */
export function validateSchema(message: Message): boolean {

    try {
        return AppMessageSchema.validateSchema(message);
    }
    catch (e) {
        throw e;
    }
}
