"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema } = mongoose_1.default;
const appData = {
    msgId: {
        type: String,
        required: true,
    },
    msgLogDateTime: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    msgDateTime: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    msgTag: [String],
    msgPayload: {
        type: String,
        required: true
    }
};
const appDataSchema = new mongoose_1.default.Schema(appData);
const messageSchema = new mongoose_1.default.Schema({
    appLogLocId: {
        type: String,
        ref: `appLogLoc`,
        required: true
    },
    appData: appData
});
module.exports = messageSchema;
//# sourceMappingURL=message.schema.js.map