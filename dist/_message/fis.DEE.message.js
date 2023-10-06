"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FisDEEMessageHelper = void 0;
const export_1 = require("../_dependencies/DP/src/interface/export");
// Extended to have custom notification message format
class FisDEEMessageHelper extends export_1.FisCreateMessageUtility {
    getNotificationMessage(ucpId, command, data, messageName, DataSource) {
        let message = super.getNotificationMessage(ucpId, data, messageName);
        if (DataSource) {
            message.header.messageDestination = {
                "DataSource": DataSource
            };
        }
        return message;
    }
}
exports.FisDEEMessageHelper = FisDEEMessageHelper;
//# sourceMappingURL=fis.DEE.message.js.map