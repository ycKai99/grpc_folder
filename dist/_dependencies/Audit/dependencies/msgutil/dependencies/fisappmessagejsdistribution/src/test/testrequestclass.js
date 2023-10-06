"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.header = void 0;
class header {
    constructor() {
        this.messageType = null;
        this.messageID = null;
        this.messageName = null;
        this.dateCreated = null;
        this.isAggregate = null;
        this.messageProducerInformation = null;
        this.security = null;
    }
}
exports.header = header;
class Request {
    constructor() {
        this.header = null;
        this.data = null;
    }
}
exports.Request = Request;
//# sourceMappingURL=testrequestclass.js.map