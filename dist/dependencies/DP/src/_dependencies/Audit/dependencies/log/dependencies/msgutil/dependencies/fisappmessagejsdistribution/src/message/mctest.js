"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.AppMessageCreator = void 0;
const appmessagetype_1 = require("../types/appmessagetype");
const Messages = require("./messages");
const moduleloader_1 = require("../utils/moduleloader");
const config_1 = require("../config/config");
class AppMessageCreator {
    static initialise() {
        if (this.__initialised) {
        }
        else {
            this.messages = Object.assign(Object.assign({}, Messages), (0, moduleloader_1.load)(config_1.Config.messageModule()));
        }
        return true;
    }
    static new(alias, options) {
        try {
            return new this.messages[alias](options);
        }
        catch (e) {
            throw "Message alias name '" + alias + "' not found.\n" + e;
        }
    }
    static create(messageParameter, alias, options) {
        try {
            return this.new(alias ||
                (messageParameter && messageParameter.messageType), options).create(messageParameter);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.AppMessageCreator = AppMessageCreator;
AppMessageCreator.__initialised = AppMessageCreator.initialise();
function createMessage(messageParameter, alias, options) {
    try {
        return AppMessageCreator.create(messageParameter, alias, options);
    }
    catch (e) {
        throw e;
    }
}
exports.createMessage = createMessage;
console.log(JSON.stringify(createMessage({
    messageType: appmessagetype_1.AppMessageType.Command,
    messageName: "Test message",
    isAggregate: false,
    security: {
        ucpId: "ucp123",
        applicationLogInID: "FIS",
        applicationUserName: "FIS"
    },
    producer: {
        type: appmessagetype_1.ProducerType.UI,
        origin: {
            userApplication: {
                userAppId: "FIS",
                userAppName: "FIS"
            }
        }
    },
    dataLocation: { isEmbaded: true },
    dataFormat: { dataFormat: appmessagetype_1.DataFormat.Json },
    data: {}
}, appmessagetype_1.AppMessageType.Command), null, 2));
//# sourceMappingURL=mctest.js.map