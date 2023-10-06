import { Schema } from 'jsonschema';
import { Message } from '../../types/appmessagetype';
/**
 * App message schema.
 *
 * @class AppMessageSchema
 */
export declare class AppMessageSchema {
    /**
     * Initialise app message schema.
     *
     * @class AppMessageSchema
     * @property __initialised
     * @type {boolean}
     */
    protected static __initialised: boolean;
    /**
     * Schema definition path.
     *
     * @class AppMessageSchema
     * @property schemaDefinitionPath
     * @type {stirng}
     */
    static schemaDefinitionPath: string;
    /**
     * Schema definition.
     *
     * @class AppMessageSchema
     * @property schema
     * @type {Schema}
     */
    static schema: Schema;
    /**
     * Initialise app message schema.
     *
     * @class AppMessageSchema
     * @method initialise
     * @return {boolean} - True.
     */
    protected static initialise(): boolean;
    /**
     * Load schema.
     *
     * @class AppMessageSchema
     * @function loadSchema
     * @param schemaDefinitionPath {string} - Schema definition path.
     * @return {void} void.
     */
    static loadSchema(schemaDefinitionPath: string): void;
    /**
     * Validate app message against JSON schema.
     *
     * @class AppMessageSchema
     * @function validateSchema
     * @param message {Message} - Message.
     * @return {boolean} - True = success, false = error.
     */
    static validateSchema(message: Message): boolean;
}
/**
 * Validate app message against JSON schema.
 *
 * @function validateSchema
 * @param message {Message} - Message.
 * @return {boolean} - True = success, false = error.
 */
export declare function validateSchema(message: Message): boolean;
