"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const appLogLocSchema = new mongoose_1.default.Schema({
    appLogLocId: {
        type: String,
        ref: `AppLogLoc`,
        required: true
    },
    appLocId: {
        type: String,
        required: true
    },
    logLocId: {
        type: String,
        required: true
    }
});
module.exports = appLogLocSchema;
//# sourceMappingURL=appLogLoc.schema.js.map