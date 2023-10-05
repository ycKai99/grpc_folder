"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = exports.generateNewId = void 0;
const uuid_1 = require("uuid");
function generateNewId(generator) {
    try {
        return new generator().generateId();
    }
    catch (e) {
        throw "Generate new Id failed.\n" + e;
    }
}
exports.generateNewId = generateNewId;
class Uuid {
    constructor() {
    }
    generateId() {
        try {
            return (0, uuid_1.v4)();
        }
        catch (e) {
            throw e;
        }
    }
}
exports.Uuid = Uuid;
//# sourceMappingURL=idgenerator.js.map