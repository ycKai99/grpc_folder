"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const genericDataSchema = new mongoose_1.default.Schema({
    uuid: { type: String, required: true, lowercase: true, unique: true },
    fileName: { type: String, required: true, lowercase: true },
    fileType: { type: String, required: true, lowercase: true },
    entityName: { type: String, required: true, lowercase: true },
    fileData: { type: Object, required: true }
});
module.exports = genericDataSchema;
//# sourceMappingURL=genericData.schema.js.map