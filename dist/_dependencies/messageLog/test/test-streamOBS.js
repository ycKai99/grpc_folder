"use strict";
/* ----------------------        Simulate a stream of messages to be inserted or used by the test        ---------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingService = void 0;
const rxjs_1 = require("rxjs");
const fs = require("fs");
class StreamingService {
    constructor() {
        this.messagesJSON = fs.readFileSync("payload.json");
        this.messages = JSON.parse(this.messagesJSON);
    }
    stream() {
        let result = new rxjs_1.Subject();
        let messages = this.messages;
        let count = 0;
        const intervalId = setInterval(() => {
            result.next(messages[count]);
            count++;
            if (count >= 20) {
                clearInterval(intervalId);
                result.complete();
            }
        }, 100);
        return result;
    }
    getDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
exports.StreamingService = StreamingService;
//# sourceMappingURL=test-streamOBS.js.map