"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = exports.generateNewId = void 0;
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const uuid_1 = require("uuid");
/**
 * Generate new Id.
 *
 * @function generateNewId
 * @param generator {<T extends IdGenerator} - Id Generator.
 * @return {<R>} - Generic type of IdType.
 */
function generateNewId(generator) {
    try {
        return new generator().generateId();
    }
    catch (e) {
        throw "Generate new Id failed.\n" + e;
    }
}
exports.generateNewId = generateNewId;
/**
 * Uuid Generator.
 *
 * @class Uuid
 */
class Uuid {
    constructor() {
    }
    generateId() {
        try {
            return uuid_1.v4();
        }
        catch (e) {
            throw e;
        }
    }
}
exports.Uuid = Uuid;
//# sourceMappingURL=idgenerator.js.map