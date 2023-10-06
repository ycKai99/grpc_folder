"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const appLocationSchema = new mongoose_1.default.Schema({
    appId: {
        type: String,
        required: true,
        ref: "AppProfile"
    },
    appLocId: {
        type: String,
        required: true
    },
    appLocName: {
        type: String,
        required: true
    }
});
module.exports = appLocationSchema;
//# sourceMappingURL=applocation.schema.js.map