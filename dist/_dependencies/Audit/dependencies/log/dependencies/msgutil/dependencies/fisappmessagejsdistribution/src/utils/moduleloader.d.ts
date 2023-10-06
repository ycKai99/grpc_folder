/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { ModuleProfile } from '../types/appmessagetype';
/**
 * Load modules from array list of module files.
 *
 * @function load
 * @param modules {string[]} - Modules to be loaded.
 * @return {unknown} - Modules.
 */
export declare function load(modules: string[]): unknown;
/**
 * Load modules from JSON file.
 * JSON: {module: strnng[]}
 *
 *
 * @function loadFromJson
 * @param modules {string} - Modules to be loaded from JSON file.
 * @return {unknown} - Modules.
 */
export declare function loadFromJson(modules: string): unknown;
/**
 * Load modules from array list of Module profile.
 *
 *
 * @function loadModuleProfilen
 * @param modules {ModuleProfile[]} - List of Module Profiles to be loaded.
 * @return {unknown} - Modules.
 */
export declare function loadModuleProfile(modules: ModuleProfile[]): unknown;
/**
 * Load modules Module profile from JSON file.
 * JSON: {module: ModuleProfile[]}
 *
 *
 * @function loadModuleProfileFromJson
 * @param modules {string} - Modules Profile to be loaded from JSON file.
 * @return {unknown} - Modules.
 */
export declare function loadModuleProfileFromJson(modules: string): unknown;
