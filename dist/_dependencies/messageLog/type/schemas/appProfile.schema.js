"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const appProfileSchema = new mongoose_1.default.Schema({
    appId: {
        type: String,
        required: true
    },
    appName: {
        type: String,
        required: true
    }
});
module.exports = appProfileSchema;
//# sourceMappingURL=appProfile.schema.js.map