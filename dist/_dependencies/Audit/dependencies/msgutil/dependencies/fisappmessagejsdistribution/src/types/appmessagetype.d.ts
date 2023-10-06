/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageHeader, UserInterfaceComponentTypes, FisAppServerComponents, SystemServers } from './fisappmessageschema';
export * from './fisappmessageschema';
export * from './appcommontype';
export * from './messageparameter';
/**
 * Module profile.
 *
 * @interface ModuleProfile
 */
export interface ModuleProfile {
    /**
     * Module alias.
     *
     * @property alias
     * @type {string}
     */
    alias: string;
    /**
     * Module.
     *
     * @property module
     * @type {string}
     */
    module: string;
    /**
     * Object name.
     *
     *
     * @property objectName
     * @type {string}
     */
    objectName: string;
}
/**
 * App message header options.
 *
 * @interface AppMessageHeaderOptions
 */
export interface AppMessageHeaderOptions {
    /**
     * Permissible message types.
     *
     * @interface AppMessageHeaderOptions
     * @property permissibleMessageType
     * @type {object}
     */
    permissibleMessageType?: object;
    /**
     * Message header validator.
     *
     * @interface AppMessageHeaderOptions
     * @property validator
     * @type {Function}
     */
    validator?: Function;
}
/**
 * App response message header options.
 *
 * @interface AppResponseMessageHeaderOptions
 */
export interface AppResponseMessageHeaderOptions extends AppMessageHeaderOptions {
    /**
     * Permissible respond to message types.
     *
     * @interface AppResponseMessageHeaderOptions
     * @property permissibleRespondToMessageType
     * @type {object}
     */
    permissibleRespondToMessageType?: object;
}
/**
 * App message parameter type.
 * Tesing verion is any.
 *
 * @type MessageParameter
 */
/**
 * App message generic header.
 * Generic header is a set of properties with string Key of type unknown.
 *
 * @type GenericHeader
 */
export declare type GenericHeader = Record<string, unknown>;
/**
 * App message generic header of type.
 * Constructs a generic header of type <T>.
 *
 * @type GenericHeaderOf<T>
 */
export declare type GenericHeaderOf<T> = {
    [P in keyof T]: T[P];
};
/**
 * App message header.
 * Common message header(MessageHeader) plus generic header(GenericHeader).
 *
 * @type Header
 */
export declare type Header = MessageHeader & GenericHeader;
/**
 * Component types
 *
 * @type Component
 */
export declare type Component = UserInterfaceComponentTypes | FisAppServerComponents | SystemServers;
