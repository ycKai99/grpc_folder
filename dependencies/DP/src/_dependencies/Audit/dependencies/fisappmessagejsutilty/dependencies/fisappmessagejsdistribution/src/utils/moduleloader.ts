/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import {ModuleProfile} from '../types/appmessagetype';

/**
 * Load modules from array list of module files.
 *
 * @function load
 * @param modules {string[]} - Modules to be loaded. 
 * @return {unknown} - Modules. 
 */
export function load(modules: string[]): unknown {
    try {
        let modulesLoaded: object;

        for (let i = 0; i < modules.length; i++) {
            modulesLoaded = { ...modulesLoaded, ...require(modules[i]) };
        }
        return modulesLoaded;
    }
    catch (e) {
        throw "Load module failed.\n" + e;
    }
}

/**
 * Load modules from JSON file.
 * JSON: {module: strnng[]}
 * 
 *
 * @function loadFromJson
 * @param modules {string} - Modules to be loaded from JSON file. 
 * @return {unknown} - Modules. 
 */
export function loadFromJson(modules: string): unknown {
    try {
        let moduleProifle: any;

        moduleProifle = require(modules);
        if (!moduleProifle || !moduleProifle.module) { throw "Module not found."; }
        return load(moduleProifle.module as string[]);
    }
    catch (e) {
        throw "Load module failed.\n" + e;
    }
}

/**
 * Load modules from array list of Module profile.
 * 
 *
 * @function loadModuleProfilen
 * @param modules {ModuleProfile[]} - List of Module Profiles to be loaded. 
 * @return {unknown} - Modules. 
 */
export function loadModuleProfile(modules: ModuleProfile[]): unknown {
    try {
        let modulesLoaded: object = {};
        let moduleProfileLoaded: object;

        for (let i = 0; i < modules.length; i++) {
            moduleProfileLoaded = require(modules[i].module);
            modulesLoaded[modules[i].alias] = moduleProfileLoaded[modules[i].objectName];
        }

        return modulesLoaded;
    }
    catch (e) {
        throw "Load module failed.\n" + e;
    }
}

/**
 * Load modules Module profile from JSON file.
 * JSON: {module: ModuleProfile[]}
 * 
 *
 * @function loadModuleProfileFromJson
 * @param modules {string} - Modules Profile to be loaded from JSON file. 
 * @return {unknown} - Modules. 
 */
export function loadModuleProfileFromJson(modules: string): unknown {
    try {
        let moduleProifle: any;

        moduleProifle = require(modules);
        if (!moduleProifle || !moduleProifle.module) { throw "Module not found."; }
        return loadModuleProfile(moduleProifle.module as ModuleProfile[]);
    }
    catch (e) {
        throw "Load module failed.\n" + e;
    }
}
