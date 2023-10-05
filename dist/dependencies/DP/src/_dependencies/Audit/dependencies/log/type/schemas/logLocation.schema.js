"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const logLocationSchema = new mongoose_1.default.Schema({
    logLocId: {
        type: String,
        required: true
    },
    logLocName: {
        type: String,
        required: true
    }
});
module.exports = logLocationSchema;
//# sourceMappingURL=logLocation.schema.js.map