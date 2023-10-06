"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModuleProfileFromJson = exports.loadModuleProfile = exports.loadFromJson = exports.load = void 0;
/**
 * Load modules from array list of module files.
 *
 * @function load
 * @param modules {string[]} - Modules to be loaded.
 * @return {unknown} - Modules.
 */
function load(modules) {
    try {
        let modulesLoaded;
        for (let i = 0; i < modules.length; i++) {
            modulesLoaded = Object.assign(Object.assign({}, modulesLoaded), require(modules[i]));
        }
        return modulesLoaded;
    }
    catch (e) {
        throw "Load module failed.\n" + e;
    }
}
exports.load = load;
/**
 * Load modules from JSON file.
 * JSON: {module: strnng[]}
 *
 *
 * @function loadFromJson
 * @param modules {string} - Modules to be loaded from JSON file.
 * @return {unknown} - Modules.
 */
function loadFromJson(modules) {
    try {
        let moduleProifle;
        moduleProifle = require(modules);
        if (!moduleProifle || !moduleProifle.module) {
            throw "Module not found.";
        }
        return load(moduleProifle.module);
    }
    catch (e) {
        throw "Load module failed.\n" + e;
    }
}
exports.loadFromJson = loadFromJson;
/**
 * Load modules from array list of Module profile.
 *
 *
 * @function loadModuleProfilen
 * @param modules {ModuleProfile[]} - List of Module Profiles to be loaded.
 * @return {unknown} - Modules.
 */
function loadModuleProfile(modules) {
    try {
        let modulesLoaded = {};
        let moduleProfileLoaded;
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
exports.loadModuleProfile = loadModuleProfile;
/**
 * Load modules Module profile from JSON file.
 * JSON: {module: ModuleProfile[]}
 *
 *
 * @function loadModuleProfileFromJson
 * @param modules {string} - Modules Profile to be loaded from JSON file.
 * @return {unknown} - Modules.
 */
function loadModuleProfileFromJson(modules) {
    try {
        let moduleProifle;
        moduleProifle = require(modules);
        if (!moduleProifle || !moduleProifle.module) {
            throw "Module not found.";
        }
        return loadModuleProfile(moduleProifle.module);
    }
    catch (e) {
        throw "Load module failed.\n" + e;
    }
}
exports.loadModuleProfileFromJson = loadModuleProfileFromJson;
//# sourceMappingURL=moduleloader.js.map